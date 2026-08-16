import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { invokeLLM } from "./_core/llm";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { buildGroundedContext, findById, getCollection, getStats, searchRecords, toCard, type PortalType } from "./portal-data";
import { getDb } from "./db";
import { handoverItems, handoverNotes, handoverProjects } from "../drizzle/schema";

const portalType = z.enum(["document", "domain", "site_group", "monitoring", "workflow", "task", "role", "site", "regulation", "parameter", "glossary", "gap", "conflict"]);
const questionKind = z.enum(["explanation", "procedure", "document_search", "compliance", "handover", "uncertainty"]);
function classifyQuestion(question: string): z.infer<typeof questionKind> { const value = question.toLowerCase(); if (/conflict|uncertain|missing|unknown|gap|verify/.test(value)) return "uncertainty"; if (/permit|regulation|standard|compliance|approval|legal/.test(value)) return "compliance"; if (/document|file|report|source|where/.test(value)) return "document_search"; if (/handover|take over|transition|owner|responsible/.test(value)) return "handover"; if (/how do|step|procedure|process|perform|prepare|submit/.test(value)) return "procedure"; return "explanation"; }

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  portal: router({
    stats: publicProcedure.query(() => getStats()),
    list: publicProcedure.input(z.object({ type: portalType, query: z.string().optional(), status: z.string().optional(), limit: z.number().min(1).max(100).default(30) })).query(({ input }) => {
      const records = input.query ? searchRecords(input.query, input.type as PortalType, input.status, input.limit) : getCollection(input.type as PortalType).slice(0, input.limit).map(item => toCard(input.type as PortalType, item));
      return records;
    }),
    get: publicProcedure.input(z.object({ type: portalType, id: z.string() })).query(({ input }) => findById(input.type as PortalType, input.id)),
    search: publicProcedure.input(z.object({ query: z.string().min(1), type: portalType.optional(), status: z.string().optional() })).query(({ input }) => searchRecords(input.query, input.type as PortalType | undefined, input.status, 40)),
    searchSuggestions: publicProcedure.input(z.object({ query: z.string().min(1).max(100) })).query(({ input }) => Array.from(new Set(searchRecords(input.query, undefined, undefined, 8).map(item => item.title))).slice(0, 8)),
    searchFacets: publicProcedure.input(z.object({ query: z.string().min(1).max(100) })).query(({ input }) => { const records = searchRecords(input.query, undefined, undefined, 500); return { types: Object.entries(records.reduce<Record<string, number>>((acc, item) => { acc[item.type] = (acc[item.type] ?? 0) + 1; return acc; }, {})).sort((a,b) => b[1] - a[1]), statuses: Object.entries(records.reduce<Record<string, number>>((acc, item) => { acc[item.status] = (acc[item.status] ?? 0) + 1; return acc; }, {})).sort((a,b) => b[1] - a[1]) }; }),
    aiAsk: publicProcedure.input(z.object({ question: z.string().min(3).max(1000) })).mutation(async ({ input }) => {
      const kind = classifyQuestion(input.question);
      const context = buildGroundedContext(input.question);
      if (context.conflicts.length) {
        return { kind, status: "CONFLICTING", answer: "The current Environment Knowledge Base contains conflicting source statements for this question. No resolution has been inferred. Review Source A and Source B before acting.", citations: context.conflicts.flatMap(item => item.refs).slice(0, 8), conflicts: context.conflicts.map(item => ({ id: item.id, title: item.title, sourceRefs: item.refs, data: item.data })) };
      }
      if (!context.results.length) {
        return { kind, status: "NOT_FOUND", answer: "Information not found in the current Environment Knowledge Base.", citations: [], conflicts: [] };
      }
      if (kind === "uncertainty") {
        return { kind, status: context.gaps.length ? "PARTIAL_EVIDENCE" : "REQUIRES_HUMAN_REVIEW", answer: "This question requires verification against the retrieved records. Review the evidence cards, source citations and any linked gaps before acting.", citations: context.results.flatMap(item => item.refs).slice(0, 8), conflicts: [] };
      }
      if (kind === "document_search") {
        return { kind, status: "SOURCE_SUPPORTED", answer: `Retrieved ${context.results.length} source-backed records. Open the citations to inspect the original document references.\n\n${context.results.map(item => `• ${item.title} — ${item.status}`).join("\n")}`, citations: context.results.flatMap(item => item.refs).slice(0, 8), conflicts: [] };
      }
      if (kind === "handover") {
        return { kind, status: context.gaps.length ? "PARTIAL_EVIDENCE" : "SOURCE_SUPPORTED", answer: `Handover context from the audited records:\n\n${context.results.map(item => `• ${item.title} — ${item.status}`).join("\n")}\n\nCreate a user-owned workspace from the I’m Taking Over page to track progress and notes.`, citations: context.results.flatMap(item => item.refs).slice(0, 8), conflicts: [] };
      }
      const status = context.gaps.length ? "PARTIAL_EVIDENCE" : "SOURCE_SUPPORTED";
      const evidence = context.results.map(item => ({ title: item.title, status: item.status, citations: item.refs, content: item.data })).slice(0, 6);
      try {
        const response = await invokeLLM({
          messages: [
            { role: "system", content: `You are the Environment Knowledge Assistant. Question type: ${kind}. Answer only from the supplied evidence. Do not invent company procedures, limits, responsibilities or legal conclusions. If evidence is incomplete, say what is missing. Never resolve conflicts. Keep the answer concise and cite the supplied source references inline using [Source: ...].` },
            { role: "user", content: `Question: ${input.question}\n\nEvidence:\n${JSON.stringify(evidence)}` },
          ],
        });
        const answer = typeof response.choices?.[0]?.message?.content === "string" ? response.choices[0].message.content : "The evidence was retrieved, but no supported answer was generated.";
        return { kind, status, answer, citations: context.results.flatMap(item => item.refs).slice(0, 8), conflicts: [] };
      } catch {
        return { kind, status, answer: `Relevant source material was found, but the assistant could not complete synthesis. Review the evidence cards directly.\n\n${context.results.map(item => `• ${item.title} — ${item.status}`).join("\n")}`, citations: context.results.flatMap(item => item.refs).slice(0, 8), conflicts: [] };
      }
    }),
    handoverCreate: protectedProcedure.input(z.object({ name: z.string().min(1).max(255), taskIds: z.array(z.string()).min(1) })).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      const project = await db.insert(handoverProjects).values({ userId: ctx.user.id, name: input.name }).$returningId();
      const projectId = project[0]?.id;
      if (!projectId) throw new Error("Handover project could not be created");
      await db.insert(handoverItems).values(input.taskIds.map((taskExternalId, index) => ({ projectId, taskExternalId, orderIndex: index })));
      return { projectId };
    }),
    handoverGet: protectedProcedure.input(z.object({ projectId: z.number() })).query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      const projectRows = await db.select().from(handoverProjects).where(and(eq(handoverProjects.id, input.projectId), eq(handoverProjects.userId, ctx.user.id))).limit(1);
      if (!projectRows[0]) throw new Error("Handover workspace not found");
      const items = await db.select().from(handoverItems).where(eq(handoverItems.projectId, input.projectId));
      const notes = await db.select().from(handoverNotes).where(eq(handoverNotes.projectId, input.projectId));
      return { project: projectRows[0], items, notes };
    }),
    handoverItemUpdate: protectedProcedure.input(z.object({ projectId: z.number(), itemId: z.number(), itemStatus: z.enum(["NOT_STARTED", "IN_PROGRESS", "BLOCKED", "DONE"]), note: z.string().max(4000).optional() })).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      const owned = await db.select({ id: handoverProjects.id }).from(handoverProjects).where(and(eq(handoverProjects.id, input.projectId), eq(handoverProjects.userId, ctx.user.id))).limit(1);
      if (!owned[0]) throw new Error("Handover workspace not found");
      await db.update(handoverItems).set({ itemStatus: input.itemStatus, note: input.note ?? null }).where(and(eq(handoverItems.id, input.itemId), eq(handoverItems.projectId, input.projectId)));
      return { success: true };
    }),
    handoverNote: protectedProcedure.input(z.object({ projectId: z.number(), body: z.string().min(1).max(4000) })).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      const owned = await db.select({ id: handoverProjects.id }).from(handoverProjects).where(and(eq(handoverProjects.id, input.projectId), eq(handoverProjects.userId, ctx.user.id))).limit(1);
      if (!owned[0]) throw new Error("Handover workspace not found");
      await db.insert(handoverNotes).values({ projectId: input.projectId, body: input.body });
      return { success: true, author: ctx.user.name ?? "Current user" };
    }),
    handoverNoteEdit: protectedProcedure.input(z.object({ projectId: z.number(), noteId: z.number(), body: z.string().min(1).max(4000) })).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      const owned = await db.select({ id: handoverProjects.id }).from(handoverProjects).where(and(eq(handoverProjects.id, input.projectId), eq(handoverProjects.userId, ctx.user.id))).limit(1);
      if (!owned[0]) throw new Error("Handover workspace not found");
      await db.update(handoverNotes).set({ body: input.body }).where(and(eq(handoverNotes.id, input.noteId), eq(handoverNotes.projectId, input.projectId)));
      return { success: true };
    }),
    handoverNoteDelete: protectedProcedure.input(z.object({ projectId: z.number(), noteId: z.number() })).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      const owned = await db.select({ id: handoverProjects.id }).from(handoverProjects).where(and(eq(handoverProjects.id, input.projectId), eq(handoverProjects.userId, ctx.user.id))).limit(1);
      if (!owned[0]) throw new Error("Handover workspace not found");
      await db.delete(handoverNotes).where(and(eq(handoverNotes.id, input.noteId), eq(handoverNotes.projectId, input.projectId)));
      return { success: true };
    }),
  }),
});

export type AppRouter = typeof appRouter;
