"use client";

import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: 'Mon', attendance: 85, predicted: 88 },
  { name: 'Tue', attendance: 88, predicted: 87 },
  { name: 'Wed', attendance: 92, predicted: 90 },
  { name: 'Thu', attendance: 75, predicted: 85 }, // Sudden drop
  { name: 'Fri', attendance: 95, predicted: 91 },
  { name: 'Sat', attendance: 60, predicted: 55 },
];

export default function AnalyticsChart() {
  return (
    <div className="glass-panel p-6 h-full relative overflow-hidden group">
       <div className="absolute top-0 left-0 -ml-20 -mt-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/20 transition-colors duration-700" />
      
      <div className="mb-6 relative z-10">
        <h2 className="text-xl font-bold tracking-tight text-white">Campus Attendance Trends</h2>
        <p className="text-sm text-zinc-400 mt-1">Actual vs AI Predicted Absenteeism</p>
      </div>
      
      <div className="h-[250px] w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fafafa' }}
              itemStyle={{ color: '#e4e4e7' }}
            />
            <Area type="monotone" dataKey="predicted" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorPredicted)" />
            <Area type="monotone" dataKey="attendance" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorAttendance)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
