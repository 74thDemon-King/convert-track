import { transcript } from "@/data/mockData";
import { MessageSquare } from "lucide-react";

interface TranscriptViewProps {
  onSelectLine?: (id: string) => void;
  highlightedLine?: string | null;
}

const TranscriptView = ({ onSelectLine, highlightedLine }: TranscriptViewProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-1">Transcript</h2>
      <p className="text-sm text-muted-foreground mb-8">12 segments · 7 min 35 sec</p>

      <div className="space-y-1.5">
        {transcript.map((line) => (
          <button
            key={line.id}
            onClick={() => onSelectLine?.(line.id)}
            className={`w-full text-left px-5 py-4 rounded-xl transition-all group
              ${highlightedLine === line.id ? "glass-panel-raised ring-1 ring-border" : "hover:bg-card/60"}
              ${line.isActionable ? "border-l-2 border-l-ai-border bg-ai-surface/40" : ""}
            `}
          >
            <div className="flex items-center gap-3 mb-1.5">
              <span className="text-[13px] font-semibold text-foreground">{line.speaker}</span>
              <span className="text-[11px] text-muted-foreground font-mono">{line.timestamp}</span>
              {line.isActionable && (
                <span className="text-[10px] font-medium text-ai-text bg-ai-surface border border-ai-border px-2 py-0.5 rounded-full">
                  Actionable
                </span>
              )}
            </div>
            <p className="text-[14px] text-foreground/75 leading-relaxed">{line.text}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TranscriptView;
