"use client";

import { Home, Users, Camera, Activity, Settings, BrainCircuit } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: Users, label: "Students", href: "/students" },
    { icon: Camera, label: "Live Cameras", href: "/cameras" },
    { icon: BrainCircuit, label: "AI Insights", href: "/insights" },
    { icon: Activity, label: "Analytics", href: "/analytics" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <aside className="w-64 h-screen border-r border-white/10 glass-panel rounded-none flex flex-col p-4 sticky top-0">
      <div className="flex items-center gap-3 px-2 mb-10 mt-2">
        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/50">
          <BrainCircuit className="w-5 h-5 text-blue-400" />
        </div>
        <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
          Aura Intel
        </span>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item, i) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={i}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 ${
                isActive 
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" 
                  : "text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/5">
        <p className="text-xs text-zinc-400 font-medium mb-2">System Status</p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-semibold text-green-400">All Systems Operational</span>
        </div>
      </div>
    </aside>
  );
}
