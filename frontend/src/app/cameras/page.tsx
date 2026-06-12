"use client";

import { Video, ShieldAlert, Wifi, Maximize2, Camera, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function CamerasPage() {
  const cameras = [
    { id: "CAM-01", location: "Main Entrance", status: "Active", bandwidth: "1.2 GB/s", threat: "None", feed: "bg-blue-900/20" },
    { id: "CAM-02", location: "Hallway B (East)", status: "Active", bandwidth: "850 MB/s", threat: "None", feed: "bg-indigo-900/20" },
    { id: "CAM-03", location: "Classroom 4B", status: "Active", bandwidth: "2.1 GB/s", threat: "Proxy Suspected", feed: "bg-red-900/20" },
    { id: "CAM-04", location: "Library Atrium", status: "Active", bandwidth: "1.1 GB/s", threat: "None", feed: "bg-blue-900/20" },
    { id: "CAM-05", location: "Cafeteria South", status: "Offline", bandwidth: "0 MB/s", threat: "N/A", feed: "bg-zinc-900/40" },
    { id: "CAM-06", location: "Lab Complex 2", status: "Active", bandwidth: "1.8 GB/s", threat: "None", feed: "bg-purple-900/20" },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1 text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 flex items-center gap-3">
            <Video className="w-8 h-8 text-blue-400" />
            Live Camera Feeds
          </h1>
          <p className="text-zinc-500 text-sm">Real-time edge processing nodes across the campus grid.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <Wifi className="w-4 h-4 text-green-400" />
            Network Status
          </button>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Add Edge Node
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {cameras.map((cam, i) => (
          <motion.div 
            key={cam.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`glass-panel border ${cam.threat === 'Proxy Suspected' ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-white/10'} overflow-hidden relative group`}
          >
            {/* Simulated Video Feed Area */}
            <div className={`h-48 w-full ${cam.feed} relative overflow-hidden flex items-center justify-center`}>
              {cam.status === "Offline" ? (
                <div className="flex flex-col items-center text-zinc-600">
                  <Camera className="w-8 h-8 mb-2 opacity-50" />
                  <span className="text-xs font-semibold uppercase tracking-widest">Feed Lost</span>
                </div>
              ) : (
                <>
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                  {/* Bounding Box Simulation */}
                  {cam.threat === 'Proxy Suspected' ? (
                     <div className="absolute w-24 h-32 border-2 border-red-500 rounded-lg animate-pulse flex items-end justify-center pb-2">
                        <span className="bg-red-500 text-white text-[10px] px-1 rounded font-bold uppercase">Anomaly</span>
                     </div>
                  ) : (
                     <div className="absolute w-24 h-32 border border-green-500/50 rounded-lg flex flex-col justify-between p-1">
                        <div className="w-2 h-2 border-t border-l border-green-500"></div>
                        <div className="w-2 h-2 border-b border-l border-green-500 self-end rotate-180"></div>
                     </div>
                  )}
                  
                  {/* Scanning line animation */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-blue-400/30 blur-sm animate-[scan_3s_ease-in-out_infinite]" />
                </>
              )}

              {/* Feed overlay UI */}
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-mono text-white/80 border border-white/10">
                {cam.id} • REC
              </div>
              <button className="absolute top-3 right-3 p-1.5 bg-black/60 backdrop-blur-md rounded border border-white/10 text-white/50 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
              {cam.status === "Active" && (
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-white/10">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-mono text-green-400">LIVE</span>
                </div>
              )}
            </div>

            {/* Camera Details */}
            <div className="p-4 bg-black/20">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-white text-sm flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                    {cam.location}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">Model: Edge Vision Pro V2</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  cam.status === 'Active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-zinc-800 text-zinc-500 border border-zinc-700'
                }`}>
                  {cam.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs border-t border-white/5 pt-3">
                <div className="flex items-center gap-4">
                  <span className="text-zinc-400 flex flex-col">
                    <span className="text-[10px] text-zinc-600 uppercase">Bandwidth</span>
                    {cam.bandwidth}
                  </span>
                  <span className="text-zinc-400 flex flex-col">
                    <span className="text-[10px] text-zinc-600 uppercase">Threat Level</span>
                    <span className={cam.threat === 'Proxy Suspected' ? 'text-red-400 font-bold' : 'text-zinc-300'}>
                      {cam.threat}
                    </span>
                  </span>
                </div>
                {cam.threat === 'Proxy Suspected' && (
                   <ShieldAlert className="w-5 h-5 text-red-500 animate-bounce" />
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(192px); opacity: 0; }
        }
      `}} />
    </div>
  );
}
