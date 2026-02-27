import { useState } from "react";
import { ChevronDown, ChevronUp, User, Calendar, Link2, Sparkles } from "lucide-react";
import type { ActionItem } from "@/data/mockData";

interface ActionCardProps {
  action: ActionItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

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
      className={`glass-panel p-5 cursor-pointer transition-all
        ${isSelected ? "glass-panel-raised ring-1 ring-foreground/10" : "hover:shadow-md"}
        ${action.status === "needs-review" ? "pulse-review" : ""}
      `}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <h3 className="text-[15px] font-semibold text-foreground leading-snug">{action.title}</h3>
        <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap ${statusStyles[action.status]}`}>
          {statusLabels[action.status]}
        </span>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-muted-foreground mb-4">
        <span className="flex items-center gap-1.5">
          <User className="w-3.5 h-3.5" strokeWidth={1.8} />
          {action.owner ? (
            <span className="text-foreground font-medium">{action.owner}</span>
          ) : (
            <span className="text-status-missing italic text-xs">Needs Confirmation</span>
          )}
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" strokeWidth={1.8} />
          {action.deadline ? (
            <span className="text-foreground">{action.deadline}</span>
          ) : (
            <span className="text-status-missing italic text-xs">Missing</span>
          )}
        </span>
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" strokeWidth={1.8} />
          <span className="capitalize text-xs font-medium">{action.confidence}</span>
        </span>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
        className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors"
      >
        <Link2 className="w-3.5 h-3.5" strokeWidth={1.8} />
        <span>Source context</span>
        {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>

      {expanded && (
        <div className="mt-3 p-4 rounded-xl bg-muted/50 text-[13px] text-muted-foreground leading-relaxed">
          <span className="font-mono text-[10px] text-foreground/50 mr-2">[{action.sourceTimestamp}]</span>
          "{action.sourceSentence}"
        </div>
      )}

      {action.missingFields.length > 0 && (
        <div className="mt-4 flex gap-2">
          {action.missingFields.map((f) => (
            <span key={f} className="text-[10px] font-semibold px-2.5 py-1 rounded-full border status-missing">
              {f} required
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActionCard;
