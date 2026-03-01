import {
  Home,
  Globe,
  Star,
  Share2,
  LayoutGrid,
  Sparkles,
  Settings,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

interface IconRailProps {
  activeIcon: string;
  onIconChange: (id: string) => void;
}

const icons = [
  { id: "home", icon: Home },
  { id: "explore", icon: Globe },
  { id: "starred", icon: Star },
  { id: "shared", icon: Share2 },
  { id: "boards", icon: LayoutGrid },
  { id: "ai", icon: Sparkles },
];

const IconRail = ({ activeIcon, onIconChange }: IconRailProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-2 px-4">
      {/* Logo */}
      <div className="w-8 h-8 flex items-center justify-center shrink-0">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path d="M10 2L2 10l8 8 8-8-8-8z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <path d="M6 10h8M10 6v8" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </div>

      <div className="w-px h-5 bg-border shrink-0" />

      {/* Nav icons */}
      <nav className="flex items-center gap-1">
        {icons.map((item) => {
          const isActive = activeIcon === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onIconChange(item.id)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all
                ${isActive
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }
              `}
            >
              <item.icon className="w-4 h-4" strokeWidth={1.8} />
            </button>
          );
        })}
      </nav>

      <p className="text-[10px] font-medium text-muted-foreground/50 tracking-[0.15em] uppercase ml-2 shrink-0">
        MeetingOps 2025
      </p>

      {/* Theme toggle + Settings */}
      <button
        onClick={toggleTheme}
        title={theme === "light" ? "Dark mode" : "Light mode"}
        className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all ml-auto shrink-0"
      >
        {theme === "light" ? <Moon className="w-4 h-4" strokeWidth={1.8} /> : <Sun className="w-4 h-4" strokeWidth={1.8} />}
      </button>
      <button className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all shrink-0">
        <Settings className="w-4 h-4" strokeWidth={1.8} />
      </button>
    </div>
  );
};

export default IconRail;
