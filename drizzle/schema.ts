import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const portalRecords = mysqlTable("portal_records", {
  id: int("id").autoincrement().primaryKey(),
  recordType: varchar("recordType", { length: 64 }).notNull(),
  externalId: varchar("externalId", { length: 128 }).notNull().unique(),
  title: varchar("title", { length: 512 }).notNull(),
  status: varchar("status", { length: 64 }).default("SOURCE_SUPPORTED").notNull(),
  data: text("data").notNull(),
  sourceRefs: text("sourceRefs").notNull(),
  searchText: text("searchText").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const handoverProjects = mysqlTable("handover_projects", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  status: varchar("status", { length: 32 }).default("IN_PROGRESS").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const handoverItems = mysqlTable("handover_items", {
  id: int("id").autoincrement().primaryKey(),
  projectId: int("projectId").notNull(),
  taskExternalId: varchar("taskExternalId", { length: 128 }).notNull(),
  itemStatus: varchar("itemStatus", { length: 32 }).default("NOT_STARTED").notNull(),
  note: text("note"),
  orderIndex: int("orderIndex").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const handoverNotes = mysqlTable("handover_notes", {
  id: int("id").autoincrement().primaryKey(),
  projectId: int("projectId").notNull(),
  body: text("body").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type PortalRecord = typeof portalRecords.$inferSelect;
export type HandoverProject = typeof handoverProjects.$inferSelect;
export type HandoverItem = typeof handoverItems.$inferSelect;
export type HandoverNote = typeof handoverNotes.$inferSelect;
