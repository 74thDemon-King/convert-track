import { TrendingUp, TrendingDown, DollarSign, Brain, Zap, PiggyBank, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, RadialBarChart, RadialBar, PieChart, Pie, Cell } from "recharts";

const productivityData = [
  { month: "Jul", before: 62, after: 71 },
  { month: "Aug", before: 64, after: 74 },
  { month: "Sep", before: 63, after: 78 },
  { month: "Oct", before: 65, after: 82 },
  { month: "Nov", before: 66, after: 85 },
  { month: "Dec", before: 67, after: 89 },
  { month: "Jan", before: 68, after: 91 },
  { month: "Feb", before: 67, after: 94 },
];

const revenueData = [
  { quarter: "Q1 '25", revenue: 2.4, growth: 8 },
  { quarter: "Q2 '25", revenue: 2.7, growth: 12.5 },
  { quarter: "Q3 '25", revenue: 3.1, growth: 14.8 },
  { quarter: "Q4 '25", revenue: 3.5, growth: 12.9 },
  { quarter: "Q1 '26", revenue: 4.1, growth: 17.1 },
];

const adoptionData = [
  { dept: "Engineering", rate: 92 },
  { dept: "Product", rate: 87 },
  { dept: "Marketing", rate: 74 },
  { dept: "Sales", rate: 68 },
  { dept: "HR", rate: 55 },
  { dept: "Finance", rate: 48 },
];

const costData = [
  { month: "Sep", manual: 48, automated: 31 },
  { month: "Oct", manual: 47, automated: 28 },
  { month: "Nov", manual: 46, automated: 25 },
  { month: "Dec", manual: 45, automated: 22 },
  { month: "Jan", manual: 44, automated: 19 },
  { month: "Feb", manual: 43, automated: 17 },
];

const MetricCard = ({
  title,
  value,
  change,
  changeLabel,
  positive,
  icon: Icon,
  accent,
}: {
  title: string;
  value: string;
  change: string;
  changeLabel: string;
  positive: boolean;
  icon: any;
  accent: string;
}) => (
  <Card className="border-border/60 bg-card hover:shadow-md transition-shadow duration-300">
    <CardContent className="p-5">
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `hsl(${accent} / 0.12)` }}
        >
          <Icon className="w-5 h-5" style={{ color: `hsl(${accent})` }} strokeWidth={1.8} />
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${positive ? "bg-[hsl(152_35%_48%/0.1)] text-[hsl(152,35%,48%)]" : "bg-[hsl(0_50%_55%/0.1)] text-[hsl(0,50%,55%)]"}`}>
          {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {change}
        </div>
      </div>
      <p className="text-2xl font-bold text-foreground tracking-tight">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{changeLabel}</p>
      <p className="text-[11px] text-muted-foreground/70 mt-0.5">{title}</p>
    </CardContent>
  </Card>
);

const chartConfig = {
  before: { label: "Before AI", color: "hsl(var(--muted-foreground))" },
  after: { label: "After AI", color: "hsl(var(--status-confirmed))" },
  revenue: { label: "Revenue", color: "hsl(var(--status-confirmed))" },
  growth: { label: "Growth %", color: "hsl(var(--status-review))" },
  rate: { label: "Adoption Rate", color: "hsl(var(--status-confirmed))" },
  manual: { label: "Manual Cost", color: "hsl(var(--status-missing))" },
  automated: { label: "Automated Cost", color: "hsl(var(--status-confirmed))" },
};

const ExecutiveDashboardView = () => {
  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-xl font-semibold text-foreground tracking-tight">Executive Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Key performance metrics and AI impact analysis</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Productivity Improvement"
          value="+38.2%"
          change="+4.1%"
          changeLabel="vs. last month"
          positive
          icon={Zap}
          accent="152 35% 48%"
        />
        <MetricCard
          title="Revenue Growth Impact"
          value="$4.1M"
          change="+17.1%"
          changeLabel="Q1 '26 vs Q4 '25"
          positive
          icon={DollarSign}
          accent="38 60% 52%"
        />
        <MetricCard
          title="AI Adoption Rate"
          value="70.7%"
          change="+8.3%"
          changeLabel="org-wide avg"
          positive
          icon={Brain}
          accent="220 60% 55%"
        />
        <MetricCard
          title="Cost Reduction"
          value="$1.2M"
          change="-26%"
          changeLabel="operational savings"
          positive
          icon={PiggyBank}
          accent="170 20% 40%"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Productivity Chart */}
        <Card className="border-border/60 bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Productivity Improvement Delta</CardTitle>
            <p className="text-xs text-muted-foreground">Before vs. after AI implementation (score index)</p>
          </CardHeader>
          <CardContent className="pt-0">
            <ChartContainer config={chartConfig} className="h-[220px] w-full">
              <AreaChart data={productivityData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradAfter" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(152, 35%, 48%)" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="hsl(152, 35%, 48%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} domain={[50, 100]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="before" stroke="hsl(var(--muted-foreground))" strokeWidth={1.5} fill="transparent" strokeDasharray="4 4" dot={false} />
                <Area type="monotone" dataKey="after" stroke="hsl(152, 35%, 48%)" strokeWidth={2} fill="url(#gradAfter)" dot={false} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card className="border-border/60 bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Revenue Growth Impact</CardTitle>
            <p className="text-xs text-muted-foreground">Quarterly revenue with AI-attributed growth</p>
          </CardHeader>
          <CardContent className="pt-0">
            <ChartContainer config={chartConfig} className="h-[220px] w-full">
              <BarChart data={revenueData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="quarter" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="hsl(var(--status-confirmed))" radius={[6, 6, 0, 0]} barSize={36} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* AI Adoption Chart */}
        <Card className="border-border/60 bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">AI Adoption & Utilization Rate</CardTitle>
            <p className="text-xs text-muted-foreground">Adoption by department (%)</p>
          </CardHeader>
          <CardContent className="pt-0">
            <ChartContainer config={chartConfig} className="h-[220px] w-full">
              <BarChart data={adoptionData} layout="vertical" margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <YAxis dataKey="dept" type="category" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={80} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="rate" radius={[0, 6, 6, 0]} barSize={18}>
                  {adoptionData.map((entry, index) => (
                    <Cell
                      key={entry.dept}
                      fill={entry.rate >= 80 ? "hsl(152, 35%, 48%)" : entry.rate >= 60 ? "hsl(38, 60%, 52%)" : "hsl(var(--muted-foreground))"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Cost Reduction Chart */}
        <Card className="border-border/60 bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Cost Reduction via Efficiency</CardTitle>
            <p className="text-xs text-muted-foreground">Manual vs. automated operational cost ($K)</p>
          </CardHeader>
          <CardContent className="pt-0">
            <ChartContainer config={chartConfig} className="h-[220px] w-full">
              <LineChart data={costData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="manual" stroke="hsl(0, 50%, 55%)" strokeWidth={2} dot={{ r: 3, fill: "hsl(0, 50%, 55%)" }} />
                <Line type="monotone" dataKey="automated" stroke="hsl(152, 35%, 48%)" strokeWidth={2} dot={{ r: 3, fill: "hsl(152, 35%, 48%)" }} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExecutiveDashboardView;
