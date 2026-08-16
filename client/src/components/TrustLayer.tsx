import { AlertCircle, FileSearch, ShieldAlert } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TrustLayer({ status }: { status?: string }) {
  return <Card className="border-emerald-950/10 bg-[#eaf5e8]"><CardHeader><CardTitle className="flex items-center gap-2 text-base"><FileSearch className="h-4 w-4 text-emerald-700" /> Trust layer</CardTitle><CardDescription>How to use this record</CardDescription></CardHeader><CardContent className="space-y-3 text-sm leading-6 text-emerald-950"><p><strong>Start with status.</strong> Open the source drawer before treating a record as operational guidance.</p><p><AlertCircle className="mr-1 inline h-4 w-4 align-text-bottom" /> Missing fields remain PARTIAL_EVIDENCE.</p><p><ShieldAlert className="mr-1 inline h-4 w-4 align-text-bottom" /> Conflicts are shown, not resolved.</p>{status && <StatusBadge status={status} />}</CardContent></Card>;
}
