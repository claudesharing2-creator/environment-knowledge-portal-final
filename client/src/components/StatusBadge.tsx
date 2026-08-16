import { AlertCircle, CheckCircle2, CircleHelp, FileSearch, ShieldAlert, Users, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const statusMeta: Record<string, { label: string; icon: typeof CheckCircle2; className: string }> = {
  SOURCE_VERIFIED: { label: "Source verified", icon: CheckCircle2, className: "border-emerald-300 bg-emerald-50 text-emerald-800" },
  SOURCE_SUPPORTED: { label: "Source supported", icon: CheckCircle2, className: "border-sky-300 bg-sky-50 text-sky-800" },
  PARTIAL_EVIDENCE: { label: "Partial evidence", icon: AlertCircle, className: "border-amber-300 bg-amber-50 text-amber-900" },
  CONFLICTING: { label: "Conflicting", icon: ShieldAlert, className: "border-rose-300 bg-rose-50 text-rose-800" },
  REQUIRES_HUMAN_REVIEW: { label: "Requires human review", icon: Users, className: "border-violet-300 bg-violet-50 text-violet-800" },
  HISTORICAL: { label: "Historical", icon: FileSearch, className: "border-slate-300 bg-slate-100 text-slate-700" },
  SUPERSEDED: { label: "Superseded", icon: XCircle, className: "border-slate-300 bg-slate-100 text-slate-700" },
  NOT_FOUND: { label: "Not found", icon: CircleHelp, className: "border-slate-300 bg-slate-50 text-slate-700" },
};

export default function StatusBadge({ status = "SOURCE_SUPPORTED" }: { status?: string }) {
  const meta = statusMeta[status] ?? statusMeta.SOURCE_SUPPORTED;
  const Icon = meta.icon;
  return <Badge variant="outline" className={`gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${meta.className}`}><Icon className="h-3.5 w-3.5" aria-hidden="true" />{meta.label}</Badge>;
}
