import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createContext(): TrpcContext {
  return { user: null, req: {} as TrpcContext["req"], res: {} as TrpcContext["res"] };
}

describe("portal audited knowledge", () => {
  it("exposes the expected Phase 1–2 seed counts", async () => {
    const result = await appRouter.createCaller(createContext()).portal.stats();
    expect(result.domains).toBe(11);
    expect(result.tasks).toBe(17);
    expect(result.workflows).toBe(6);
    expect(result.roles).toBe(12);
    expect(result.regulations).toBe(26);
    expect(result.parameters).toBe(139);
    expect(result.glossary).toBe(660);
    expect(result.gaps).toBe(30);
    expect(result.conflicts).toBe(4);
    expect(result.site_groups).toBe(16);
    expect(result.monitoring).toBe(6);
  });

  it("keeps conflict records explicitly conflicting", async () => {
    const result = await appRouter.createCaller(createContext()).portal.list({ type: "conflict", limit: 10 });
    expect(result).toHaveLength(4);
    expect(result.every(item => item.status === "CONFLICTING")).toBe(true);
    expect(result[0]?.refs.length).toBeGreaterThan(0);
  });

  it("returns source-backed search results with status and citations", async () => {
    const result = await appRouter.createCaller(createContext()).portal.search({ query: "water monitoring" });
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty("status");
    expect(result[0]).toHaveProperty("refs");
    const refs = result.flatMap(item => item.refs);
    expect(refs.some(ref => /ENV-\d+/.test(ref))).toBe(true);
    expect(refs.every(ref => typeof ref === "string" && ref.length > 2 && !ref.includes("[object Object]"))).toBe(true);
  });

  it("returns search facets and expands seeded glossary/acronym terms", async () => {
    const caller = appRouter.createCaller(createContext());
    const facets = await caller.portal.searchFacets({ query: "water monitoring" });
    expect(facets.types.length).toBeGreaterThan(0);
    expect(facets.statuses.length).toBeGreaterThan(0);
    const glossarySearch = await caller.portal.search({ query: "PKKPRL" });
    expect(glossarySearch.length).toBeGreaterThan(0);
  });

  it("returns conflict status without resolving Source A versus Source B", async () => {
    const conflicts = await appRouter.createCaller(createContext()).portal.list({ type: "conflict", limit: 1 });
    const result = await appRouter.createCaller(createContext()).portal.aiAsk({ question: `conflict ${String(conflicts[0]?.title ?? "requirement")}` });
    expect(result.status).toBe("CONFLICTING");
    expect(result.answer).toContain("No resolution has been inferred");
    expect(result.conflicts.length).toBeGreaterThan(0);
    expect(result.citations.length).toBeGreaterThan(0);
  });

  it("classifies unsupported questions as uncertainty and does not invent an answer", async () => {
    const result = await appRouter.createCaller(createContext()).portal.aiAsk({ question: "information about an imaginary unsupported topic xyzabc" });
    expect(result.status).toBe("NOT_FOUND");
    expect(result.answer).toContain("Information not found in the current Environment Knowledge Base.");
  });

  it("routes document, handover, and uncertainty questions through distinct guarded paths", async () => {
    const caller = appRouter.createCaller(createContext());
    const documentResult = await caller.portal.aiAsk({ question: "Which document explains water monitoring?" });
    expect(documentResult.kind).toBe("document_search");
    expect(documentResult.answer).toContain("source-backed records");
    expect(documentResult.citations.some(citation => /ENV-\d+/.test(citation))).toBe(true);
    expect(["SOURCE_SUPPORTED", "PARTIAL_EVIDENCE"]).toContain(documentResult.status);
    const handoverResult = await caller.portal.aiAsk({ question: "What should I take over from the current owner?" });
    expect(handoverResult.kind).toBe("handover");
    expect(handoverResult.answer).toContain("I’m Taking Over");
    expect(handoverResult.citations.some(citation => /ENV-\d+/.test(citation))).toBe(true);
    const uncertaintyResult = await caller.portal.aiAsk({ question: "Which missing gap should I verify?" });
    expect(uncertaintyResult.kind).toBe("uncertainty");
    expect(["PARTIAL_EVIDENCE", "REQUIRES_HUMAN_REVIEW", "NOT_FOUND"]).toContain(uncertaintyResult.status);
    if (uncertaintyResult.status !== "NOT_FOUND") expect(uncertaintyResult.citations.some(citation => /ENV-\d+/.test(citation))).toBe(true);
  });

  it("rejects unauthenticated and unknown-workspace handover procedures", async () => {
    const caller = appRouter.createCaller(createContext());
    await expect(caller.portal.handoverCreate({ name: "Test", taskIds: ["TASK-001"] })).rejects.toThrow();
    await expect(caller.portal.handoverGet({ projectId: 999999 })).rejects.toThrow();
    await expect(caller.portal.handoverItemUpdate({ projectId: 999999, itemId: 1, itemStatus: "DONE" })).rejects.toThrow();
    await expect(caller.portal.handoverNote({ projectId: 999999, body: "Test" })).rejects.toThrow();
    await expect(caller.portal.handoverNoteEdit({ projectId: 999999, noteId: 1, body: "Test" })).rejects.toThrow();
    await expect(caller.portal.handoverNoteDelete({ projectId: 999999, noteId: 1 })).rejects.toThrow();
  });
});

  it("exposes inline learning material for every environmental domain", async () => {
    const caller = appRouter.createCaller(createContext());
    const domains = await caller.portal.list({ type: "domain", limit: 20 });
    expect(domains).toHaveLength(11);
    expect(domains.every(item => typeof item.id === "string" && item.id.startsWith("D"))).toBe(true);
    expect(domains.every(item => item.refs.length > 0)).toBe(true);
    expect(domains.every(item => item.data && (Array.isArray(item.data.core_concepts) || typeof item.data.purpose === "string"))).toBe(true);
  });
