import { actionItems } from "@/data/mockData";
import { TrendingUp } from "lucide-react";
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
      <h2 className="text-2xl font-bold text-foreground mb-1">Dashboard</h2>
      <p className="text-sm text-muted-foreground mb-8">All Your Workflows And Permissions</p>

      {/* Stats card */}
      <div className="glass-panel-raised p-6 mb-4">
        <p className="text-sm text-muted-foreground mb-2">Executions</p>
        <div className="flex items-end gap-3">
          <span className="text-5xl font-bold text-foreground tracking-tight">{actionItems.length}</span>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full mb-1.5 status-confirmed border flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Active
          </span>
        </div>
      </div>

      <button className="text-sm font-medium text-foreground mb-8 flex items-center gap-1 hover:gap-2 transition-all">
        See Report <span>→</span>
      </button>

      {/* Section header */}
      <h3 className="text-xl font-bold text-foreground mb-4">Extracted Actions</h3>

      {/* Tabs */}
      <div className="flex gap-6 mb-6 border-b border-border">
        {["All Items", "Confirmed", "Review"].map((tab, i) => (
          <button key={tab} className={`text-[13px] pb-3 transition-colors ${i === 0 ? "font-semibold text-foreground border-b-2 border-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Summary dots */}
      <div className="flex gap-5 mb-6">
        <div className="flex items-center gap-2 text-[13px]">
          <span className="w-2 h-2 rounded-full bg-status-confirmed" />
          <span className="text-muted-foreground">{confirmed} Confirmed</span>
        </div>
        <div className="flex items-center gap-2 text-[13px]">
          <span className="w-2 h-2 rounded-full bg-status-review" />
          <span className="text-muted-foreground">{review} Review</span>
        </div>
        <div className="flex items-center gap-2 text-[13px]">
          <span className="w-2 h-2 rounded-full bg-status-missing" />
          <span className="text-muted-foreground">{missing} Missing</span>
        </div>
      </div>

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
