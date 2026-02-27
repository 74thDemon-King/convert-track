import { executionSteps } from "@/data/mockData";
import { GitBranch, ArrowDown, User, AlertCircle } from "lucide-react";

const statusStyles: Record<string, string> = {
  confirmed: "border-status-confirmed bg-status-confirmed/5",
  "needs-review": "border-status-review bg-status-review/5",
  "missing-info": "border-status-missing bg-status-missing/5",
};

const statusDot: Record<string, string> = {
  confirmed: "bg-status-confirmed",
  "needs-review": "bg-status-review",
  "missing-info": "bg-status-missing",
};

const ExecutionPlanView = () => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <GitBranch className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Execution Plan</h2>
      </div>
      <p className="text-xs text-muted-foreground mb-6">
        Logical dependency flow · {executionSteps.length} steps
      </p>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-5 top-4 bottom-4 w-px bg-border" />

        <div className="space-y-0">
          {executionSteps.map((step, index) => {
            const dep = step.dependsOn
              ? executionSteps.find((s) => s.id === step.dependsOn)
              : null;

            return (
              <div key={step.id}>
                {/* Connector arrow */}
                {index > 0 && (
                  <div className="flex items-center pl-[17px] py-1.5">
                    <ArrowDown className="w-3.5 h-3.5 text-muted-foreground/50" />
                    {dep && (
                      <span className="text-[9px] text-muted-foreground ml-2 italic">
                        depends on: {dep.title}
                      </span>
                    )}
                  </div>
                )}

                {/* Step */}
                <div className={`relative flex items-start gap-4 p-4 rounded-lg border-l-2 ml-2 ${statusStyles[step.status]}`}>
                  {/* Dot on timeline */}
                  <div className={`absolute -left-[9px] top-5 w-3.5 h-3.5 rounded-full border-2 border-background ${statusDot[step.status]}`} />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground">{step.title}</h4>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {step.owner || (
                          <span className="text-status-missing italic flex items-center gap-0.5">
                            <AlertCircle className="w-3 h-3" /> Unassigned
                          </span>
                        )}
                      </span>
                    </div>
                  </div>

                  <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${statusDot[step.status]}`} />
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
