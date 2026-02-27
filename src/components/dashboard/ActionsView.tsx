import { actionItems } from "@/data/mockData";
import { Sparkles } from "lucide-react";
import ActionCard from "./ActionCard";

interface ActionsViewProps {
  selectedAction: string | null;
  onSelectAction: (id: string) => void;
}

const ActionsView = ({ selectedAction, onSelectAction }: ActionsViewProps) => {
  const confirmed = actionItems.filter((a) => a.status === "confirmed").length;
  const review = actionItems.filter((a) => a.status === "needs-review").length;
  const missing = actionItems.filter((a) => a.status === "missing-info").length;

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-5 h-5 text-accent" />
        <h2 className="text-lg font-semibold text-foreground">Extracted Actions</h2>
      </div>
      <p className="text-xs text-muted-foreground mb-5">
        Detected from discussion · {actionItems.length} items identified
      </p>

      {/* Summary bar */}
      <div className="flex gap-4 mb-6">
        <div className="flex items-center gap-1.5 text-xs">
          <span className="w-2 h-2 rounded-full bg-status-confirmed" />
          <span className="text-muted-foreground">{confirmed} Confirmed</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <span className="w-2 h-2 rounded-full bg-status-review" />
          <span className="text-muted-foreground">{review} Needs Review</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <span className="w-2 h-2 rounded-full bg-status-missing" />
          <span className="text-muted-foreground">{missing} Missing Info</span>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {actionItems.map((action) => (
          <ActionCard
            key={action.id}
            action={action}
            isSelected={selectedAction === action.id}
            onSelect={onSelectAction}
          />
        ))}
      </div>
    </div>
  );
};

export default ActionsView;
