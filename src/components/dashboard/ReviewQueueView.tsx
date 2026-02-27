import { actionItems } from "@/data/mockData";
import { CheckCircle2, Edit3, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ReviewQueueView = () => {
  const reviewItems = actionItems.filter((a) => a.status !== "confirmed");

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-1">Review Queue</h2>
      <p className="text-sm text-muted-foreground mb-8">
        {reviewItems.length} items require human confirmation
      </p>

      {reviewItems.length === 0 ? (
        <div className="glass-panel p-10 text-center">
          <CheckCircle2 className="w-10 h-10 text-status-confirmed mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">All items have been reviewed.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reviewItems.map((item) => (
            <div key={item.id} className="glass-panel p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h4 className="text-[15px] font-semibold text-foreground mb-1">{item.title}</h4>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">{item.reasoning}</p>
                </div>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap
                  ${item.status === "needs-review" ? "status-review" : "status-missing"}
                `}>
                  {item.status === "needs-review" ? "Needs Review" : "Missing Info"}
                </span>
              </div>

              {item.missingFields.length > 0 && (
                <div className="flex gap-2 mb-4">
                  {item.missingFields.map((f) => (
                    <span key={f} className="text-[10px] font-semibold px-2.5 py-1 rounded-full border status-missing">
                      {f} required
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="text-xs gap-1.5 h-8 rounded-lg text-status-confirmed hover:bg-muted">
                  <CheckCircle2 className="w-3 h-3" /> Approve
                </Button>
                <Button size="sm" variant="outline" className="text-xs gap-1.5 h-8 rounded-lg">
                  <Edit3 className="w-3 h-3" /> Edit
                </Button>
                <Button size="sm" variant="outline" className="text-xs gap-1.5 h-8 rounded-lg text-status-missing hover:bg-muted">
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
