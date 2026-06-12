"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function DigitalTwin() {
  const [desks, setDesks] = useState<{ id: number; state: string }[]>([]);

  useEffect(() => {
    // Simulate 30 desks in a classroom (6x5 grid)
    const initialDesks = Array.from({ length: 30 }).map((_, i) => {
      const status = Math.random();
      let state = "empty"; // 20%
      if (status > 0.2 && status < 0.8) state = "verified"; // 60%
      else if (status >= 0.8 && status < 0.9) state = "unverified"; // 10%
      else state = "proxy_suspected"; // 10%
      
      return { id: i, state };
    });
    setDesks(initialDesks);
  }, []);

  const getStatusColor = (state: string) => {
    switch (state) {
      case "verified": return "bg-green-500/20 border-green-500/50 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]";
      case "unverified": return "bg-yellow-500/20 border-yellow-500/50 text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.3)]";
      case "proxy_suspected": return "bg-red-500/20 border-red-500/50 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)] animate-pulse";
      default: return "bg-white/5 border-white/10 text-zinc-600";
    }
  };

  return (
    <div className="glass-panel p-6 flex flex-col h-full relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex justify-between items-end mb-6 z-10">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            Classroom 4B Digital Twin
          </h2>
          <p className="text-sm text-zinc-400 mt-1">Real-time Multi-Modal Occupancy Tracking</p>
        </div>
        <div className="flex gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" /> Verified</div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]" /> Processing</div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)] animate-pulse" /> Alert</div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-6 gap-3 z-10">
        {desks.map((desk, i) => (
          <motion.div
            key={desk.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.02, duration: 0.3 }}
            className={`rounded-xl border flex items-center justify-center relative group transition-colors duration-500 ${getStatusColor(desk.state)}`}
          >
            <span className="text-xs font-bold opacity-50 group-hover:opacity-100 transition-opacity">Desk {i + 1}</span>
            {desk.state === "proxy_suspected" && (
              <AlertTriangle className="absolute top-1 right-1 w-3 h-3 text-red-500" />
            )}
            {desk.state === "verified" && (
              <CheckCircle2 className="absolute top-1 right-1 w-3 h-3 text-green-500 opacity-50" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
