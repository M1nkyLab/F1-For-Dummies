import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Wind, Zap, Shield, Circle, Activity } from "lucide-react";

// DATA: Car Parts for the Hotspot Diagram
const carParts = [
  {
    id: "front-wing",
    label: "Front Wing",
    x: 85, // % from left
    y: 75, // % from top
    description: "The first part to hit the air. It directs airflow over the car and generates front-end grip (downforce).",
  },
  {
    id: "halo",
    label: "Halo",
    x: 48,
    y: 35,
    description: "A titanium bar that protects the driver's head. It can withstand the weight of a double-decker bus (12 tonnes).",
  },
  {
    id: "rear-wing",
    label: "Rear Wing",
    x: 10,
    y: 25,
    description: "Generates massive downforce to keep the rear tyres glued to the track. Also opens up for DRS (Drag Reduction System) to boost speed.",
  },
  {
    id: "sidepod",
    label: "Sidepods",
    x: 55,
    y: 60,
    description: "Houses the radiators to cool the engine. The shape is crucial for guiding air to the rear of the car.",
  },
  {
    id: "floor",
    label: "Floor / Diffuser",
    x: 30,
    y: 85,
    description: "The most powerful aerodynamic tool. It accelerates air under the car to suck it down onto the track (Ground Effect).",
  },
];

// DATA: Tyre Compounds
const tyres = [
  {
    name: "Soft",
    color: "text-red-600",
    borderColor: "border-red-600",
    bg: "bg-red-600",
    usage: "Fastest but wears out quickly. Used for Qualifying and short bursts.",
    icon: "🔴",
  },
  {
    name: "Medium",
    color: "text-yellow-400",
    borderColor: "border-yellow-400",
    bg: "bg-yellow-400",
    usage: "The balanced choice. Good mix of speed and durability.",
    icon: "🟡",
  },
  {
    name: "Hard",
    color: "text-white",
    borderColor: "border-white",
    bg: "bg-white",
    usage: "Slowest but lasts the longest. Hard to warm up, but great for long race stints.",
    icon: "⚪",
  },
  {
    name: "Intermediate",
    color: "text-green-500",
    borderColor: "border-green-500",
    bg: "bg-green-500",
    usage: "For light rain or drying tracks. Has grooves to disperse water.",
    icon: "🟢",
  },
  {
    name: "Wet",
    color: "text-blue-500",
    borderColor: "border-blue-500",
    bg: "bg-blue-500",
    usage: "For heavy rain / standing water. Disperses 85 liters of water per second!",
    icon: "🔵",
  },
];

export default function CarsAndTyres() {
  const [selectedPart, setSelectedPart] = useState(null);
  const [activeTyre, setActiveTyre] = useState(tyres[0]); // Default to Soft

  return (
    <section className="w-full bg-zinc-950 text-white py-20 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
            The <span className="text-red-600">Machine</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            An F1 car is not just a car; it's an upside-down airplane designed to stick to the ground.
          </p>
        </div>

        {/* 1. INTERACTIVE CAR ANATOMY */}
        <div className="mb-24 relative bg-zinc-900 rounded-3xl p-4 md:p-8 border border-zinc-800 shadow-2xl">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Zap className="text-yellow-400" /> Interactive Anatomy
          </h3>
          
          <div className="relative w-full aspect-[16/9] md:aspect-[2/1] bg-black/50 rounded-xl overflow-hidden">
            {/* ⚠️ PLACEHOLDER IMAGE - Replace src with a real side-profile F1 car image */}
            <img 
              src="/" 
              alt="F1 Car Anatomy" 
              className="w-full h-full object-contain opacity-80"
            />
            
            {/* Hotspots */}
            {carParts.map((part) => (
              <button
                key={part.id}
                onClick={() => setSelectedPart(part)}
                style={{ left: `${part.x}%`, top: `${part.y}%` }}
                className="absolute w-6 h-6 md:w-8 md:h-8 -ml-4 -mt-4 group z-10"
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-full w-full bg-red-600 border-2 border-white items-center justify-center">
                    <span className="text-xs font-bold">+</span>
                </span>
                {/* Tooltip Label (Desktop only) */}
                <span className="hidden md:group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-xs rounded whitespace-nowrap">
                    {part.label}
                </span>
              </button>
            ))}

            {/* Popup Modal (AnimatePresence) */}
            <AnimatePresence>
              {selectedPart && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 z-20 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                  onClick={() => setSelectedPart(null)} // Close on background click
                >
                  <div 
                    className="bg-zinc-900 border border-zinc-700 p-6 rounded-2xl max-w-md w-full relative shadow-2xl"
                    onClick={(e) => e.stopPropagation()} // Prevent close when clicking content
                  >
                    <button 
                      onClick={() => setSelectedPart(null)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-white"
                    >
                      <X size={24} />
                    </button>
                    <h4 className="text-2xl font-bold text-red-600 mb-2">{selectedPart.label}</h4>
                    <p className="text-gray-300 leading-relaxed">{selectedPart.description}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <p className="text-center text-xs text-gray-500 mt-4">Tap the pulsing markers to explore parts.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          
          {/* 2. TYRES SECTION */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Circle className="text-red-500" /> Tyre Compounds
            </h3>
            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
              
              {/* Tyre Selector */}
              <div className="flex justify-between items-center mb-8 bg-black/50 p-2 rounded-xl">
                 {tyres.map((tyre) => (
                    <button
                        key={tyre.name}
                        onMouseEnter={() => setActiveTyre(tyre)}
                        onClick={() => setActiveTyre(tyre)} // For mobile
                        className={`relative w-10 h-10 md:w-14 md:h-14 rounded-full border-4 transition-all duration-300 ${
                            activeTyre.name === tyre.name ? 'scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'opacity-50 hover:opacity-100 hover:scale-105'
                        } ${tyre.borderColor} bg-zinc-800 flex items-center justify-center font-bold text-xs md:text-sm`}
                    >
                        {/* Simulate Tyre markings */}
                        <div className={`w-full h-full rounded-full border-2 border-dashed ${tyre.borderColor} opacity-50`}></div>
                    </button>
                 ))}
              </div>

              {/* Active Tyre Details */}
              <AnimatePresence mode="wait">
                <motion.div
                    key={activeTyre.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-center"
                >
                    <h4 className={`text-3xl font-bold mb-2 ${activeTyre.color}`}>{activeTyre.name} Tyre</h4>
                    <p className="text-lg text-gray-300 h-20">{activeTyre.usage}</p>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

          {/* 3. AERODYNAMICS EXPLANATION */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Wind className="text-blue-400" /> Aerodynamics 101
            </h3>
            <div className="space-y-4">
                {/* Card 1: Downforce */}
                <div className="bg-zinc-900 p-6 rounded-xl border-l-4 border-blue-500 hover:bg-zinc-800 transition-colors">
                    <h4 className="text-xl font-bold text-white mb-2">Downforce (Grip)</h4>
                    <p className="text-gray-400 text-sm">
                        Invisible hands pushing the car down. The faster the car goes, the more the air pushes it into the track. This lets cars take corners at 200km/h without sliding off.
                    </p>
                </div>

                {/* Card 2: Drag */}
                <div className="bg-zinc-900 p-6 rounded-xl border-l-4 border-red-500 hover:bg-zinc-800 transition-colors">
                    <h4 className="text-xl font-bold text-white mb-2">Drag (Resistance)</h4>
                    <p className="text-gray-400 text-sm">
                        The air fighting back. It slows the car down on straights. Teams want high downforce for corners but low drag for straights (that's why DRS opens the rear wing!).
                    </p>
                </div>

                {/* Card 3: Dirty Air */}
                <div className="bg-zinc-900 p-6 rounded-xl border-l-4 border-gray-500 hover:bg-zinc-800 transition-colors">
                    <h4 className="text-xl font-bold text-white mb-2">Dirty Air</h4>
                    <p className="text-gray-400 text-sm">
                        Turbulent air left behind a car. It makes it hard for the car behind to follow closely because they lose downforce.
                    </p>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}