import { executionSteps } from "@/data/mockData";
import { GitBranch, ArrowDown, User, AlertCircle } from "lucide-react";

const statusBorder: Record<string, string> = {
  confirmed: "border-l-status-confirmed",
  "needs-review": "border-l-status-review",
  "missing-info": "border-l-status-missing",
};

const statusDot: Record<string, string> = {
  confirmed: "bg-status-confirmed",
  "needs-review": "bg-status-review",
  "missing-info": "bg-status-missing",
};

const ExecutionPlanView = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-1">Execution Plan</h2>
      <p className="text-sm text-muted-foreground mb-8">
        Logical dependency flow · {executionSteps.length} steps
      </p>

      <div className="relative ml-4">
        <div className="absolute left-3 top-6 bottom-6 w-px bg-border" />

        <div className="space-y-0">
          {executionSteps.map((step, index) => {
            const dep = step.dependsOn
              ? executionSteps.find((s) => s.id === step.dependsOn)
              : null;

            return (
              <div key={step.id}>
                {index > 0 && (
                  <div className="flex items-center pl-1 py-2">
                    <ArrowDown className="w-3.5 h-3.5 text-muted-foreground/40" />
                    {dep && (
                      <span className="text-[10px] text-muted-foreground ml-3 italic">
                        depends on: {dep.title}
                      </span>
                    )}
                  </div>
                )}

                <div className={`relative glass-panel border-l-[3px] ${statusBorder[step.status]} p-5 ml-4`}>
                  <div className={`absolute -left-[11px] top-6 w-4 h-4 rounded-full border-[3px] border-background ${statusDot[step.status]}`} />

                  <h4 className="text-[15px] font-semibold text-foreground mb-2">{step.title}</h4>
                  <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
                    <User className="w-3.5 h-3.5" strokeWidth={1.8} />
                    {step.owner || (
                      <span className="text-status-missing italic flex items-center gap-1 text-xs">
                        <AlertCircle className="w-3 h-3" /> Unassigned
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExecutionPlanView;
