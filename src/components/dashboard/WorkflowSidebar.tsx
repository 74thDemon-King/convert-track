import {
  Upload,
  FileText,
  Sparkles,
  GitBranch,
  FileOutput,
  ShieldCheck,
  Bell,
  Users,
  Clock,
  Archive,
  Search,
  Plus,
  FolderOpen,
  Folder,
  ChevronDown,
} from "lucide-react";

interface WorkflowSidebarProps {
  activeStage: string;
  onStageChange: (stage: string) => void;
}

const projectStages = [
  { id: "actions", label: "Dashboard", icon: Sparkles, count: 5 },
  { id: "transcript", label: "Transcript", icon: FileText },
  { id: "execution", label: "Execution Plan", icon: GitBranch },
];

const statusItems = [
  { id: "review", label: "Needs Review", icon: Bell, count: 2 },
  { id: "artifacts", label: "Artifacts", icon: FileOutput, count: 3 },
  { id: "upload", label: "Team Review", icon: Users },
];

const historyItems = [
  { id: "recent", label: "Recently Edited", icon: Clock },
  { id: "archive", label: "Archive", icon: Archive },
];

const documents = [
  { name: "Q2 Planning", count: 5, children: [
    { name: "Sprint Review", count: 2 },
    { name: "Roadmap Sync", count: 3 },
  ]},
  { name: "Onboarding", count: 4 },
  { name: "Retrospectives", count: 3 },
];

const WorkflowSidebar = ({ activeStage, onStageChange }: WorkflowSidebarProps) => {
  return (
    <aside className="w-64 min-w-[256px] bg-sidebar flex flex-col h-full rounded-2xl m-2 ml-1.5 overflow-hidden border border-sidebar-border">
      {/* User profile */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            <span className="text-xs font-semibold text-muted-foreground">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-sidebar-primary truncate">John Doe</span>
              <ChevronDown className="w-3 h-3 text-sidebar-muted flex-shrink-0" />
            </div>
            <p className="text-[11px] text-sidebar-muted truncate">john@meetingops.io</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-5">
        {/* Projects */}
        <div>
          <p className="text-[10px] font-semibold text-sidebar-muted uppercase tracking-wider px-2.5 mb-2">Projects</p>
          <div className="space-y-0.5">
            {projectStages.map((stage) => {
              const isActive = activeStage === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => onStageChange(stage.id)}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] transition-all
                    ${isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                    }
                  `}
                >
                  <stage.icon className="w-4 h-4 flex-shrink-0" strokeWidth={1.8} />
                  <span className="flex-1 text-left">{stage.label}</span>
                  {stage.count !== undefined && (
                    <span className="text-[10px] text-badge-foreground bg-badge rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {stage.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-sidebar-border mx-1" />

        {/* Status */}
        <div>
          <p className="text-[10px] font-semibold text-sidebar-muted uppercase tracking-wider px-2.5 mb-2">Status</p>
          <div className="space-y-0.5">
            {statusItems.map((item) => {
              const isActive = activeStage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onStageChange(item.id)}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] transition-all
                    ${isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                    }
                  `}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" strokeWidth={1.8} />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.count !== undefined && (
                    <span className="text-[10px] text-badge-foreground bg-badge rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-sidebar-border mx-1" />

        {/* History */}
        <div>
          <p className="text-[10px] font-semibold text-sidebar-muted uppercase tracking-wider px-2.5 mb-2">History</p>
          <div className="space-y-0.5">
            {historyItems.map((item) => (
              <button
                key={item.id}
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all"
              >
                <item.icon className="w-4 h-4 flex-shrink-0" strokeWidth={1.8} />
                <span className="flex-1 text-left">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-sidebar-border mx-1" />

        {/* Documents */}
        <div>
          <div className="flex items-center justify-between px-2.5 mb-2">
            <p className="text-[10px] font-semibold text-sidebar-muted uppercase tracking-wider">Documents</p>
            <button className="w-5 h-5 flex items-center justify-center rounded-md hover:bg-sidebar-accent transition-colors">
              <Plus className="w-3.5 h-3.5 text-sidebar-muted" />
            </button>
          </div>

          {/* Search */}
          <div className="mx-1 mb-3 relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-sidebar-muted" />
            <input
              type="text"
              placeholder="Search"
              className="w-full h-8 pl-8 pr-3 text-xs bg-sidebar-accent rounded-lg border-none outline-none placeholder:text-sidebar-muted text-sidebar-foreground"
            />
          </div>

          {/* Doc tree */}
          <div className="space-y-0.5">
            {documents.map((doc) => (
              <div key={doc.name}>
                <button className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[13px] text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all">
                  <FolderOpen className="w-3.5 h-3.5 text-sidebar-muted" strokeWidth={1.8} />
                  <span className="flex-1 text-left truncate">{doc.name}</span>
                  <span className="text-[10px] text-badge-foreground bg-badge rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {doc.count}
                  </span>
                </button>
                {doc.children && (
                  <div className="ml-5 space-y-0.5">
                    {doc.children.map((child) => (
                      <button key={child.name} className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[12px] text-sidebar-muted hover:bg-sidebar-accent/50 transition-all">
                        <Folder className="w-3 h-3" strokeWidth={1.8} />
                        <span className="flex-1 text-left truncate">{child.name}</span>
                        <span className="text-[9px] text-badge-foreground bg-badge rounded-full w-4 h-4 flex items-center justify-center font-medium">
                          {child.count}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default WorkflowSidebar;
