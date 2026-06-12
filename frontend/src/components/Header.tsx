import { Bell, Search, User } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 border-b border-white/10 glass-panel rounded-none flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4 w-96">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search students, sessions, cameras..." 
            className="w-full bg-black/20 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-zinc-300 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-zinc-600"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
          <Bell className="w-5 h-5 text-zinc-400" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        </button>
        <div className="h-8 w-px bg-white/10 mx-2" />
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-white">Dr. Alan Turing</p>
            <p className="text-xs text-zinc-500">Principal Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-[2px]">
            <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center">
              <User className="w-5 h-5 text-zinc-300" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
