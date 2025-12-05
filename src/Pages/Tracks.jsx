import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Ruler, RotateCw, Timer, ArrowRight } from "lucide-react";

// 1️⃣ SVG PATH DATA
// These are simplified vector paths representing the track layouts.
// Viewbox is normalized to 0 0 200 150 for consistency.
const trackPaths = {
  monaco: {
    viewBox: "0 0 200 150",
    // Twisty street circuit shape
    path: "M 40 120 L 40 100 C 40 80 50 60 70 50 L 90 45 C 100 40 100 30 90 25 L 70 20 L 60 30 L 50 25 L 60 10 L 100 10 L 120 20 L 130 50 L 140 60 L 160 60 L 160 80 L 140 85 L 120 80 L 100 85 L 90 110 L 110 120 L 130 115 L 140 125 L 130 135 L 70 135 Z",
  },
  silverstone: {
    viewBox: "0 0 200 150",
    // Fast, wide shape
    path: "M 80 130 L 120 130 L 140 110 L 160 115 L 180 100 L 170 70 L 150 60 L 160 40 L 140 20 L 100 20 L 80 40 L 60 30 L 40 40 L 30 70 L 40 90 L 30 110 L 50 125 Z",
  },
  monza: {
    viewBox: "0 0 200 150",
    // The "Shoe" / Speed temple
    path: "M 40 110 L 150 110 C 170 110 180 100 180 80 L 175 40 C 170 20 150 20 140 30 L 60 40 C 40 45 30 60 30 80 L 40 110 Z",
  },
  suzuka: {
    viewBox: "0 0 200 150",
    // Figure 8 (Simulated crossover)
    path: "M 50 120 L 100 120 L 120 100 L 100 80 L 80 80 L 60 60 L 70 40 L 100 30 L 130 40 L 140 60 L 130 80 L 150 80 L 170 70 L 180 80 L 160 110 L 140 110 L 120 100", 
    // Note: Suzuka is complex to draw in one line due to the bridge, this is a stylized 2D loop
  },
  singapore: {
    viewBox: "0 0 200 150",
    // Rectangular street feel
    path: "M 30 100 L 30 50 L 50 40 L 150 40 L 170 50 L 170 100 L 150 120 L 120 110 L 110 130 L 90 130 L 80 110 L 50 120 Z",
  }
};

// 2️⃣ CUSTOM SVG COMPONENT
// This handles the "Ghost Car" animation
const TrackMap = ({ trackId }) => {
  const data = trackPaths[trackId] || trackPaths.monaco; // Fallback
  
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <svg 
        viewBox={data.viewBox} 
        className="w-full h-full drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* 1. Base Track (The Road) */}
        <motion.path
          d={data.path}
          stroke="#333"
          strokeWidth="8"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        {/* 2. Track Highlight (White borders) */}
        <motion.path
          d={data.path}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* 3. The "Ghost Car" (Red Segment Racing) */}
        <motion.path
          d={data.path}
          stroke="#DC2626" // Red 600
          strokeWidth="4"
          // We set pathLength to 0.1 (10% of track) to look like a car/streak
          initial={{ pathLength: 0.1, pathOffset: 0, opacity: 0 }}
          animate={{ 
            pathOffset: [0, 1],
            opacity: 1
          }}
          transition={{ 
            duration: 6, // 6 seconds per lap
            ease: "linear", 
            repeat: Infinity,
            delay: 1.5 // Wait for track to draw first
          }}
        />
      </svg>
    </div>
  );
};

// DATA: Iconic Tracks
const tracks = [
  {
    id: "monaco",
    name: "Circuit de Monaco",
    location: "Monte Carlo, Monaco",
    length: "3.337 km",
    turns: 19,
    record: "1:10.166 (L. Hamilton, 2019)",
    desc: "The jewel in the crown. A tight, twisting street circuit where barriers punish the smallest error. Overtaking is nearly impossible, making Qualifying crucial.",
    corners: [
      { name: "Sainte Dévote", info: "Turn 1. A tight right-hander after the start." },
      { name: "The Hairpin", info: "The slowest corner in F1 (approx 45km/h)." },
      { name: "Tunnel", info: "Fast, loud, and the transition from dark to light blinds drivers." },
    ]
  },
  {
    id: "silverstone",
    name: "Silverstone Circuit",
    location: "Silverstone, UK",
    length: "5.891 km",
    turns: 18,
    record: "1:24.303 (L. Hamilton, 2020)",
    desc: " The home of British motor racing. High-speed, flowing corners that test the car's aerodynamic limits and tyre durability.",
    corners: [
      { name: "Maggots & Becketts", info: "A legendary high-speed S-bend sequence taken at 280km/h." },
      { name: "Stowe", info: "A fast right-hander at the end of the Hangar Straight." },
      { name: "Copse", info: "A terrifyingly fast corner, often taken flat-out." },
    ]
  },
  {
    id: "monza",
    name: "Autodromo Nazionale Monza",
    location: "Monza, Italy",
    length: "5.793 km",
    turns: 11,
    record: "1:18.887 (L. Hamilton, 2020)",
    desc: "The Temple of Speed. F1 cars reach their highest velocities here (350km/h+). Low downforce wings and heavy braking zones define this track.",
    corners: [
      { name: "Parabolica", info: "A long, accelerating right-hander leading to the main straight." },
      { name: "Variante Ascari", info: "A tricky chicane that requires perfect kerb usage." },
      { name: "Curva Grande", info: "A long sweeping curve taken at full throttle." },
    ]
  },
  {
    id: "suzuka",
    name: "Suzuka Circuit",
    location: "Suzuka, Japan",
    length: "5.807 km",
    turns: 18,
    record: "1:27.064 (S. Vettel, 2019)",
    desc: "A driver's favorite. The only Figure-8 track on the calendar. It demands incredible precision and flow.",
    corners: [
      { name: "The S Curves", info: "A rhythmic uphill snake. Miss one apex, and you ruin the whole sector." },
      { name: "130R", info: "A fearsome left-hander taken flat out at 310km/h." },
      { name: "Degner 1 & 2", info: "Two difficult right-handers that punish mistakes heavily." },
    ]
  },
  {
    id: "singapore",
    name: "Marina Bay Street Circuit",
    location: "Marina Bay, Singapore",
    length: "4.94 km",
    turns: 19,
    record: "1:35.867 (L. Hamilton, 2023)",
    desc: "The original Night Race. Hot, humid, and bumpy. It is the most physically demanding race of the year for drivers.",
    corners: [
      { name: "Singapore Sling", info: "Historically a chicane, now a fast left hander." },
      { name: "Sheares", info: "A sharp turn taking drivers under the highway bridge." },
      { name: "Turn 1-2-3", info: "A complex braking zone immediately after the start." },
    ]
  }
];

export default function Tracks() {
  const [activeTrack, setActiveTrack] = useState(tracks[0]);

  return (
    <section className="w-full bg-zinc-950 text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
                Iconic <span className="text-red-600">Circuits</span>
            </h2>
            <p className="text-gray-400">Where history is made, one lap at a time.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* LEFT: Track List */}
            <div className="w-full lg:w-1/3 flex flex-col gap-2">
                {tracks.map((track) => (
                    <button
                        key={track.id}
                        onClick={() => setActiveTrack(track)}
                        className={`text-left p-6 rounded-xl border transition-all duration-300 group ${
                            activeTrack.id === track.id 
                            ? "bg-red-600 border-red-500 text-white shadow-lg translate-x-2" 
                            : "bg-zinc-900 border-zinc-800 text-gray-400 hover:bg-zinc-800 hover:border-zinc-600"
                        }`}
                    >
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-lg">{track.name}</span>
                            <ArrowRight size={18} className={`opacity-0 group-hover:opacity-100 transition-opacity ${activeTrack.id === track.id ? "opacity-100" : ""}`} />
                        </div>
                        <div className="flex items-center gap-2 text-xs mt-1 opacity-80">
                             <MapPin size={12} /> {track.location}
                        </div>
                    </button>
                ))}
            </div>

            {/* RIGHT: Detailed View */}
            <div className="w-full lg:w-2/3">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTrack.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-zinc-900 rounded-3xl p-6 md:p-10 border border-zinc-800 shadow-2xl h-full flex flex-col"
                    >
                        {/* Track Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-zinc-800 pb-6">
                            <div>
                                <h3 className="text-3xl md:text-4xl font-black italic uppercase tracking-wider">{activeTrack.name}</h3>
                                <div className="text-red-500 font-mono mt-1">{activeTrack.location}</div>
                            </div>
                        </div>

                        {/* Track Stats Grid */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="bg-black/30 p-4 rounded-lg text-center border border-white/5">
                                <Ruler className="mx-auto text-blue-500 mb-2" size={24} />
                                <div className="text-xl font-bold">{activeTrack.length}</div>
                                <div className="text-xs text-gray-500 uppercase">Length</div>
                            </div>
                            <div className="bg-black/30 p-4 rounded-lg text-center border border-white/5">
                                <RotateCw className="mx-auto text-yellow-500 mb-2" size={24} />
                                <div className="text-xl font-bold">{activeTrack.turns}</div>
                                <div className="text-xs text-gray-500 uppercase">Turns</div>
                            </div>
                            <div className="bg-black/30 p-4 rounded-lg text-center border border-white/5">
                                <Timer className="mx-auto text-green-500 mb-2" size={24} />
                                <div className="text-sm md:text-lg font-bold truncate">{activeTrack.record}</div>
                                <div className="text-xs text-gray-500 uppercase">Record</div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 flex-grow">
                            
                            {/* ANIMATED TRACK MAP */}
                            <div className="bg-zinc-950/50 rounded-xl flex items-center justify-center p-4 relative min-h-[300px] border border-zinc-800">
                                <TrackMap trackId={activeTrack.id} />
                            </div>

                            {/* Description & Corners */}
                            <div className="flex flex-col justify-center">
                                <p className="text-gray-300 leading-relaxed mb-6">
                                    {activeTrack.desc}
                                </p>
                                
                                <h4 className="text-lg font-bold text-white mb-3 border-l-4 border-red-600 pl-3">Famous Corners</h4>
                                <ul className="space-y-3">
                                    {activeTrack.corners.map((corner, i) => (
                                        <li key={i} className="group cursor-default">
                                            <span className="text-red-500 font-bold group-hover:text-red-400 transition-colors">
                                                {corner.name}
                                            </span>
                                            <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
                                                {corner.info}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                    </motion.div>
                </AnimatePresence>
            </div>

        </div>
      </div>
    </section>
  );
}