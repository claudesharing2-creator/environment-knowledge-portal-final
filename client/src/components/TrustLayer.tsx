import { AlertCircle, FileSearch, ShieldAlert } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TrustLayer({ status }: { status?: string }) {
  return <Card className="border-emerald-950/10 bg-[#eaf5e8]"><CardHeader><CardTitle className="flex items-center gap-2 text-base"><FileSearch className="h-4 w-4 text-emerald-700" /> Lapisan kepercayaan</CardTitle><CardDescription>Cara menggunakan catatan ini</CardDescription></CardHeader><CardContent className="space-y-3 text-sm leading-6 text-emerald-950"><p><strong>Mulai dari status.</strong> Buka panel sumber sebelum menjadikan catatan sebagai panduan operasional.</p><p><AlertCircle className="mr-1 inline h-4 w-4 align-text-bottom" /> Kolom yang hilang tetap berstatus BUKTI_SEBAGIAN.</p><p><ShieldAlert className="mr-1 inline h-4 w-4 align-text-bottom" /> Konflik ditampilkan, bukan diselesaikan.</p>{status && <StatusBadge status={status} />}</CardContent></Card>;
}
