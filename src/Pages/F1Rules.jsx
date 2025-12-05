import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flag, Clock, Trophy, AlertTriangle, CheckCircle, Car, ChevronDown } from "lucide-react";

const rulesData = [
  {
    id: "qualifying",
    title: "Qualifying Format (Saturday)",
    icon: <Clock className="text-blue-400" />,
    content: (
      <div className="space-y-4">
        <p className="text-gray-300 mb-4">
          Qualifying determines the starting order for the race. It is a knockout session split into three parts.
        </p>
        
        {/* Q1 Visualization */}
        <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 flex items-center justify-between">
            <div>
                <span className="text-xl font-bold text-white">Q1</span>
                <span className="text-xs text-gray-500 block">18 Minutes</span>
            </div>
            <div className="text-right">
                <div className="text-white font-bold">20 Drivers Start</div>
                <div className="text-red-500 text-xs">Bottom 5 Eliminated (P16-P20)</div>
            </div>
        </div>
        <div className="flex justify-center"><ChevronDown size={16} className="text-gray-600" /></div>

        {/* Q2 Visualization */}
        <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 flex items-center justify-between">
            <div>
                <span className="text-xl font-bold text-white">Q2</span>
                <span className="text-xs text-gray-500 block">15 Minutes</span>
            </div>
            <div className="text-right">
                <div className="text-white font-bold">15 Drivers Left</div>
                <div className="text-red-500 text-xs">Bottom 5 Eliminated (P11-P15)</div>
            </div>
        </div>
        <div className="flex justify-center"><ChevronDown size={16} className="text-gray-600" /></div>

        {/* Q3 Visualization */}
        <div className="bg-zinc-800 p-4 rounded-lg border-l-4 border-red-600 flex items-center justify-between">
            <div>
                <span className="text-xl font-bold text-white">Q3</span>
                <span className="text-xs text-gray-500 block">12 Minutes</span>
            </div>
            <div className="text-right">
                <div className="text-white font-bold">Top 10 Shootout</div>
                <div className="text-green-500 text-xs">Winner takes Pole Position</div>
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
        <div className="flex items-start gap-3 bg-zinc-900 p-3 rounded-lg border border-zinc-800">
            <div className="w-4 h-4 mt-1 bg-yellow-400 rounded-sm shadow-[0_0_10px_rgba(250,204,21,0.5)] flex-shrink-0"></div>
            <div>
                <h4 className="font-bold text-white text-sm">Yellow Flag</h4>
                <p className="text-xs text-gray-400">Hazard ahead. Slow down, no overtaking.</p>
            </div>
        </div>
        <div className="flex items-start gap-3 bg-zinc-900 p-3 rounded-lg border border-zinc-800">
            <div className="w-4 h-4 mt-1 bg-green-500 rounded-sm shadow-[0_0_10px_rgba(34,197,94,0.5)] flex-shrink-0"></div>
            <div>
                <h4 className="font-bold text-white text-sm">Green Flag</h4>
                <p className="text-xs text-gray-400">Clear track. Racing resumes.</p>
            </div>
        </div>
        <div className="flex items-start gap-3 bg-zinc-900 p-3 rounded-lg border border-zinc-800">
            <div className="w-4 h-4 mt-1 bg-red-600 rounded-sm shadow-[0_0_10px_rgba(220,38,38,0.5)] flex-shrink-0"></div>
            <div>
                <h4 className="font-bold text-white text-sm">Red Flag</h4>
                <p className="text-xs text-gray-400">Session stopped immediately. Return to pits.</p>
            </div>
        </div>
        <div className="flex items-start gap-3 bg-zinc-900 p-3 rounded-lg border border-zinc-800">
            <div className="w-4 h-4 mt-1 bg-blue-500 rounded-sm shadow-[0_0_10px_rgba(59,130,246,0.5)] flex-shrink-0"></div>
            <div>
                <h4 className="font-bold text-white text-sm">Blue Flag</h4>
                <p className="text-xs text-gray-400">Faster car approaching. Let them pass.</p>
            </div>
        </div>
        <div className="flex items-start gap-3 bg-zinc-900 p-3 rounded-lg border border-zinc-800">
            <div className="w-4 h-4 mt-1 bg-black border border-white/20 rounded-sm flex-shrink-0"></div>
            <div>
                <h4 className="font-bold text-white text-sm">Black Flag</h4>
                <p className="text-xs text-gray-400">Disqualification. Return to garage immediately.</p>
            </div>
        </div>
        <div className="flex items-start gap-3 bg-zinc-900 p-3 rounded-lg border border-zinc-800">
            <div className="w-8 h-4 mt-1 bg-white text-black text-[10px] font-bold flex items-center justify-center rounded-sm">SC</div>
            <div>
                <h4 className="font-bold text-white text-sm">Safety Car (SC)</h4>
                <p className="text-xs text-gray-400">Hold position, follow the Safety Car, reduced speed.</p>
            </div>
        </div>
      </div>
    )
  },
  {
    id: "points",
    title: "Points System",
    icon: <Trophy className="text-yellow-500" />,
    content: (
        <div className="overflow-hidden rounded-lg border border-zinc-800">
            <table className="w-full text-sm text-left text-gray-400">
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
                    <tr><td className="px-4 py-2">4th</td><td className="px-4 py-2">12 Pts</td></tr>
                    <tr><td className="px-4 py-2">5th</td><td className="px-4 py-2">10 Pts</td></tr>
                    <tr><td className="px-4 py-2">6th - 10th</td><td className="px-4 py-2">8, 6, 4, 2, 1</td></tr>
                </tbody>
            </table>
            <div className="p-3 bg-zinc-800/50 text-xs text-gray-300 flex items-center gap-2">
                <CheckCircle size={14} className="text-purple-400" />
                <span>+1 Bonus Point for Fastest Lap (if in Top 10)</span>
            </div>
        </div>
    )
  },
  {
    id: "penalties",
    title: "Penalties & Offences",
    icon: <AlertTriangle className="text-red-500" />,
    content: (
        <ul className="space-y-3">
            <li className="bg-zinc-900 p-3 rounded-lg border-l-2 border-orange-500">
                <span className="text-white font-bold block text-sm">5 or 10 Second Penalty</span>
                <span className="text-xs text-gray-400">Added to total race time. Usually for causing a minor collision or track limits.</span>
            </li>
            <li className="bg-zinc-900 p-3 rounded-lg border-l-2 border-red-500">
                <span className="text-white font-bold block text-sm">Drive-Through</span>
                <span className="text-xs text-gray-400">Drive through the pit lane without stopping. Costs ~20 seconds.</span>
            </li>
            <li className="bg-zinc-900 p-3 rounded-lg border-l-2 border-zinc-500">
                <span className="text-white font-bold block text-sm">Grid Penalty</span>
                <span className="text-xs text-gray-400">Start lower than you qualified. Applied for changing engine parts over the limit.</span>
            </li>
        </ul>
    )
  }
];

export default function F1Rules() {
  // Use state to track which index is open. null means all closed.
  const [openIndex, setOpenIndex] = useState(0); 

  return (
    <section className="w-full bg-zinc-950 text-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                Rules <span className="text-red-600">Explained</span>
            </h2>
            <p className="text-gray-400">The essential regulation handbook, simplified.</p>
        </div>

        {/* Accordion Container */}
        <div className="flex flex-col gap-4">
            {rulesData.map((rule, index) => (
                <div key={rule.id} className="rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-lg">
                    
                    {/* Clickable Header */}
                    <button
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full flex items-center justify-between p-6 text-left focus:outline-none transition-colors hover:bg-zinc-800"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-700">
                                {rule.icon}
                            </div>
                            <span className="text-xl font-bold uppercase tracking-wide">{rule.title}</span>
                        </div>
                        <motion.div
                            animate={{ rotate: openIndex === index ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronDown className="text-gray-500" />
                        </motion.div>
                    </button>

                    {/* Expandable Content */}
                    <AnimatePresence>
                        {openIndex === index && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <div className="p-6 pt-0 border-t border-zinc-800 bg-zinc-900/50">
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