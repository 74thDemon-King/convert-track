import { transcript } from "@/data/mockData";
import { MessageSquare } from "lucide-react";

interface TranscriptViewProps {
  onSelectLine?: (id: string) => void;
  highlightedLine?: string | null;
}

const TranscriptView = ({ onSelectLine, highlightedLine }: TranscriptViewProps) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Meeting Transcript</h2>
        <span className="text-xs text-muted-foreground ml-2">12 segments · 7 min 35 sec</span>
      </div>

      <div className="space-y-1">
        {transcript.map((line) => (
          <button
            key={line.id}
            onClick={() => onSelectLine?.(line.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all group
              ${highlightedLine === line.id ? "bg-ai-surface border border-ai-border" : "hover:bg-muted/50"}
              ${line.isActionable ? "ai-highlight" : ""}
            `}
          >
            <div className="flex items-center gap-3 mb-1">
              <span className="text-xs font-medium text-primary">{line.speaker}</span>
              <span className="text-[10px] text-muted-foreground font-mono">{line.timestamp}</span>
              {line.isActionable && (
                <span className="text-[9px] font-medium text-ai-text bg-ai-surface border border-ai-border px-1.5 py-0.5 rounded">
                  Actionable
                </span>
              )}
            </div>
            <p className="text-sm text-foreground/85 leading-relaxed">{line.text}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TranscriptView;
