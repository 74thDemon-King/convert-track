import { actionItems } from "@/data/mockData";
import { FileOutput, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const ArtifactsView = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileOutput className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Generated Artifacts</h2>
          </div>
          <p className="text-xs text-muted-foreground">
            Auto-created from extracted actions · Editable
          </p>
        </div>
        <Button variant="outline" size="sm" className="text-xs gap-1.5">
          <Download className="w-3.5 h-3.5" />
          Export CSV
        </Button>
      </div>

      {/* Task Tracker Table */}
      <div className="glass-panel rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-border bg-muted/30">
          <h3 className="text-sm font-medium text-foreground">Task Tracker</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Task</th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Owner</th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Deadline</th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {actionItems.map((item) => (
                <tr key={item.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 text-foreground font-medium">{item.title}</td>
                  <td className="px-4 py-3">
                    {item.owner || <span className="text-status-missing text-xs italic">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    {item.deadline || <span className="text-status-missing text-xs italic">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border
                      ${item.status === "confirmed" ? "status-confirmed" : ""}
                      ${item.status === "needs-review" ? "status-review" : ""}
                      ${item.status === "missing-info" ? "status-missing" : ""}
                    `}>
                      {item.status === "confirmed" ? "Confirmed" : item.status === "needs-review" ? "Review" : "Missing"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs capitalize text-muted-foreground">{item.confidence}</td>
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
