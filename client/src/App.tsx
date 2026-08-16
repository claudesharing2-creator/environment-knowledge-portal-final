import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import DashboardLayout from "./components/DashboardLayout";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Home, PortalRoute, SearchPage, AIPage, HandoverPage, CompliancePage } from "./pages/Portal";
import NotFound from "./pages/NotFound";
import { Route, Switch } from "wouter";

function Router() {
  return <DashboardLayout><Switch>
    <Route path="/" component={Home} />
    <Route path="/search" component={SearchPage} />
    <Route path="/ai" component={AIPage} />
    <Route path="/take-over" component={HandoverPage} />
    <Route path="/start-here" component={StartHere} />
    <Route path="/learning-path" component={LearningPath} />
    <Route path="/faq" component={FaqPage} />
    <Route path="/topics" component={PortalRoute} /><Route path="/tasks" component={PortalRoute} /><Route path="/workflows" component={PortalRoute} />
    <Route path="/sites" component={PortalRoute} /><Route path="/monitoring" component={PortalRoute} /><Route path="/compliance" component={CompliancePage} />
    <Route path="/documents" component={PortalRoute} /><Route path="/glossary" component={PortalRoute} /><Route path="/knowledge-gaps" component={PortalRoute} /><Route path="/conflicts" component={PortalRoute} />
    <Route path="/404" component={NotFound} /><Route component={NotFound} />
  </Switch></DashboardLayout>;
}

function StartHere(){return <div className="max-w-4xl"><div className="mb-8"><p className="text-[11px] uppercase tracking-[0.22em] text-emerald-700">Orientation</p><h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Start with the evidence layer.</h2><p className="mt-4 text-sm leading-7 text-slate-600">This portal is organized around audited Environment source material. Learn the status vocabulary first, then use Tasks, Sites, Compliance and Documents to build context. When evidence is incomplete, the portal shows PARTIAL_EVIDENCE rather than filling the gap.</p></div><div className="grid gap-4 md:grid-cols-3"><div className="rounded-2xl bg-[#12362b] p-5 text-white"><p className="text-xs uppercase tracking-wider text-lime-200">01</p><h3 className="mt-8 font-semibold">Orient</h3><p className="mt-2 text-sm leading-6 text-emerald-50/70">Understand domains, workflows and status labels.</p></div><div className="rounded-2xl border border-emerald-950/10 bg-white p-5"><p className="text-xs uppercase tracking-wider text-emerald-700">02</p><h3 className="mt-8 font-semibold">Trace</h3><p className="mt-2 text-sm leading-6 text-slate-600">Open the evidence drawer on every knowledge card.</p></div><div className="rounded-2xl border border-amber-200 bg-amber-50 p-5"><p className="text-xs uppercase tracking-wider text-amber-800">03</p><h3 className="mt-8 font-semibold text-amber-950">Verify</h3><p className="mt-2 text-sm leading-6 text-amber-900">Review gaps and conflicts before acting.</p></div></div></div>}
function LearningPath(){return <div className="max-w-4xl"><p className="text-[11px] uppercase tracking-[0.22em] text-emerald-700">Learning path</p><h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">A practical sequence for new personnel.</h2><div className="mt-8 space-y-4">{["Orientation and Environment fundamentals","Operational tasks and workflows","Sites, facilities and monitoring context","Compliance layers and document traceability","Handover, gaps and verification"].map((step,i)=><div key={step} className="flex gap-4 rounded-2xl border border-emerald-950/10 bg-white p-5"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-800">{i+1}</div><div><h3 className="font-semibold text-slate-900">{step}</h3><p className="mt-1 text-sm leading-6 text-slate-600">Move through the audited knowledge base while keeping evidence status and source references visible.</p></div></div>)}</div></div>}
function FaqPage(){return <div className="max-w-4xl"><p className="text-[11px] uppercase tracking-[0.22em] text-emerald-700">Frequently asked questions</p><h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Find the question, then check the source.</h2><div className="mt-8 space-y-3">{["How do I find the source behind a task?","What does PARTIAL_EVIDENCE mean?","How are conflicts handled?","Can the AI resolve a conflict?","What happens when information is not found?"].map((question)=><details key={question} className="group rounded-2xl border border-emerald-950/10 bg-white p-5"><summary className="cursor-pointer font-semibold text-slate-900">{question}</summary><p className="mt-3 text-sm leading-6 text-slate-600">Use the evidence drawer and status badge on the relevant record. This answer pattern describes the portal’s navigation behavior; consult source records for company-specific guidance.</p></details>)}</div></div>}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
