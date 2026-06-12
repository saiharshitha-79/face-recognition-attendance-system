"use client";

import { Search, UserCheck, ShieldAlert, Fingerprint, Mic, Video, MoreHorizontal } from "lucide-react";

export default function StudentsPage() {
  const students = [
    { id: "S-1001", name: "Alice Smith", course: "Computer Science", face: true, voice: true, gait: true, status: "Present", risk: "Low" },
    { id: "S-1002", name: "Bob Jones", course: "Data Science", face: true, voice: false, gait: true, status: "Absent", risk: "Medium" },
    { id: "S-1003", name: "Charlie Brown", course: "Cybersecurity", face: true, voice: true, gait: true, status: "Present", risk: "Low" },
    { id: "S-1004", name: "Diana Prince", course: "AI Engineering", face: true, voice: false, gait: false, status: "Proxy Suspected", risk: "High" },
    { id: "S-1005", name: "Evan Wright", course: "Computer Science", face: false, voice: false, gait: false, status: "Not Enrolled", risk: "N/A" },
    { id: "S-1006", name: "Fiona Gallagher", course: "Data Science", face: true, voice: true, gait: false, status: "Present", risk: "Low" },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Present": return "text-green-400 bg-green-500/10 border-green-500/20";
      case "Absent": return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
      case "Proxy Suspected": return "text-red-400 bg-red-500/10 border-red-500/20";
      default: return "text-zinc-400 bg-white/5 border-white/10";
    }
  };

  const getRiskColor = (risk: string) => {
    switch(risk) {
      case "Low": return "text-green-400";
      case "Medium": return "text-yellow-400";
      case "High": return "text-red-400 font-bold animate-pulse";
      default: return "text-zinc-500";
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1 text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
            Student Intelligence
          </h1>
          <p className="text-zinc-500 text-sm">Manage student biometric enrollment and view deep attendance analytics.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Enroll New Student
        </button>
      </div>

      <div className="glass-panel overflow-hidden border border-white/10">
        <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search by name, ID, or course..." 
              className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-zinc-300 focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-zinc-600"
            />
          </div>
          <div className="flex gap-2">
             <button className="px-3 py-1.5 rounded-md border border-white/10 text-xs font-medium text-zinc-300 hover:bg-white/5 transition-colors">Filter</button>
             <button className="px-3 py-1.5 rounded-md border border-white/10 text-xs font-medium text-zinc-300 hover:bg-white/5 transition-colors">Export</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-black/20 text-zinc-400 uppercase text-xs tracking-wider border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-medium">Student Name</th>
                <th className="px-6 py-4 font-medium">ID / Course</th>
                <th className="px-6 py-4 font-medium">Biometric Enrollment</th>
                <th className="px-6 py-4 font-medium">Current Status</th>
                <th className="px-6 py-4 font-medium">Absenteeism Risk</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {students.map((student, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/10 text-blue-400 font-bold text-xs">
                        {student.name.charAt(0)}
                      </div>
                      <span className="font-medium text-white">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-zinc-300">{student.id}</span>
                      <span className="text-xs text-zinc-500">{student.course}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <div title="Face Verification" className={`w-6 h-6 rounded flex items-center justify-center ${student.face ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-zinc-600'}`}>
                        <Fingerprint className="w-3.5 h-3.5" />
                      </div>
                      <div title="Voice Biometrics" className={`w-6 h-6 rounded flex items-center justify-center ${student.voice ? 'bg-purple-500/20 text-purple-400' : 'bg-white/5 text-zinc-600'}`}>
                        <Mic className="w-3.5 h-3.5" />
                      </div>
                      <div title="Gait Analysis" className={`w-6 h-6 rounded flex items-center justify-center ${student.gait ? 'bg-indigo-500/20 text-indigo-400' : 'bg-white/5 text-zinc-600'}`}>
                        <Video className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${getStatusColor(student.status)}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-2">
                        {student.risk === "High" && <ShieldAlert className="w-4 h-4 text-red-500" />}
                        <span className={`font-medium ${getRiskColor(student.risk)}`}>{student.risk}</span>
                     </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
