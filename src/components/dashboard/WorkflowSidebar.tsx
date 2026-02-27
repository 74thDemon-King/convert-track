import {
  Upload,
  FileText,
  Sparkles,
  ListChecks,
  GitBranch,
  FileOutput,
  ShieldCheck,
} from "lucide-react";

interface WorkflowSidebarProps {
  activeStage: string;
  onStageChange: (stage: string) => void;
}

const stages = [
  { id: "upload", label: "Upload Meeting", icon: Upload, disabled: true },
  { id: "transcript", label: "Transcript View", icon: FileText },
  { id: "actions", label: "Extracted Actions", icon: Sparkles },
  { id: "execution", label: "Execution Plan", icon: GitBranch },
  { id: "artifacts", label: "Generated Artifacts", icon: FileOutput },
  { id: "review", label: "Review Queue", icon: ShieldCheck },
];

const WorkflowSidebar = ({ activeStage, onStageChange }: WorkflowSidebarProps) => {
  return (
    <aside className="w-60 min-w-[240px] bg-sidebar text-sidebar-foreground flex flex-col h-screen border-r border-sidebar-border">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <ListChecks className="w-4 h-4 text-accent-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-sidebar-primary">MeetingOps</h1>
            <p className="text-[10px] text-sidebar-muted tracking-wide uppercase">Decision → Action</p>
          </div>
        </div>
      </div>

      {/* Stages */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="text-[10px] font-medium text-sidebar-muted uppercase tracking-wider px-3 mb-3">
          Workflow Stages
        </p>
        {stages.map((stage, index) => {
          const isActive = activeStage === stage.id;
          return (
            <button
              key={stage.id}
              onClick={() => !stage.disabled && onStageChange(stage.id)}
              disabled={stage.disabled}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors group
                ${isActive 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent/60"
                }
                ${stage.disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              <span className="flex items-center justify-center w-6 h-6">
                <stage.icon className="w-4 h-4" />
              </span>
              <span>{stage.label}</span>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-sidebar-border">
        <p className="text-[10px] text-sidebar-muted">
          Q2 Planning Meeting
        </p>
        <p className="text-[10px] text-sidebar-muted mt-0.5">
          Jan 14, 2025 · 12 min
        </p>
      </div>
    </aside>
  );
};

export default WorkflowSidebar;
