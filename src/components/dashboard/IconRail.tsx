import {
  Home,
  Globe,
  Star,
  Share2,
  LayoutGrid,
  Sparkles,
  Settings,
} from "lucide-react";

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
  return (
    <div className="w-16 min-w-[64px] bg-rail flex flex-col items-center py-5 rounded-2xl m-2 mr-0">
      {/* Logo */}
      <div className="w-9 h-9 flex items-center justify-center mb-6">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2L2 10l8 8 8-8-8-8z" stroke="hsl(var(--rail-foreground))" strokeWidth="1.5" fill="none"/>
          <path d="M6 10h8M10 6v8" stroke="hsl(var(--rail-foreground))" strokeWidth="1.5"/>
        </svg>
      </div>

      <div className="w-6 h-px bg-rail-foreground/20 mb-4" />

      {/* Nav icons */}
      <nav className="flex-1 flex flex-col items-center gap-1">
        {icons.map((item) => {
          const isActive = activeIcon === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onIconChange(item.id)}
              className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all
                ${isActive
                  ? "bg-rail-foreground/15 text-rail-active"
                  : "text-rail-foreground hover:text-rail-active hover:bg-rail-foreground/10"
                }
              `}
            >
              <item.icon className="w-[18px] h-[18px]" strokeWidth={1.8} />
            </button>
          );
        })}
      </nav>

      {/* Vertical label */}
      <div className="my-6">
        <p className="text-[8px] font-medium text-rail-foreground/40 tracking-[0.2em] uppercase"
           style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>
          MeetingOps 2025
        </p>
      </div>

      {/* Settings */}
      <button className="w-10 h-10 flex items-center justify-center rounded-xl text-rail-foreground hover:text-rail-active hover:bg-rail-foreground/10 transition-all mt-auto">
        <Settings className="w-[18px] h-[18px]" strokeWidth={1.8} />
      </button>
    </div>
  );
};

export default IconRail;
