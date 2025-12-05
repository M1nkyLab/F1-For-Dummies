import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Wind, Zap, Circle } from "lucide-react";

// DATA: Car Parts (Simplified for brevity)
const carParts = [
  { id: "front-wing", label: "Front Wing", x: 85, y: 75, description: "Directs airflow over the car." },
  { id: "halo", label: "Halo", x: 48, y: 35, description: "Titanium bar protecting the head." },
  { id: "rear-wing", label: "Rear Wing", x: 10, y: 25, description: "Generates downforce and Drag Reduction." },
  { id: "sidepod", label: "Sidepods", x: 55, y: 60, description: "Cooling intakes and air shaping." },
  { id: "floor", label: "Floor", x: 30, y: 85, description: "Generates ground effect suction." },
];

const tyres = [
  { name: "Soft", color: "text-red-600", borderColor: "border-red-600", bg: "bg-red-600", usage: "Fastest, low durability." },
  { name: "Medium", color: "text-yellow-400", borderColor: "border-yellow-400", bg: "bg-yellow-400", usage: "Balanced speed/life." },
  { name: "Hard", color: "text-white", borderColor: "border-white", bg: "bg-white", usage: "Slowest, high durability." },
];

export default function CarsAndTyres() {
  const [selectedPart, setSelectedPart] = useState(null);
  const [activeTyre, setActiveTyre] = useState(tyres[0]);

  return (
    <section className="w-full bg-zinc-950 text-white py-12 md:py-20 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
            The <span className="text-red-600">Machine</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Engineering excellence.</p>
        </div>

        {/* 1. INTERACTIVE CAR ANATOMY */}
        <div className="mb-20 relative bg-zinc-900 rounded-3xl p-4 border border-zinc-800 shadow-2xl">
          <h3 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
            <Zap className="text-yellow-400" /> Interactive Anatomy
          </h3>
          
          <div className="relative w-full aspect-[16/9] md:aspect-[2/1] bg-black/50 rounded-xl overflow-hidden">
            <img src="/F1-cars.png" alt="F1 Car Anatomy" className="w-full h-full object-contain opacity-80" />
            
            {carParts.map((part) => (
              <button
                key={part.id}
                onClick={() => setSelectedPart(part)}
                style={{ left: `${part.x}%`, top: `${part.y}%` }}
                className="absolute w-8 h-8 -ml-4 -mt-4 group z-10"
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-full w-full bg-red-600 border-2 border-white items-center justify-center">
                    <span className="text-xs font-bold">+</span>
                </span>
              </button>
            ))}

            <AnimatePresence>
              {selectedPart && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 z-20 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                  onClick={() => setSelectedPart(null)}
                >
                  <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-2xl max-w-md w-full relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => setSelectedPart(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={24} /></button>
                    <h4 className="text-xl font-bold text-red-600 mb-2">{selectedPart.label}</h4>
                    <p className="text-sm text-gray-300">{selectedPart.description}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <p className="text-center text-xs text-gray-500 mt-4">Tap markers to explore.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* 2. TYRES SECTION */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
              <Circle className="text-red-500" /> Tyres
            </h3>
            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
              <div className="flex justify-center gap-4 mb-8 bg-black/50 p-2 rounded-xl">
                 {tyres.map((tyre) => (
                    <button
                        key={tyre.name}
                        onClick={() => setActiveTyre(tyre)}
                        className={`w-10 h-10 md:w-14 md:h-14 rounded-full border-4 transition-all duration-300 ${activeTyre.name === tyre.name ? 'scale-110 shadow-lg' : 'opacity-50'} ${tyre.borderColor} bg-zinc-800`}
                    />
                 ))}
              </div>
              <div className="text-center h-24">
                    <h4 className={`text-2xl font-bold mb-2 ${activeTyre.color}`}>{activeTyre.name}</h4>
                    <p className="text-sm md:text-base text-gray-300">{activeTyre.usage}</p>
              </div>
            </div>
          </div>

          {/* 3. AERO SECTION */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
              <Wind className="text-blue-400" /> Aero
            </h3>
            <div className="space-y-4">
                <div className="bg-zinc-900 p-4 rounded-xl border-l-4 border-blue-500">
                    <h4 className="font-bold text-white">Downforce</h4>
                    <p className="text-xs md:text-sm text-gray-400">Pushes car down for grip.</p>
                </div>
                <div className="bg-zinc-900 p-4 rounded-xl border-l-4 border-red-500">
                    <h4 className="font-bold text-white">Drag</h4>
                    <p className="text-xs md:text-sm text-gray-400">Air resistance slowing the car.</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}