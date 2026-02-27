import { useState } from "react";
import WorkflowSidebar from "@/components/dashboard/WorkflowSidebar";
import TranscriptView from "@/components/dashboard/TranscriptView";
import ActionsView from "@/components/dashboard/ActionsView";
import ExecutionPlanView from "@/components/dashboard/ExecutionPlanView";
import ArtifactsView from "@/components/dashboard/ArtifactsView";
import ReviewQueueView from "@/components/dashboard/ReviewQueueView";
import TraceabilityPanel from "@/components/dashboard/TraceabilityPanel";

const Index = () => {
  const [activeStage, setActiveStage] = useState("actions");
  const [selectedAction, setSelectedAction] = useState<string | null>("a1");
  const [highlightedTranscriptLine, setHighlightedTranscriptLine] = useState<string | null>(null);

  const showTraceability = activeStage === "actions" || activeStage === "transcript";

  const renderMainContent = () => {
    switch (activeStage) {
      case "transcript":
        return (
          <TranscriptView
            onSelectLine={setHighlightedTranscriptLine}
            highlightedLine={highlightedTranscriptLine}
          />
        );
      case "actions":
        return (
          <ActionsView
            selectedAction={selectedAction}
            onSelectAction={setSelectedAction}
          />
        );
      case "execution":
        return <ExecutionPlanView />;
      case "artifacts":
        return <ArtifactsView />;
      case "review":
        return <ReviewQueueView />;
      default:
        return (
          <ActionsView
            selectedAction={selectedAction}
            onSelectAction={setSelectedAction}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Left Sidebar */}
      <WorkflowSidebar activeStage={activeStage} onStageChange={setActiveStage} />

      {/* Center Panel */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 max-w-4xl">
          {renderMainContent()}
        </div>
      </main>

      {/* Right Panel - Traceability */}
      {showTraceability && (
        <aside className="w-80 min-w-[320px] border-l border-border bg-card overflow-y-auto">
          <div className="p-5">
            <TraceabilityPanel selectedActionId={selectedAction} />
          </div>
        </aside>
      )}
    </div>
  );
};

export default Index;
