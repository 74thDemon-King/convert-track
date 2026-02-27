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
      <div className="h-full flex flex-col items-center justify-center text-center px-6">
        <Link2 className="w-8 h-8 text-muted-foreground/40 mb-3" />
        <p className="text-sm text-muted-foreground">Select an action item to view its traceability details.</p>
        <p className="text-xs text-muted-foreground/60 mt-1">Source references, AI reasoning, and validation controls will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Traceability</h3>
        <h4 className="text-sm font-semibold text-foreground">{action.title}</h4>
      </div>

      {/* Source Reference */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Link2 className="w-3.5 h-3.5" />
          Source Reference
        </div>
        <div className="p-3 rounded-md bg-muted/50 text-xs leading-relaxed">
          <span className="font-mono text-[10px] text-accent mr-1.5">[{action.sourceTimestamp}]</span>
          <span className="text-foreground/80">"{action.sourceSentence}"</span>
        </div>
      </div>

      {/* AI Reasoning */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Brain className="w-3.5 h-3.5" />
          AI Reasoning
        </div>
        <div className="p-3 rounded-md bg-ai-surface border border-ai-border text-xs text-ai-text leading-relaxed">
          {action.reasoning}
        </div>
      </div>

      {/* Flags */}
      {action.missingFields.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <AlertTriangle className="w-3.5 h-3.5" />
            Missing Information
          </div>
          <div className="space-y-1.5">
            {action.missingFields.map((f) => (
              <div key={f} className="flex items-center gap-2 p-2.5 rounded-md text-xs status-missing border">
                <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                <span className="font-medium">{f}</span>
                <span className="text-[10px] opacity-75">— Requires confirmation</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Confidence */}
      <div className="space-y-2">
        <div className="text-xs font-medium text-muted-foreground">Confidence Level</div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className={`h-full rounded-full transition-all
                ${action.confidence === "high" ? "w-full bg-status-confirmed" : ""}
                ${action.confidence === "medium" ? "w-2/3 bg-status-review" : ""}
                ${action.confidence === "low" ? "w-1/3 bg-status-missing" : ""}
              `}
            />
          </div>
          <span className="text-[10px] font-medium text-muted-foreground capitalize">{action.confidence}</span>
        </div>
      </div>

      {/* Validation Controls */}
      <div className="space-y-2 pt-2 border-t border-border">
        <div className="text-xs font-medium text-muted-foreground mb-3">Human Validation</div>
        <div className="flex flex-col gap-2">
          <Button size="sm" variant="outline" className="text-xs gap-1.5 justify-start h-8 text-status-confirmed border-status-confirmed/30 hover:bg-status-confirmed/10">
            <CheckCircle2 className="w-3.5 h-3.5" /> Approve Action
          </Button>
          <Button size="sm" variant="outline" className="text-xs gap-1.5 justify-start h-8">
            <Edit3 className="w-3.5 h-3.5" /> Edit Details
          </Button>
          <Button size="sm" variant="outline" className="text-xs gap-1.5 justify-start h-8 text-status-missing border-status-missing/30 hover:bg-status-missing/10">
            <XCircle className="w-3.5 h-3.5" /> Reject
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TraceabilityPanel;
