import DigitalTwin from "@/components/DigitalTwin";
import AnalyticsChart from "@/components/AnalyticsChart";
import { ShieldAlert, TrendingUp, UserCheck, Clock } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-8 space-y-8">
      {/* Header Title */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1 text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
          Platform Overview
        </h1>
        <p className="text-zinc-500 text-sm">Real-time attendance intelligence across all campus nodes.</p>
      </div>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Verified Today" 
          value="4,289" 
          trend="+12%" 
          icon={UserCheck} 
          color="text-green-400" 
          bg="bg-green-500/10" 
        />
        <MetricCard 
          title="Avg. Verification Time" 
          value="1.2s" 
          trend="-0.3s" 
          icon={Clock} 
          color="text-blue-400" 
          bg="bg-blue-500/10" 
        />
        <MetricCard 
          title="Proxy Attempts Blocked" 
          value="18" 
          trend="+3" 
          icon={ShieldAlert} 
          color="text-red-400" 
          bg="bg-red-500/10" 
        />
        <MetricCard 
          title="Campus Engagement" 
          value="92%" 
          trend="+2%" 
          icon={TrendingUp} 
          color="text-purple-400" 
          bg="bg-purple-500/10" 
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[400px]">
        <div className="lg:col-span-2 h-full">
          <AnalyticsChart />
        </div>
        <div className="h-full">
          <DigitalTwin />
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, icon: Icon, color, bg }: any) {
  return (
    <div className="glass-panel p-5 relative overflow-hidden group hover:border-white/20 transition-all duration-300">
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${bg} blur-2xl group-hover:scale-150 transition-transform duration-700`} />
      <div className="flex justify-between items-start mb-4 relative z-10">
        <p className="text-sm font-medium text-zinc-400">{title}</p>
        <div className={`p-2 rounded-lg ${bg}`}>
          <Icon className={`w-4 h-4 ${color}`} />
        </div>
      </div>
      <div className="relative z-10 flex items-end gap-3">
        <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
        <span className={`text-xs font-medium mb-1 ${trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
          {trend} from yesterday
        </span>
      </div>
    </div>
  );
}
