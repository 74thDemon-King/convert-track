import { actionItems } from "@/data/mockData";
import { Link2, Brain, AlertTriangle, CheckCircle2, Edit3, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TraceabilityPanelProps {
  selectedActionId: string | null;
}

const TraceabilityPanel = ({ selectedActionId }: TraceabilityPanelProps) => {
  const action = actionItems.find((a) => a.id === selectedActionId);

  if (!action) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center px-8">
        <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-4">
          <Link2 className="w-5 h-5 text-muted-foreground" strokeWidth={1.8} />
        </div>
        <p className="text-[14px] text-muted-foreground font-medium mb-1">No item selected</p>
        <p className="text-[12px] text-muted-foreground/60 leading-relaxed">Select an action item to view source references and AI reasoning.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">Traceability</p>
        <h4 className="text-[15px] font-bold text-foreground">{action.title}</h4>
      </div>

      {/* Source */}
      <div>
        <div className="flex items-center gap-2 text-[12px] font-semibold text-muted-foreground mb-2.5">
          <Link2 className="w-3.5 h-3.5" strokeWidth={1.8} />
          Source Reference
        </div>
        <div className="p-4 rounded-xl bg-muted/50 text-[13px] leading-relaxed">
          <span className="font-mono text-[10px] text-muted-foreground mr-2">[{action.sourceTimestamp}]</span>
          <span className="text-foreground/75">"{action.sourceSentence}"</span>
        </div>
      </div>

      {/* AI Reasoning */}
      <div>
        <div className="flex items-center gap-2 text-[12px] font-semibold text-muted-foreground mb-2.5">
          <Brain className="w-3.5 h-3.5" strokeWidth={1.8} />
          AI Reasoning
        </div>
        <div className="p-4 rounded-xl bg-ai-surface border border-ai-border text-[13px] text-ai-text leading-relaxed">
          {action.reasoning}
        </div>
      </div>

      {/* Missing */}
      {action.missingFields.length > 0 && (
        <div>
          <div className="flex items-center gap-2 text-[12px] font-semibold text-muted-foreground mb-2.5">
            <AlertTriangle className="w-3.5 h-3.5" strokeWidth={1.8} />
            Missing Information
          </div>
          <div className="space-y-2">
            {action.missingFields.map((f) => (
              <div key={f} className="flex items-center gap-2.5 p-3 rounded-xl text-[13px] status-missing border">
                <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="font-semibold">{f}</span>
                <span className="text-[11px] opacity-70">— Requires confirmation</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Confidence */}
      <div>
        <p className="text-[12px] font-semibold text-muted-foreground mb-2.5">Confidence</p>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
            <div className={`h-full rounded-full transition-all
              ${action.confidence === "high" ? "w-full bg-status-confirmed" : ""}
              ${action.confidence === "medium" ? "w-2/3 bg-status-review" : ""}
              ${action.confidence === "low" ? "w-1/3 bg-status-missing" : ""}
            `} />
          </div>
          <span className="text-[11px] font-semibold text-muted-foreground capitalize w-14">{action.confidence}</span>
        </div>
      </div>

      {/* Validation */}
      <div className="pt-4 border-t border-border">
        <p className="text-[12px] font-semibold text-muted-foreground mb-3">Validation</p>
        <div className="flex flex-col gap-2">
          <Button size="sm" variant="outline" className="text-xs gap-2 justify-start h-9 rounded-xl text-status-confirmed hover:bg-muted">
            <CheckCircle2 className="w-3.5 h-3.5" /> Approve
          </Button>
          <Button size="sm" variant="outline" className="text-xs gap-2 justify-start h-9 rounded-xl">
            <Edit3 className="w-3.5 h-3.5" /> Edit Details
          </Button>
          <Button size="sm" variant="outline" className="text-xs gap-2 justify-start h-9 rounded-xl text-status-missing hover:bg-muted">
            <XCircle className="w-3.5 h-3.5" /> Reject
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TraceabilityPanel;
