import fs from "node:fs";
import path from "node:path";

type RawRecord = Record<string, unknown>;
export type PortalType = "document" | "domain" | "site_group" | "monitoring" | "workflow" | "task" | "role" | "site" | "regulation" | "parameter" | "glossary" | "gap" | "conflict";

const seed = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), "server/seed-data.json"), "utf8")) as {
  meta: { counts: Record<string, number> };
  [key: string]: unknown;
};

const collections: Record<PortalType, RawRecord[]> = {
  document: (seed.documents as RawRecord[]) ?? [],
  domain: (seed.domains as RawRecord[]) ?? [],
  site_group: (seed.site_groups as RawRecord[]) ?? [],
  monitoring: (seed.monitoring as RawRecord[]) ?? [],
  workflow: (seed.workflows as RawRecord[]) ?? [],
  task: (seed.tasks as RawRecord[]) ?? [],
  role: (seed.roles as RawRecord[]) ?? [],
  site: (seed.sites as RawRecord[]) ?? [],
  regulation: (seed.regulations as RawRecord[]) ?? [],
  parameter: (seed.parameters as RawRecord[]) ?? [],
  glossary: (seed.glossary as RawRecord[]) ?? [],
  gap: (seed.gaps as RawRecord[]) ?? [],
  conflict: (seed.conflicts as RawRecord[]) ?? [],
};

export function getStats() {
  return { ...seed.meta.counts, site_groups: collections.site_group.length, monitoring: collections.monitoring.length } as Record<string, number>;
}

export function getCollection(type: PortalType) {
  return collections[type] ?? [];
}

export function getTitle(type: PortalType, item: RawRecord) {
  const fields: Record<PortalType, string[]> = {
    document: ["filename", "relative_path", "document_id"], domain: ["domain_name", "domain_id"], site_group: ["site_group_name", "site_group_id"], monitoring: ["activity_name", "monitoring_id"], workflow: ["workflow_name", "workflow_id"],
    task: ["task_name", "task_id"], role: ["role_or_department", "role_id"], site: ["name_or_entity", "site_id"], regulation: ["name", "regulation_id"],
    parameter: ["parameter", "parameter_id"], glossary: ["term", "glossary_id"], gap: ["gap_statement", "gap_id"], conflict: ["topic", "conflict_id"],
  };
  for (const field of fields[type]) if (item[field]) return String(item[field]);
  return "Untitled record";
}

export function getId(item: RawRecord) {
  return String(item.document_id ?? item.domain_id ?? item.site_group_id ?? item.monitoring_id ?? item.workflow_id ?? item.task_id ?? item.role_id ?? item.site_id ?? item.regulation_id ?? item.parameter_id ?? item.glossary_id ?? item.gap_id ?? item.conflict_id ?? "");
}

export function getStatus(type: PortalType, item: RawRecord) {
  if (type === "conflict") return "CONFLICTING";
  if (type === "gap") return "REQUIRES_HUMAN_REVIEW";
  return String(item.status ?? item.confirmation_status ?? item.currency_status ?? "SOURCE_SUPPORTED").split(" — ")[0];
}

export function sourceRefs(item: RawRecord) {
  const values = [item.source_references, item.source_document_ids, item.source_refs, item.document_ids, item.source_documents, item.source_a, item.source_b].flatMap(value => Array.isArray(value) ? value : value ? [value] : []);
  return Array.from(new Set(values.map(String))).slice(0, 12);
}

const acronymExpansions: Record<string, string[]> = { "rkl-rpl": ["rkl", "rpl", "environmental", "monitoring"], pkkprl: ["marine", "space", "permit"], wbm: ["water", "based", "mud"], sbm: ["synthetic", "based", "mud"] };
const glossaryExpansions: Record<string, string[]> = collections.glossary.reduce<Record<string, string[]>>((acc, item) => { const term = String(item.term ?? "").toLowerCase().trim(); const meaning = String(item.definition ?? item.expansion ?? item.meaning ?? item.full_meaning ?? "").toLowerCase(); if (term && meaning) acc[term] = meaning.split(/[^a-z0-9]+/).filter(word => word.length > 2).slice(0, 8); return acc; }, {} as Record<string, string[]>);
function editDistance(a: string, b: string): number { const row = Array.from({ length: b.length + 1 }, (_, index) => index); for (let i = 1; i <= a.length; i += 1) { let previous = row[0]; row[0] = i; for (let j = 1; j <= b.length; j += 1) { const current = row[j]; row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1)); previous = current; } } return row[b.length]; }
function tokenMatches(token: string, haystack: string) { if (haystack.includes(token)) return true; if (token.length < 5) return false; return haystack.split(/[^a-z0-9]+/).some(word => word.length >= 5 && editDistance(token, word) <= 1); }

function flatten(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) return value.map(flatten).join(" ");
  if (typeof value === "object") return Object.values(value as RawRecord).map(flatten).join(" ");
  return String(value);
}

export function toCard(type: PortalType, item: RawRecord) {
  return { id: getId(item), type, title: getTitle(type, item), status: getStatus(type, item), refs: sourceRefs(item), data: item };
}

export function searchRecords(query: string, type?: PortalType, status?: string, limit = 30) {
  const stopwords = new Set(["the", "and", "about", "which", "what", "how", "where", "does", "from", "with", "information", "current", "environment", "knowledge", "base"]);
  const rawTokens = query.toLowerCase().split(/\s+/).filter(token => token.length > 2 && !stopwords.has(token));
  const tokens = Array.from(new Set(rawTokens.flatMap(token => [token, ...(acronymExpansions[token] ?? []), ...(glossaryExpansions[token] ?? [])])));
  const types = type ? [type] : (Object.keys(collections) as PortalType[]);
  const minimumScore = tokens.length > 2 ? 2 : 1;
  return types.flatMap(kind => getCollection(kind).map(item => {
    const card = toCard(kind, item);
    const haystack = flatten(item).toLowerCase();
    const score = tokens.reduce((sum, token) => sum + (tokenMatches(token, haystack) ? 1 : 0), 0);
    return { ...card, score };
  })).filter(item => item.score >= minimumScore && (!status || item.status === status)).sort((a, b) => b.score - a.score || a.title.localeCompare(b.title)).slice(0, limit);
}

export function findById(type: PortalType, id: string) {
  const item = getCollection(type).find(candidate => getId(candidate) === id);
  return item ? toCard(type, item) : null;
}

export function buildGroundedContext(question: string) {
  const explicitConflict = /conflict|conflicting|disagree|inconsistent/i.test(question);
  const searched = searchRecords(question, undefined, undefined, 6);
  const conflictRecords = explicitConflict ? getCollection("conflict").map(item => toCard("conflict", item)).slice(0, 6) : [];
  const results = Array.from(new Map([...conflictRecords, ...searched].map(item => [`${item.type}-${item.id}`, item])).values()).slice(0, 6);
  const conflicts = results.filter(result => result.status === "CONFLICTING");
  const gaps = results.filter(result => result.status === "REQUIRES_HUMAN_REVIEW");
  return { results, conflicts, gaps };
}
