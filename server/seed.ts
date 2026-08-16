import fs from "node:fs/promises";
import path from "node:path";
import { getDb } from "./db";
import { portalRecords } from "../drizzle/schema";

const seedPath = path.resolve(process.cwd(), "server/seed-data.json");
const titleByType: Record<string, (item: Record<string, unknown>) => string> = {
  document: item => String(item.filename ?? item.relative_path ?? item.document_id ?? "Untitled document"),
  domain: item => String(item.domain_name ?? item.domain_id ?? "Untitled domain"),
  site_group: item => String(item.site_group_name ?? item.site_group_id ?? "Untitled site group"),
  monitoring: item => String(item.activity_name ?? item.monitoring_id ?? "Untitled monitoring structure"),
  workflow: item => String(item.workflow_name ?? item.workflow_id ?? "Untitled workflow"),
  task: item => String(item.task_name ?? item.task_id ?? "Untitled task"),
  role: item => String(item.role_or_department ?? item.role_id ?? "Untitled role"),
  site: item => String(item.name_or_entity ?? item.site_id ?? "Untitled site"),
  regulation: item => String(item.name ?? item.regulation_id ?? "Untitled regulation"),
  parameter: item => String(item.parameter ?? item.parameter_id ?? "Untitled parameter"),
  glossary: item => String(item.term ?? item.glossary_id ?? "Untitled term"),
  gap: item => String(item.gap_statement ?? item.gap_id ?? "Untitled gap"),
  conflict: item => String(item.topic ?? item.conflict_id ?? "Untitled conflict"),
};

function refs(item: Record<string, unknown>) {
  const values = [item.source_references, item.source_document_ids, item.source_refs, item.document_ids, item.source_documents, item.source_a, item.source_b]
    .flatMap(value => Array.isArray(value) ? value : value ? [value] : []);
  return Array.from(new Set(values.map(String)));
}

function flatten(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) return value.map(flatten).join(" ");
  if (typeof value === "object") return Object.values(value as Record<string, unknown>).map(flatten).join(" ");
  return String(value);
}

async function main() {
  const db = await getDb();
  if (!db) throw new Error("DATABASE_URL is unavailable");
  const seed = JSON.parse(await fs.readFile(seedPath, "utf8")) as Record<string, unknown>;
  const collections: Array<[string, unknown]> = [
    ["document", seed.documents], ["domain", seed.domains], ["site_group", seed.site_groups], ["monitoring", seed.monitoring], ["workflow", seed.workflows],
    ["task", seed.tasks], ["role", seed.roles], ["site", seed.sites], ["regulation", seed.regulations],
    ["parameter", seed.parameters], ["glossary", seed.glossary], ["gap", seed.gaps], ["conflict", seed.conflicts],
  ];
  const rows: Array<typeof portalRecords.$inferInsert> = [];
  for (const [recordType, collection] of collections) {
    for (const raw of (Array.isArray(collection) ? collection : [])) {
      const item = raw as Record<string, unknown>;
      const externalId = String(item.document_id ?? item.domain_id ?? item.site_group_id ?? item.monitoring_id ?? item.workflow_id ?? item.task_id ?? item.role_id ?? item.site_id ?? item.regulation_id ?? item.parameter_id ?? item.glossary_id ?? item.gap_id ?? item.conflict_id);
      if (!externalId) continue;
      const title = (titleByType[recordType]?.(item) ?? externalId).slice(0, 512);
      const status = String(item.status ?? item.confirmation_status ?? item.currency_status ?? (recordType === "conflict" ? "CONFLICTING" : recordType === "gap" ? "REQUIRES_HUMAN_REVIEW" : "SOURCE_SUPPORTED"));
      const sourceRefs = refs(item);
      rows.push({ recordType, externalId, title, status: status.slice(0, 64), data: JSON.stringify(item), sourceRefs: JSON.stringify(sourceRefs), searchText: flatten(item).slice(0, 60000) });
    }
  }
  for (let i = 0; i < rows.length; i += 100) {
    await db.insert(portalRecords).values(rows.slice(i, i + 100)).onDuplicateKeyUpdate({ set: { updatedAt: new Date() } });
  }
  console.log(`Seeded ${rows.length} source-grounded records.`);
}

main().catch(error => { console.error(error); process.exit(1); });
