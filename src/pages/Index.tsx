import { useState } from "react";
import { useUserRole } from "@/hooks/use-user-role";
import IconRail from "@/components/dashboard/IconRail";
import WorkflowSidebar from "@/components/dashboard/WorkflowSidebar";
import TranscriptView from "@/components/dashboard/TranscriptView";
import ActionsView from "@/components/dashboard/ActionsView";
import ExecutionPlanView from "@/components/dashboard/ExecutionPlanView";
import ArtifactsView from "@/components/dashboard/ArtifactsView";
import ReviewQueueView from "@/components/dashboard/ReviewQueueView";
import FileUploadView from "@/components/dashboard/FileUploadView";
import ExecutiveDashboardView from "@/components/dashboard/ExecutiveDashboardView";
import TraceabilityPanel from "@/components/dashboard/TraceabilityPanel";
import { Search } from "lucide-react";

const Index = () => {
  const { isManager } = useUserRole();
  const [activeStage, setActiveStage] = useState("actions");
  const [activeIcon, setActiveIcon] = useState("home");
  const [selectedAction, setSelectedAction] = useState<string | null>("a1");
  const [highlightedTranscriptLine, setHighlightedTranscriptLine] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const showTraceability = activeStage === "actions" || activeStage === "transcript";

  const renderMainContent = () => {
    switch (activeStage) {
      case "transcript":
        return <TranscriptView onSelectLine={setHighlightedTranscriptLine} highlightedLine={highlightedTranscriptLine} />;
      case "actions":
        return <ActionsView selectedAction={selectedAction} onSelectAction={setSelectedAction} />;
      case "executive":
        return <ExecutiveDashboardView />;
      case "execution":
        return <ExecutionPlanView />;
      case "artifacts":
        return <ArtifactsView />;
      case "review":
        return <ReviewQueueView />;
      case "upload":
        return <FileUploadView />;
      default:
        return <ActionsView selectedAction={selectedAction} onSelectAction={setSelectedAction} />;
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden p-0">
      <WorkflowSidebar
        activeStage={activeStage}
        onStageChange={setActiveStage}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 m-2 ml-1.5 rounded-2xl bg-card border border-border overflow-hidden flex flex-col transition-all duration-300">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <IconRail activeIcon={activeIcon} onIconChange={setActiveIcon} />
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.8} />
              <input
                type="text"
                placeholder="Search"
                className="h-9 w-56 pl-9 pr-4 text-[13px] bg-muted/50 rounded-xl border-none outline-none placeholder:text-muted-foreground text-foreground transition-colors duration-200"
              />
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 overflow-y-auto px-8 py-8">
              <div className="animate-in fade-in duration-300">
                {renderMainContent()}
              </div>
            </div>

            {showTraceability && (
              <aside className="w-80 min-w-[300px] border-l border-border overflow-y-auto bg-card transition-all duration-300">
                <div className="p-6">
                  <TraceabilityPanel selectedActionId={selectedAction} />
                </div>
              </aside>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
