import {
  Upload,
  FileText,
  Sparkles,
  GitBranch,
  FileOutput,
  ShieldCheck,
  BarChart3,
  Bell,
  Users,
  Clock,
  Archive,
  Search,
  Plus,
  FolderOpen,
  Folder,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

interface WorkflowSidebarProps {
  activeStage: string;
  onStageChange: (stage: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  isManager: boolean;
  userName?: string;
  userEmail?: string;
}

const projectStages = [
  { id: "actions", label: "Dashboard", icon: Sparkles, count: 5 },
  { id: "executive", label: "Executive Metrics", icon: BarChart3 },
  { id: "transcript", label: "Transcript", icon: FileText },
  { id: "execution", label: "Execution Plan", icon: GitBranch },
];

const statusItems = [
  { id: "review", label: "Needs Review", icon: Bell, count: 2 },
  { id: "artifacts", label: "Artifacts", icon: FileOutput, count: 3 },
  { id: "upload", label: "Upload Files", icon: Upload },
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

const WorkflowSidebar = ({ activeStage, onStageChange, collapsed, onToggleCollapse, isManager, userName, userEmail }: WorkflowSidebarProps) => {
  const initials = userName
    ? userName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "??";
  const roleLabel = isManager ? "Team Manager" : "Team Member";

  const renderButton = (id: string, label: string, Icon: any, count?: number) => {
    const isActive = activeStage === id;
    return (
      <button
        key={id}
        onClick={() => onStageChange(id)}
        title={collapsed ? label : undefined}
        className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] transition-all duration-200
          ${isActive
            ? "bg-white/15 text-white font-medium shadow-sm"
            : "text-white/70 hover:bg-white/10 hover:translate-x-0.5"
          }
        `}
      >
        <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={1.8} />
        {!collapsed && (
          <>
            <span className="flex-1 text-left">{label}</span>
            {count !== undefined && (
              <span className="text-[10px] text-white bg-white/20 rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {count}
              </span>
            )}
          </>
        )}
      </button>
    );
  };

  return (
    <aside className={`${collapsed ? "w-16 min-w-[64px]" : "w-64 min-w-[256px]"} bg-[#2D2D2D] flex flex-col h-full rounded-2xl m-2 ml-1.5 overflow-hidden border border-white/10 transition-all duration-300`}>
      {/* Header with collapse toggle */}
      <div className="px-3 pt-4 pb-2 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-xs font-semibold text-white/70">{initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-white truncate">{userName || "User"}</span>
                <ChevronDown className="w-3 h-3 text-white/40 flex-shrink-0" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`text-[9px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded-full ${isManager ? "bg-amber-500/20 text-amber-300" : "bg-sky-500/20 text-sky-300"}`}>
                  {roleLabel}
                </span>
              </div>
            </div>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-all duration-200 text-white/40 hover:text-white flex-shrink-0"
        >
          {collapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-5">
        {/* Projects */}
        <div>
          {!collapsed && <p className="text-[10px] font-semibold text-white/30 uppercase tracking-wider px-2.5 mb-2">Projects</p>}
          <div className="space-y-0.5">
            {projectStages
              .filter((s) => isManager || ["actions", "transcript", "execution"].includes(s.id))
              .map((s) => renderButton(s.id, s.label, s.icon, s.count))}
          </div>
        </div>

        {/* Status - manager only */}
        {isManager && (
          <>
            <div className="h-px bg-white/10 mx-1" />
            <div>
              {!collapsed && <p className="text-[10px] font-semibold text-white/30 uppercase tracking-wider px-2.5 mb-2">Status</p>}
              <div className="space-y-0.5">
                {statusItems.map((s) => renderButton(s.id, s.label, s.icon, s.count))}
              </div>
            </div>
          </>
        )}

        {/* History */}
        <div>
          {!collapsed && <p className="text-[10px] font-semibold text-white/30 uppercase tracking-wider px-2.5 mb-2">History</p>}
          <div className="space-y-0.5">
            {historyItems.map((item) => (
              <button
                key={item.id}
                title={collapsed ? item.label : undefined}
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] text-white/70 hover:bg-white/10 hover:translate-x-0.5 transition-all duration-200"
              >
                <item.icon className="w-4 h-4 flex-shrink-0" strokeWidth={1.8} />
                {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Documents - hidden when collapsed */}
        {!collapsed && (
          <>
            <div className="h-px bg-white/10 mx-1" />
            <div>
              <div className="flex items-center justify-between px-2.5 mb-2">
                <p className="text-[10px] font-semibold text-white/30 uppercase tracking-wider">Documents</p>
                <button className="w-5 h-5 flex items-center justify-center rounded-md hover:bg-white/10 transition-colors duration-200">
                  <Plus className="w-3.5 h-3.5 text-white/40" />
                </button>
              </div>

              <div className="mx-1 mb-3 relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full h-8 pl-8 pr-3 text-xs bg-white/10 rounded-lg border-none outline-none placeholder:text-white/40 text-white transition-colors duration-200"
                />
              </div>

              <div className="space-y-0.5">
                {documents.map((doc) => (
                  <div key={doc.name}>
                    <button className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[13px] text-white/70 hover:bg-white/10 hover:translate-x-0.5 transition-all duration-200">
                      <FolderOpen className="w-3.5 h-3.5 text-white/40" strokeWidth={1.8} />
                      <span className="flex-1 text-left truncate">{doc.name}</span>
                      <span className="text-[10px] text-white bg-white/20 rounded-full w-5 h-5 flex items-center justify-center font-medium">
                        {doc.count}
                      </span>
                    </button>
                    {doc.children && (
                      <div className="ml-5 space-y-0.5">
                        {doc.children.map((child) => (
                          <button key={child.name} className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[12px] text-white/50 hover:bg-white/10 hover:translate-x-0.5 transition-all duration-200">
                            <Folder className="w-3 h-3" strokeWidth={1.8} />
                            <span className="flex-1 text-left truncate">{child.name}</span>
                            <span className="text-[9px] text-white bg-white/20 rounded-full w-4 h-4 flex items-center justify-center font-medium">
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
          </>
        )}
      </div>

    </aside>
  );
};

export default WorkflowSidebar;
