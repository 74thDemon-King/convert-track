import { actionItems } from "@/data/mockData";
import { ShieldCheck, CheckCircle2, Edit3, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ReviewQueueView = () => {
  const reviewItems = actionItems.filter((a) => a.status !== "confirmed");

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <ShieldCheck className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Review Queue</h2>
      </div>
      <p className="text-xs text-muted-foreground mb-6">
        {reviewItems.length} items require human confirmation
      </p>

      {reviewItems.length === 0 ? (
        <div className="glass-panel rounded-lg p-8 text-center">
          <CheckCircle2 className="w-8 h-8 text-status-confirmed mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">All items have been reviewed.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reviewItems.map((item) => (
            <div key={item.id} className="glass-panel rounded-lg p-4">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.reasoning}
                  </p>
                </div>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border whitespace-nowrap
                  ${item.status === "needs-review" ? "status-review" : "status-missing"}
                `}>
                  {item.status === "needs-review" ? "Needs Review" : "Missing Info"}
                </span>
              </div>

              {item.missingFields.length > 0 && (
                <div className="flex gap-1.5 mb-3">
                  {item.missingFields.map((f) => (
                    <span key={f} className="text-[10px] font-medium px-2 py-0.5 rounded-full border status-missing">
                      {f} required
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="text-xs gap-1 h-7 text-status-confirmed border-status-confirmed/30 hover:bg-status-confirmed/10">
                  <CheckCircle2 className="w-3 h-3" /> Approve
                </Button>
                <Button size="sm" variant="outline" className="text-xs gap-1 h-7">
                  <Edit3 className="w-3 h-3" /> Edit
                </Button>
                <Button size="sm" variant="outline" className="text-xs gap-1 h-7 text-status-missing border-status-missing/30 hover:bg-status-missing/10">
                  <XCircle className="w-3 h-3" /> Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewQueueView;
