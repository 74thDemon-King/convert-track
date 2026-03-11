import { executionSteps } from "@/data/mockData";
import { ArrowDown, User, AlertCircle, CheckCircle2, Clock, HelpCircle } from "lucide-react";

const statusStyles: Record<string, { bg: string; border: string; icon: typeof CheckCircle2 }> = {
  confirmed: {
    bg: "bg-[hsl(var(--status-confirmed)/0.08)]",
    border: "border-[hsl(var(--status-confirmed)/0.35)]",
    icon: CheckCircle2,
  },
  "needs-review": {
    bg: "bg-[hsl(var(--status-review)/0.08)]",
    border: "border-[hsl(var(--status-review)/0.35)]",
    icon: Clock,
  },
  "missing-info": {
    bg: "bg-[hsl(var(--status-missing)/0.08)]",
    border: "border-[hsl(var(--status-missing)/0.35)]",
    icon: HelpCircle,
  },
};

const statusLabel: Record<string, { text: string; color: string }> = {
  confirmed: { text: "Confirmed", color: "text-status-confirmed" },
  "needs-review": { text: "Needs Review", color: "text-status-review" },
  "missing-info": { text: "Missing Info", color: "text-status-missing" },
};

const ExecutionPlanView = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-1">Execution Plan</h2>
      <p className="text-sm text-muted-foreground mb-8">
        Logical dependency flow · {executionSteps.length} steps
      </p>

      <div className="flex flex-col items-start gap-0">
        {executionSteps.map((step, index) => {
          const style = statusStyles[step.status];
          const label = statusLabel[step.status];
          const StatusIcon = style.icon;
          const dep = step.dependsOn
            ? executionSteps.find((s) => s.id === step.dependsOn)
            : null;

          return (
            <div key={step.id} className="flex flex-col items-center w-full max-w-md">
              {index > 0 && (
                <div className="flex flex-col items-center py-1">
                  <div className="w-px h-5 bg-border" />
                  <ArrowDown className="w-4 h-4 text-muted-foreground/50 -my-0.5" />
                  {dep && (
                    <span className="text-[10px] text-muted-foreground italic mt-0.5">
                      depends on: {dep.title}
                    </span>
                  )}
                  <div className="w-px h-2 bg-border" />
                </div>
              )}

              <div
                className={`w-full rounded-xl border-2 ${style.border} ${style.bg} px-5 py-4 transition-all hover:scale-[1.01] hover:shadow-md`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[15px] font-semibold text-foreground leading-tight">
                      {step.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-2 text-[13px] text-muted-foreground">
                      <User className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />
                      {step.owner ? (
                        <span>{step.owner}</span>
                      ) : (
                        <span className="text-status-missing italic flex items-center gap-1 text-xs">
                          <AlertCircle className="w-3 h-3" /> Unassigned
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <StatusIcon className={`w-4 h-4 ${label.color}`} strokeWidth={2} />
                    <span className={`text-xs font-medium ${label.color}`}>{label.text}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExecutionPlanView;
