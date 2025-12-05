import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flag, Clock, Trophy, AlertTriangle, CheckCircle, ChevronDown } from "lucide-react";

const rulesData = [
  {
    id: "qualifying",
    title: "Qualifying Format (Saturday)",
    icon: <Clock className="text-blue-400" />,
    content: (
      <div className="space-y-4">
        <p className="text-gray-300 mb-4 text-sm md:text-base">
          Qualifying determines the starting order. A knockout session split into three parts.
        </p>
        
        {/* Q1 Visualization */}
        <div className="bg-zinc-900 p-3 md:p-4 rounded-lg border border-zinc-800 flex items-center justify-between">
            <div>
                <span className="text-lg md:text-xl font-bold text-white">Q1</span>
                <span className="text-xs text-gray-500 block">18 Minutes</span>
            </div>
            <div className="text-right">
                <div className="text-white font-bold text-sm md:text-base">20 Cars</div>
                <div className="text-red-500 text-xs">Drop P16-P20</div>
            </div>
        </div>
        <div className="flex justify-center"><ChevronDown size={16} className="text-gray-600" /></div>

        {/* Q2 Visualization */}
        <div className="bg-zinc-900 p-3 md:p-4 rounded-lg border border-zinc-800 flex items-center justify-between">
            <div>
                <span className="text-lg md:text-xl font-bold text-white">Q2</span>
                <span className="text-xs text-gray-500 block">15 Minutes</span>
            </div>
            <div className="text-right">
                <div className="text-white font-bold text-sm md:text-base">15 Cars</div>
                <div className="text-red-500 text-xs">Drop P11-P15</div>
            </div>
        </div>
        <div className="flex justify-center"><ChevronDown size={16} className="text-gray-600" /></div>

        {/* Q3 Visualization */}
        <div className="bg-zinc-800 p-3 md:p-4 rounded-lg border-l-4 border-red-600 flex items-center justify-between">
            <div>
                <span className="text-lg md:text-xl font-bold text-white">Q3</span>
                <span className="text-xs text-gray-500 block">12 Minutes</span>
            </div>
            <div className="text-right">
                <div className="text-white font-bold text-sm md:text-base">Top 10</div>
                <div className="text-green-500 text-xs">Pole Position</div>
            </div>
        </div>
      </div>
    )
  },
  {
    id: "flags",
    title: "Flags & Signals",
    icon: <Flag className="text-yellow-400" />,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Flag Items - simplified repetition for brevity in chat, use full list in code */}
        {[
            {color: "bg-yellow-400", title: "Yellow Flag", desc: "Hazard ahead. Slow down."},
            {color: "bg-green-500", title: "Green Flag", desc: "Clear track. Racing resumes."},
            {color: "bg-red-600", title: "Red Flag", desc: "Session stopped. Return to pits."},
            {color: "bg-blue-500", title: "Blue Flag", desc: "Let faster car pass."},
        ].map((flag, i) => (
             <div key={i} className="flex items-start gap-3 bg-zinc-900 p-3 rounded-lg border border-zinc-800">
                <div className={`w-4 h-4 mt-1 rounded-sm flex-shrink-0 ${flag.color} shadow-[0_0_10px_currentColor]`}></div>
                <div>
                    <h4 className="font-bold text-white text-sm">{flag.title}</h4>
                    <p className="text-xs text-gray-400">{flag.desc}</p>
                </div>
            </div>
        ))}
      </div>
    )
  },
  {
    id: "points",
    title: "Points System",
    icon: <Trophy className="text-yellow-500" />,
    content: (
        <div className="overflow-hidden rounded-lg border border-zinc-800">
            {/* WRAPPED TABLE IN OVERFLOW-X-AUTO */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-400 min-w-[300px]">
                    <thead className="text-xs text-gray-200 uppercase bg-zinc-800">
                        <tr>
                            <th className="px-4 py-2">Position</th>
                            <th className="px-4 py-2">Points</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800 bg-zinc-900">
                        <tr className="bg-yellow-900/10 text-yellow-500 font-bold">
                            <td className="px-4 py-2">1st (Winner)</td>
                            <td className="px-4 py-2">25 Pts</td>
                        </tr>
                        <tr><td className="px-4 py-2">2nd</td><td className="px-4 py-2">18 Pts</td></tr>
                        <tr><td className="px-4 py-2">3rd</td><td className="px-4 py-2">15 Pts</td></tr>
                        <tr><td className="px-4 py-2">4th - 10th</td><td className="px-4 py-2">12, 10, 8, 6, 4, 2, 1</td></tr>
                    </tbody>
                </table>
            </div>
            <div className="p-3 bg-zinc-800/50 text-xs text-gray-300 flex items-center gap-2">
                <CheckCircle size={14} className="text-purple-400 shrink-0" />
                <span>+1 Point for Fastest Lap (Top 10)</span>
            </div>
        </div>
    )
  },
  {
    id: "penalties",
    title: "Penalties",
    icon: <AlertTriangle className="text-red-500" />,
    content: (
        <ul className="space-y-3">
            <li className="bg-zinc-900 p-3 rounded-lg border-l-2 border-orange-500">
                <span className="text-white font-bold block text-sm">5s / 10s Time Penalty</span>
                <span className="text-xs text-gray-400">Added to race time. Minor incidents.</span>
            </li>
            <li className="bg-zinc-900 p-3 rounded-lg border-l-2 border-red-500">
                <span className="text-white font-bold block text-sm">Drive-Through</span>
                <span className="text-xs text-gray-400">Enter pits, drive through, exit. No stop allowed.</span>
            </li>
        </ul>
    )
  }
];

export default function F1Rules() {
  const [openIndex, setOpenIndex] = useState(0); 

  return (
    <section className="w-full bg-zinc-950 text-white py-12 md:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                Rules <span className="text-red-600">Explained</span>
            </h2>
            <p className="text-gray-400">The essential regulation handbook, simplified.</p>
        </div>

        <div className="flex flex-col gap-4">
            {rulesData.map((rule, index) => (
                <div key={rule.id} className="rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-lg">
                    <button
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full flex items-center justify-between p-4 md:p-6 text-left focus:outline-none transition-colors hover:bg-zinc-800"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-2 md:p-3 bg-zinc-950 rounded-xl border border-zinc-700">
                                {rule.icon}
                            </div>
                            <span className="text-lg md:text-xl font-bold uppercase tracking-wide">{rule.title}</span>
                        </div>
                        <motion.div
                            animate={{ rotate: openIndex === index ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronDown className="text-gray-500" />
                        </motion.div>
                    </button>

                    <AnimatePresence>
                        {openIndex === index && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="p-4 md:p-6 pt-0 border-t border-zinc-800 bg-zinc-900/50">
                                    <div className="pt-4">
                                        {rule.content}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}