"use client";

import { useState } from "react";
import { Sparkles, Send, Bot, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GenAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [chat, setChat] = useState<{ role: "user" | "ai"; content: string }[]>([
    { role: "ai", content: "Hello! I am Aura, your Generative AI assistant. Ask me anything about attendance trends, predictive analytics, or specific students." }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!query.trim()) return;

    setChat((prev) => [...prev, { role: "user", content: query }]);
    setQuery("");
    setIsTyping(true);

    // Simulate backend LangChain interaction
    setTimeout(() => {
      let response = "I'm analyzing the data streams right now...";
      if (query.toLowerCase().includes("risk") || query.toLowerCase().includes("dropout")) {
        response = "Based on multi-modal tracking, Student ID #4 (Diana Prince) has a 75% predictive risk of absenteeism due to repeated proxy attempts detected by gait analysis.";
      } else if (query.toLowerCase().includes("trend")) {
        response = "Campus attendance is currently at 92%, which is +2% compared to last week. The new multi-modal verification has deterred proxy attempts by 40%.";
      } else {
        response = "I have queried the PostgreSQL vector database. The attendance confidence score is averaging 96% across all active campus nodes.";
      }

      setChat((prev) => [...prev, { role: "ai", content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-[0_0_20px_rgba(79,70,229,0.5)] flex items-center justify-center hover:scale-110 transition-transform z-50 group"
      >
        <Sparkles className="w-6 h-6 text-white group-hover:animate-pulse" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] glass-panel bg-black/80 flex flex-col z-50 overflow-hidden border border-indigo-500/30"
          >
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-indigo-900/20">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-indigo-400" />
                <h3 className="font-semibold text-white">Aura AI Assistant</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
              {chat.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`p-3 rounded-2xl max-w-[85%] text-sm ${
                    msg.role === "user" 
                      ? "bg-blue-600 text-white rounded-tr-none" 
                      : "bg-white/10 text-zinc-200 rounded-tl-none"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="p-3 rounded-2xl bg-white/5 text-zinc-400 rounded-tl-none text-xs flex gap-1">
                    <span className="animate-bounce">●</span>
                    <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>●</span>
                    <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>●</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/10 bg-black/40">
              <div className="relative">
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask Aura..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-indigo-500/50"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-500 transition-colors"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
