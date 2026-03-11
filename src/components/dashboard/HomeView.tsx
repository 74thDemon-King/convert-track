import { useState } from "react";
import {
  Plus,
  Trash2,
  Settings,
  FolderOpen,
  Users,
  UserPlus,
  UserMinus,
  Calendar,
  MoreHorizontal,
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  date: string;
  actions: number;
  status: "active" | "completed" | "archived";
}

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  position: string;
}

const initialProjects: Project[] = [
  { id: "p1", name: "Q2 Planning Meeting", description: "Quarterly planning and roadmap alignment", date: "Jan 13, 2025", actions: 5, status: "active" },
  { id: "p2", name: "Sprint Retrospective", description: "Review of sprint 14 outcomes", date: "Jan 10, 2025", actions: 3, status: "active" },
  { id: "p3", name: "Onboarding Kickoff", description: "New hire onboarding process review", date: "Jan 6, 2025", actions: 7, status: "completed" },
  { id: "p4", name: "Design Review", description: "Component library and design system audit", date: "Dec 20, 2024", actions: 4, status: "archived" },
];

const initialMembers: Member[] = [
  { id: "m1", name: "Sarah Chen", email: "sarah@company.com", role: "Team Manager", position: "Engineering Lead" },
  { id: "m2", name: "Marcus Webb", email: "marcus@company.com", role: "Team Member", position: "Backend Engineer" },
  { id: "m3", name: "Priya Patel", email: "priya@company.com", role: "Team Member", position: "UI/UX Designer" },
  { id: "m4", name: "James Liu", email: "james@company.com", role: "Team Member", position: "DevOps Engineer" },
];

interface HomeViewProps {
  isManager: boolean;
}

const HomeView = ({ isManager }: HomeViewProps) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [activeTab, setActiveTab] = useState<"projects" | "members">("projects");
  const [showNewProject, setShowNewProject] = useState(false);
  const [showNewMember, setShowNewMember] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  const [newMember, setNewMember] = useState({ name: "", email: "", position: "" });

  const handleCreateProject = () => {
    if (!newProject.name.trim()) return;
    const project: Project = {
      id: `p${Date.now()}`,
      name: newProject.name,
      description: newProject.description,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      actions: 0,
      status: "active",
    };
    setProjects([project, ...projects]);
    setNewProject({ name: "", description: "" });
    setShowNewProject(false);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleAddMember = () => {
    if (!newMember.name.trim() || !newMember.email.trim()) return;
    const member: Member = {
      id: `m${Date.now()}`,
      name: newMember.name,
      email: newMember.email,
      role: "Team Member",
      position: newMember.position,
    };
    setMembers([...members, member]);
    setNewMember({ name: "", email: "", position: "" });
    setShowNewMember(false);
  };

  const handleDeleteMember = (id: string) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  const statusColor = (status: Project["status"]) => {
    switch (status) {
      case "active": return "bg-emerald-500/15 text-emerald-400";
      case "completed": return "bg-sky-500/15 text-sky-400";
      case "archived": return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Home</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {isManager ? "Manage your projects and team members" : "View your projects and team"}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 border-b border-border">
        <button
          onClick={() => setActiveTab("projects")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
            activeTab === "projects"
              ? "border-foreground text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <FolderOpen className="w-4 h-4" strokeWidth={1.8} />
          Projects
          <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{projects.length}</span>
        </button>
        <button
          onClick={() => setActiveTab("members")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
            activeTab === "members"
              ? "border-foreground text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Users className="w-4 h-4" strokeWidth={1.8} />
          Members
          <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{members.length}</span>
        </button>
      </div>

      {/* Projects Tab */}
      {activeTab === "projects" && (
        <div className="space-y-3">
          {/* Create button - manager only */}
          {isManager && (
            <div className="mb-4">
              {!showNewProject ? (
                <button
                  onClick={() => setShowNewProject(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <Plus className="w-4 h-4" />
                  New Project
                </button>
              ) : (
                <div className="p-4 rounded-xl border border-border bg-card space-y-3">
                  <input
                    type="text"
                    placeholder="Project name"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    className="w-full h-10 px-3 text-sm bg-muted/50 rounded-lg border border-border outline-none placeholder:text-muted-foreground text-foreground focus:ring-2 focus:ring-ring"
                    autoFocus
                  />
                  <input
                    type="text"
                    placeholder="Description (optional)"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="w-full h-10 px-3 text-sm bg-muted/50 rounded-lg border border-border outline-none placeholder:text-muted-foreground text-foreground focus:ring-2 focus:ring-ring"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleCreateProject}
                      className="px-4 py-2 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      Create
                    </button>
                    <button
                      onClick={() => { setShowNewProject(false); setNewProject({ name: "", description: "" }); }}
                      className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Project list */}
          {projects.map((project) => (
            <div
              key={project.id}
              className="group flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-accent/30 transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <FolderOpen className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground truncate">{project.name}</span>
                  <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${statusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{project.description}</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground flex-shrink-0">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {project.date}
                </span>
                <span className="bg-muted px-2 py-0.5 rounded-full">{project.actions} actions</span>
              </div>
              {isManager && (
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                    <Settings className="w-4 h-4" strokeWidth={1.8} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDeleteProject(project.id); }}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" strokeWidth={1.8} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Members Tab */}
      {activeTab === "members" && (
        <div className="space-y-3">
          {/* Add member button - manager only */}
          {isManager && (
            <div className="mb-4">
              {!showNewMember ? (
                <button
                  onClick={() => setShowNewMember(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <UserPlus className="w-4 h-4" />
                  Add Member
                </button>
              ) : (
                <div className="p-4 rounded-xl border border-border bg-card space-y-3">
                  <input
                    type="text"
                    placeholder="Full name"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    className="w-full h-10 px-3 text-sm bg-muted/50 rounded-lg border border-border outline-none placeholder:text-muted-foreground text-foreground focus:ring-2 focus:ring-ring"
                    autoFocus
                  />
                  <input
                    type="text"
                    placeholder="Email"
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    className="w-full h-10 px-3 text-sm bg-muted/50 rounded-lg border border-border outline-none placeholder:text-muted-foreground text-foreground focus:ring-2 focus:ring-ring"
                  />
                  <input
                    type="text"
                    placeholder="Position"
                    value={newMember.position}
                    onChange={(e) => setNewMember({ ...newMember, position: e.target.value })}
                    className="w-full h-10 px-3 text-sm bg-muted/50 rounded-lg border border-border outline-none placeholder:text-muted-foreground text-foreground focus:ring-2 focus:ring-ring"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddMember}
                      className="px-4 py-2 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => { setShowNewMember(false); setNewMember({ name: "", email: "", position: "" }); }}
                      className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Member list */}
          {members.map((member) => (
            <div
              key={member.id}
              className="group flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-accent/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-semibold text-muted-foreground">
                  {member.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">{member.name}</span>
                  <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                    member.role === "Team Manager" ? "bg-amber-500/15 text-amber-400" : "bg-sky-500/15 text-sky-400"
                  }`}>
                    {member.role}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{member.email} · {member.position}</p>
              </div>
              {isManager && member.role !== "Team Manager" && (
                <button
                  onClick={() => handleDeleteMember(member.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 flex-shrink-0"
                >
                  <UserMinus className="w-4 h-4" strokeWidth={1.8} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeView;
