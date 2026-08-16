import { beforeEach, describe, expect, it, vi } from "vitest";

const state = {
  projects: [{ id: 77, userId: 1, name: "Owned handover", status: "IN_PROGRESS" }],
  items: [{ id: 88, projectId: 77, taskExternalId: "TASK-001", itemStatus: "NOT_STARTED", note: null, orderIndex: 0 }],
  notes: [{ id: 99, projectId: 77, body: "Initial context" }],
};

function rowsFor(table: unknown) {
  const values = table === "projects" ? state.projects : table === "items" ? state.items : state.notes;
  const rows = [...values] as Array<Record<string, unknown>> & { limit?: () => Promise<unknown> };
  rows.limit = async () => rows;
  return rows;
}

const fakeDb = {
  select: () => ({
    from: (table: unknown) => ({
      where: () => rowsFor(table),
    }),
  }),
  insert: (table: unknown) => ({
    values: (values: Record<string, unknown> | Array<Record<string, unknown>>) => {
      const list = Array.isArray(values) ? values : [values];
      if (table === "projects") state.projects.push({ id: 78, userId: 1, name: String(list[0]?.name ?? ""), status: "IN_PROGRESS" });
      if (table === "items") state.items.push(...list.map((value, index) => ({ id: 89 + index, projectId: 78, taskExternalId: String(value.taskExternalId), itemStatus: "NOT_STARTED", note: null, orderIndex: index })));
      if (table === "notes") state.notes.push({ id: 100, projectId: Number(list[0]?.projectId), body: String(list[0]?.body ?? "") });
      return { $returningId: async () => [{ id: 78 }] };
    },
    $returningId: async () => [{ id: 78 }],
  }),
  update: (table: unknown) => ({
    set: (values: Record<string, unknown>) => ({
      where: async () => {
        if (table === "items") Object.assign(state.items[0], values);
        if (table === "notes") Object.assign(state.notes[0], values);
      },
    }),
  }),
  delete: (table: unknown) => ({
    where: async () => {
      if (table === "notes") state.notes.splice(0, 1);
    },
  }),
};

vi.mock("./db", () => ({ getDb: vi.fn(async () => fakeDb) }));
vi.mock("../drizzle/schema", async () => {
  const actual = await vi.importActual<typeof import("../drizzle/schema")>("../drizzle/schema");
  return { ...actual, handoverProjects: "projects", handoverItems: "items", handoverNotes: "notes" };
});

import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function context(): TrpcContext {
  return { user: { id: 1, openId: "owned", name: "Owner", email: "owner@example.com", loginMethod: "test", role: "user", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() }, req: {} as TrpcContext["req"], res: {} as TrpcContext["res"] };
}

describe("handover authenticated lifecycle", () => {
  beforeEach(() => {
    state.projects.splice(0, state.projects.length, { id: 77, userId: 1, name: "Owned handover", status: "IN_PROGRESS" });
    state.items.splice(0, state.items.length, { id: 88, projectId: 77, taskExternalId: "TASK-001", itemStatus: "NOT_STARTED", note: null, orderIndex: 0 });
    state.notes.splice(0, state.notes.length, { id: 99, projectId: 77, body: "Initial context" });
  });

  it("supports owned read, update, note create, edit, and delete", async () => {
    const caller = appRouter.createCaller(context());
    const initial = await caller.portal.handoverGet({ projectId: 77 });
    expect(initial.project.id).toBe(77);
    expect(initial.notes[0]?.body).toBe("Initial context");
    await caller.portal.handoverItemUpdate({ projectId: 77, itemId: 88, itemStatus: "DONE", note: "Complete" });
    await caller.portal.handoverNote({ projectId: 77, body: "New note" });
    await caller.portal.handoverNoteEdit({ projectId: 77, noteId: 99, body: "Edited context" });
    await caller.portal.handoverNoteDelete({ projectId: 77, noteId: 99 });
    expect(state.items[0]?.itemStatus).toBe("DONE");
    expect(state.items[0]?.note).toBe("Complete");
    expect(state.notes.some(note => note.body === "Edited context")).toBe(false);
    expect(state.notes.some(note => note.body === "New note")).toBe(true);
  });
});
