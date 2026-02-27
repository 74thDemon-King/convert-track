import { useState } from "react";
import { ChevronDown, ChevronUp, User, Calendar, Link2, Sparkles } from "lucide-react";
import type { ActionItem } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

interface ActionCardProps {
  action: ActionItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const confidenceColors: Record<string, string> = {
  high: "status-confirmed",
  medium: "status-review",
  low: "status-missing",
};

const statusLabels: Record<string, string> = {
  confirmed: "Confirmed",
  "needs-review": "Needs Review",
  "missing-info": "Missing Info",
};

const statusStyles: Record<string, string> = {
  confirmed: "status-confirmed",
  "needs-review": "status-review",
  "missing-info": "status-missing",
};

const ActionCard = ({ action, isSelected, onSelect }: ActionCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => onSelect(action.id)}
      className={`glass-panel rounded-lg p-4 cursor-pointer transition-all
        ${isSelected ? "ring-2 ring-accent/40 shadow-md" : "hover:shadow-sm"}
        ${action.status === "needs-review" ? "pulse-review" : ""}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-sm font-semibold text-foreground leading-tight">{action.title}</h3>
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border whitespace-nowrap ${statusStyles[action.status]}`}>
          {statusLabels[action.status]}
        </span>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground mb-3">
        <span className="flex items-center gap-1.5">
          <User className="w-3 h-3" />
          {action.owner ? (
            <span className="text-foreground">{action.owner}</span>
          ) : (
            <span className="text-status-missing italic">Needs Confirmation</span>
          )}
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar className="w-3 h-3" />
          {action.deadline ? (
            <span className="text-foreground">{action.deadline}</span>
          ) : (
            <span className="text-status-missing italic">Missing</span>
          )}
        </span>
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3 h-3" />
          <span className={`font-medium capitalize ${confidenceColors[action.confidence]}`}>
            {action.confidence} confidence
          </span>
        </span>
      </div>

      {/* Source */}
      <button
        onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
        className="flex items-center gap-1.5 text-[11px] text-accent hover:text-accent/80 transition-colors"
      >
        <Link2 className="w-3 h-3" />
        <span>Source context</span>
        {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>

      {expanded && (
        <div className="mt-2 p-3 rounded-md bg-muted/50 text-xs text-muted-foreground leading-relaxed">
          <span className="font-mono text-[10px] text-accent mr-2">[{action.sourceTimestamp}]</span>
          "{action.sourceSentence}"
        </div>
      )}

      {/* Missing fields */}
      {action.missingFields.length > 0 && (
        <div className="mt-3 flex gap-1.5">
          {action.missingFields.map((f) => (
            <span key={f} className="text-[10px] font-medium px-2 py-0.5 rounded-full border status-missing">
              {f} required
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActionCard;
