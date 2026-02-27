import { actionItems } from "@/data/mockData";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const ArtifactsView = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold text-foreground">Generated Artifacts</h2>
        <Button variant="outline" size="sm" className="text-xs gap-1.5 rounded-xl">
          <Download className="w-3.5 h-3.5" />
          Export CSV
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mb-8">
        Auto-created from extracted actions · Editable
      </p>

      <div className="glass-panel-raised overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border">
          <h3 className="text-[15px] font-semibold text-foreground">Task Tracker</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Task</th>
                <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Owner</th>
                <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Deadline</th>
                <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {actionItems.map((item) => (
                <tr key={item.id} className="border-b border-border/50 hover:bg-panel-hover transition-colors">
                  <td className="px-5 py-3.5 font-medium text-foreground">{item.title}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    {item.owner || <span className="text-status-missing text-xs italic">—</span>}
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    {item.deadline || <span className="text-status-missing text-xs italic">—</span>}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border
                      ${item.status === "confirmed" ? "status-confirmed" : ""}
                      ${item.status === "needs-review" ? "status-review" : ""}
                      ${item.status === "missing-info" ? "status-missing" : ""}
                    `}>
                      {item.status === "confirmed" ? "Confirmed" : item.status === "needs-review" ? "Review" : "Missing"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ArtifactsView;
