import seed from "../../../server/seed-data.json";

type RawRecord = Record<string, unknown>;
export type PortalType = "document" | "domain" | "site_group" | "monitoring" | "workflow" | "task" | "role" | "site" | "regulation" | "parameter" | "glossary" | "gap" | "conflict";
export type PortalCard = { id: string; type: PortalType; title: string; status: string; refs: string[]; data: RawRecord };

const source = seed as Record<string, unknown>;
const collections: Record<PortalType, RawRecord[]> = {
  document: (source.documents as RawRecord[]) ?? [], domain: (source.domains as RawRecord[]) ?? [], site_group: (source.site_groups as RawRecord[]) ?? [],
  monitoring: (source.monitoring as RawRecord[]) ?? [], workflow: (source.workflows as RawRecord[]) ?? [], task: (source.tasks as RawRecord[]) ?? [],
  role: (source.roles as RawRecord[]) ?? [], site: (source.sites as RawRecord[]) ?? [], regulation: (source.regulations as RawRecord[]) ?? [],
  parameter: (source.parameters as RawRecord[]) ?? [], glossary: (source.glossary as RawRecord[]) ?? [], gap: (source.gaps as RawRecord[]) ?? [], conflict: (source.conflicts as RawRecord[]) ?? [],
};

const fields: Record<PortalType, string[]> = {
  document: ["filename", "relative_path", "document_id"], domain: ["domain_name", "domain_id"], site_group: ["site_group_name", "site_group_id"], monitoring: ["activity_name", "monitoring_id"], workflow: ["workflow_name", "workflow_id"],
  task: ["task_name", "task_id"], role: ["role_or_department", "role_id"], site: ["name_or_entity", "site_id"], regulation: ["name", "regulation_id"], parameter: ["parameter", "parameter_id"], glossary: ["term", "glossary_id"], gap: ["gap_statement", "gap_id"], conflict: ["topic", "conflict_id"],
};

function idOf(item: RawRecord) { return String(item.document_id ?? item.domain_id ?? item.site_group_id ?? item.monitoring_id ?? item.workflow_id ?? item.task_id ?? item.role_id ?? item.site_id ?? item.regulation_id ?? item.parameter_id ?? item.glossary_id ?? item.gap_id ?? item.conflict_id ?? ""); }
function titleOf(type: PortalType, item: RawRecord) { return fields[type].map(field => item[field]).find(Boolean)?.toString() ?? "Catatan tanpa judul"; }
function statusOf(type: PortalType, item: RawRecord) { if (type === "conflict") return "CONFLICTING"; if (type === "gap") return "REQUIRES_HUMAN_REVIEW"; return String(item.status ?? item.confirmation_status ?? item.currency_status ?? "SOURCE_SUPPORTED").split(" — ")[0]; }
function refsOf(item: RawRecord) {
  const docs = new Map(((source.documents as RawRecord[]) ?? []).map(doc => [String(doc.document_id ?? ""), doc]));
  const values = [item.source_references, item.source_document_ids, item.source_refs, item.document_ids, item.source_documents, item.source_a, item.source_b].flatMap(value => Array.isArray(value) ? value : value ? [value] : []).map(String);
  return Array.from(new Set(values.map(ref => { const id = ref.match(/ENV-\d+/)?.[0]; const doc = id ? docs.get(id) : undefined; return ref.includes("|") || !id || !doc ? ref : `${id} | ${String(doc.filename ?? doc.relative_path ?? "")}`; }))).slice(0, 12);
}
function card(type: PortalType, item: RawRecord): PortalCard { return { id: idOf(item), type, title: titleOf(type, item), status: statusOf(type, item), refs: refsOf(item), data: item }; }
function flatten(value: unknown): string { if (value === null || value === undefined) return ""; if (Array.isArray(value)) return value.map(flatten).join(" "); if (typeof value === "object") return Object.values(value as RawRecord).map(flatten).join(" "); return String(value); }

export function listStatic(type: PortalType, limit = 60) { return (collections[type] ?? []).slice(0, limit).map(item => card(type, item)); }
export function getStatic(type: PortalType, id: string) { const item = collections[type]?.find(candidate => idOf(candidate) === id); return item ? card(type, item) : null; }
export function searchStatic(query: string, type?: PortalType, status?: string, limit = 30) {
  const terms = query.toLowerCase().split(/\s+/).filter(term => term.length > 2);
  const kinds = type ? [type] : (Object.keys(collections) as PortalType[]);
  return kinds.flatMap(kind => collections[kind].map(item => { const text = flatten(item).toLowerCase(); const score = terms.reduce((sum, term) => sum + (text.includes(term) ? 1 : 0), 0); return { item: card(kind, item), score }; })).filter(result => result.score > 0 && (!status || result.item.status === status)).sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title)).slice(0, limit).map(result => result.item);
}
export function facetsStatic(query: string) {
  const results = searchStatic(query, undefined, undefined, 1000);
  const count = (key: "type" | "status") => Array.from(results.reduce((map, item) => map.set(item[key], (map.get(item[key]) ?? 0) + 1), new Map<string, number>())).sort((a, b) => b[1] - a[1]);
  return { types: count("type"), statuses: count("status") };
}
export function suggestionsStatic(query: string) { return query.trim().length > 2 ? searchStatic(query, undefined, undefined, 6).map(item => item.title) : []; }
