import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X, Trophy, Timer, Award } from "lucide-react";

// DATA: Top Teams & Drivers (2025 Grid)
const teamsData = [
  {
    id: "ferrari",
    name: "Scuderia Ferrari",
    color: "bg-red-600",
    textColor: "text-red-600",
    logo: "/logos/ferrari.png", // You'll need to add these logos
    principal: "Fred Vasseur",
    base: "Maranello, Italy",
    drivers: [
      {
        id: "leclerc",
        name: "Charles Leclerc",
        number: "16",
        country: "🇲🇨 Monaco",
        image: "/drivers/leclerc.png",
        bio: "The Monegasque prodigy. Known for his blistering qualifying speed and deep connection to Ferrari.",
        stats: { wins: 8, podiums: 41, championships: 0 },
      },
      {
        id: "hamilton",
        name: "Lewis Hamilton",
        number: "44",
        country: "🇬🇧 UK",
        image: "/drivers/hamilton.png",
        bio: "The statistician's greatest. After a historic run with Mercedes, he joins Ferrari to chase a record 8th title.",
        stats: { wins: 105, podiums: 201, championships: 7 },
      },
    ],
  },
  {
    id: "redbull",
    name: "Red Bull Racing",
    color: "bg-blue-900",
    textColor: "text-blue-900",
    logo: "/logos/redbull.png",
    principal: "Christian Horner",
    base: "Milton Keynes, UK",
    drivers: [
      {
        id: "verstappen",
        name: "Max Verstappen",
        number: "1",
        country: "🇳🇱 Netherlands",
        image: "/drivers/verstappen.png",
        bio: "The relentless force. Known for his aggressive style and unmatched consistency in the ground-effect era.",
        stats: { wins: 62, podiums: 110, championships: 4 },
      },
      {
        id: "perez",
        name: "Sergio Perez",
        number: "11",
        country: "🇲🇽 Mexico",
        image: "/drivers/perez.png",
        bio: "The Minister of Defence. A street circuit specialist known for his tyre management.",
        stats: { wins: 6, podiums: 39, championships: 0 },
      },
    ],
  },
  {
    id: "mclaren",
    name: "McLaren",
    color: "bg-orange-500",
    textColor: "text-orange-500",
    logo: "/logos/mclaren.png",
    principal: "Andrea Stella",
    base: "Woking, UK",
    drivers: [
      {
        id: "norris",
        name: "Lando Norris",
        number: "4",
        country: "🇬🇧 UK",
        image: "/drivers/norris.png",
        bio: "McLaren's golden boy. Rapid, popular, and a consistent podium challenger hunting for the title.",
        stats: { wins: 3, podiums: 24, championships: 0 },
      },
      {
        id: "piastri",
        name: "Oscar Piastri",
        number: "81",
        country: "🇦🇺 Australia",
        image: "/drivers/piastri.png",
        bio: "The ice-cold rookie sensation. calm under pressure and devastatingly fast.",
        stats: { wins: 2, podiums: 9, championships: 0 },
      },
    ],
  },
  {
    id: "mercedes",
    name: "Mercedes-AMG",
    color: "bg-teal-500",
    textColor: "text-teal-500",
    logo: "/logos/mercedes.png",
    principal: "Toto Wolff",
    base: "Brackley, UK",
    drivers: [
      {
        id: "russell",
        name: "George Russell",
        number: "63",
        country: "🇬🇧 UK",
        image: "/drivers/russell.png",
        bio: "Mr. Saturday. A precision driver who extracts the maximum from the car.",
        stats: { wins: 2, podiums: 14, championships: 0 },
      },
      {
        id: "antonelli",
        name: "Kimi Antonelli",
        number: "12",
        country: "🇮🇹 Italy",
        image: "/drivers/antonelli.png",
        bio: "The rookie prodigy. Stepping into huge shoes at Mercedes with immense hype surrounding his talent.",
        stats: { wins: 0, podiums: 0, championships: 0 },
      },
    ],
  },
];

export default function TeamsAndDrivers() {
  const [activeTeam, setActiveTeam] = useState(teamsData[0]);
  const [selectedDriver, setSelectedDriver] = useState(null);

  return (
    <section id="teams" className="w-full bg-zinc-950 text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
            The <span className="text-red-600">Grid</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ten teams, twenty drivers. The best in the world fighting for tenths of a second.
          </p>
        </div>

        {/* TEAM SELECTOR (Tab Navigation) */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {teamsData.map((team) => (
            <button
              key={team.id}
              onClick={() => setActiveTeam(team)}
              className={`px-6 py-3 rounded-full text-sm md:text-lg font-bold transition-all duration-300 border-2 ${
                activeTeam.id === team.id
                  ? `${team.color} border-transparent text-white shadow-lg scale-105`
                  : "bg-transparent border-zinc-700 text-gray-400 hover:border-white hover:text-white"
              }`}
            >
              {team.name}
            </button>
          ))}
        </div>

        {/* ACTIVE TEAM DISPLAY */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTeam.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-zinc-900 rounded-3xl p-6 md:p-12 border border-zinc-800 shadow-2xl"
          >
            {/* Team Header Info */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-zinc-800 pb-6">
                <div>
                    <h3 className={`text-4xl md:text-5xl font-bold uppercase mb-2 ${activeTeam.textColor}`}>
                        {activeTeam.name}
                    </h3>
                    <div className="flex gap-6 text-sm text-gray-400">
                        <span>📍 {activeTeam.base}</span>
                        <span>👔 Boss: <span className="text-white">{activeTeam.principal}</span></span>
                    </div>
                </div>
                {/* Placeholder for Logo */}
                <div className="mt-4 md:mt-0 px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-xs text-gray-500 uppercase tracking-widest">
                    Team Logo
                </div>
            </div>

            {/* Drivers Grid */}
            <div className="grid md:grid-cols-2 gap-8">
                {activeTeam.drivers.map((driver) => (
                    <div 
                        key={driver.id} 
                        className="group relative bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-all cursor-pointer"
                        onClick={() => setSelectedDriver(driver)}
                    >
                        {/* Background Gradient */}
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${activeTeam.color}`}></div>

                        <div className="flex flex-col md:flex-row items-center">
                            {/* Image Container */}
                            <div className="w-full md:w-1/2 h-64 relative bg-gradient-to-b from-zinc-800 to-zinc-950">
                                {/* ⚠️ REPLACE with real image paths in /public/drivers/ */}
                                <img 
                                    src={driver.image} 
                                    alt={driver.name}
                                    className="w-full h-full object-cover object-top mix-blend-overlay opacity-50 group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-500"
                                />
                                <div className="absolute top-4 left-4 text-6xl font-black text-white/10 group-hover:text-white/30 transition-colors">
                                    {driver.number}
                                </div>
                            </div>
                            
                            {/* Info */}
                            <div className="p-6 w-full md:w-1/2">
                                <span className="text-xs font-mono text-gray-500 mb-2 block">{driver.country}</span>
                                <h4 className="text-2xl font-bold text-white mb-2">{driver.name}</h4>
                                <p className="text-sm text-gray-400 line-clamp-3 mb-4">{driver.bio}</p>
                                <button className="text-sm font-bold text-white flex items-center gap-1 group-hover:gap-2 transition-all">
                                    View Stats <ChevronRight size={16} className={`group-hover:${activeTeam.textColor}`} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* DRIVER STATS MODAL */}
        <AnimatePresence>
            {selectedDriver && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-md"
                    onClick={() => setSelectedDriver(null)}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 50 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-zinc-900 w-full max-w-lg rounded-2xl border border-zinc-700 shadow-2xl overflow-hidden"
                    >
                        {/* Modal Header */}
                        <div className="relative h-32 bg-zinc-800 overflow-hidden">
                             <div className={`absolute inset-0 opacity-20 ${activeTeam.color}`}></div>
                             <h3 className="absolute bottom-4 left-6 text-3xl font-bold text-white z-10">{selectedDriver.name}</h3>
                             <span className="absolute -top-6 -right-6 text-[150px] font-black text-white/5 select-none">
                                {selectedDriver.number}
                             </span>
                             <button 
                                onClick={() => setSelectedDriver(null)}
                                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-white hover:text-black transition-colors z-20"
                             >
                                <X size={20} />
                             </button>
                        </div>

                        {/* Stats Grid */}
                        <div className="p-8">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800">
                                    <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-white">{selectedDriver.stats.wins}</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wider">Wins</div>
                                </div>
                                <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800">
                                    <Award className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-white">{selectedDriver.stats.podiums}</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wider">Podiums</div>
                                </div>
                                <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800">
                                    <Timer className="w-8 h-8 text-red-500 mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-white">{selectedDriver.stats.championships}</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wider">Titles</div>
                                </div>
                            </div>
                            
                            <div className="mt-8 text-center">
                                <p className="text-gray-400 text-sm">
                                    Stats correct as of Start of 2025 Season.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

      </div>
    </section>
  );
}