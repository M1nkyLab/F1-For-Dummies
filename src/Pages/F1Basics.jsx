import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Flag, Trophy, Wrench, Timer } from "lucide-react";

const weekendSchedule = [
  {
    day: "FRIDAY",
    title: "Practice (FP1, FP2, FP3)",
    desc: "Teams test car setups, gather tyre data, and drivers learn the track limits. No points awarded, purely preparation.",
    icon: <Wrench className="w-8 h-8 text-yellow-400" />,
  },
  {
    day: "SATURDAY",
    title: "Qualifying",
    desc: "A knockout session (Q1, Q2, Q3) to determine the starting grid order. The fastest single lap takes 'Pole Position'.",
    icon: <Timer className="w-8 h-8 text-blue-400" />,
  },
  {
    day: "SUNDAY",
    title: "The Grand Prix",
    desc: "The main event. Drivers race approx. 300km. Pit stops are mandatory. Top 10 finishers score points.",
    icon: <Flag className="w-8 h-8 text-red-500" />,
  },
];

const essentials = [
  {
    title: "The Pit Stop",
    icon: <Wrench className="w-10 h-10 mb-2" />,
    info: "A team of 20 mechanics changes all 4 tyres in ~2.5 seconds. Speed and precision are vital.",
  },
  {
    title: "Points System",
    icon: <Trophy className="w-10 h-10 mb-2" />,
    info: "Winner gets 25 pts. 2nd: 18, 3rd: 15. Points go down to 10th place (1 pt). Fastest lap gets +1 bonus point.",
  },
  {
    title: "Race Flags",
    icon: <Flag className="w-10 h-10 mb-2" />,
    info: "🟡 Yellow: Danger, slow down.\n🔴 Red: Session stopped.\n🔵 Blue: Let faster car pass.\n🟢 Green: Racing resumes.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function F1Basics() {
  const containerRef = useRef(null);

  // Parallax Setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // The background image will move slightly (parallax)
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={containerRef} id="f1-basics" className="relative w-full py-24 px-4 overflow-hidden bg-zinc-950">
      
      {/* ========================================= */}
      {/* 🖼️ BACKGROUND IMAGE LAYER                 */}
      {/* ========================================= */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <motion.div style={{ y }} className="w-full h-[120%] relative -top-[10%]">
          <img 
            src="/side-F1.png" 
            alt="F1 Track Background" 
            className="w-full h-full object-cover opacity-20" // Low opacity to keep text readable
          />
          {/* Gradient Overlay to fade into the black background at edges */}
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950"></div>
        </motion.div>
      </div>

      {/* ========================================= */}
      {/* 📦 CONTENT (z-10 to sit on top)           */}
      {/* ========================================= */}
      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Intro Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-tight text-white">
            What is <span className="text-red-600">Formula 1?</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            Formula 1 is the highest class of international racing for open-wheel
            single-seater formula racing cars sanctioned by the FIA. It represents
            the pinnacle of automotive technology, speed, and driver skill.
          </p>
        </motion.div>

        {/* The Race Weekend Timeline */}
        <div className="mb-24">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-2xl font-bold mb-8 border-l-4 border-red-600 pl-4 text-white"
          >
            The Race Weekend
          </motion.h3>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-zinc-800/50 -z-0"></div>

            {weekendSchedule.map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { 
                    opacity: 1, 
                    x: 0, 
                    transition: { delay: index * 0.2 } 
                  },
                }}
                // Added backdrop-blur for glass effect
                className="relative z-10 bg-zinc-900/80 backdrop-blur-md p-6 rounded-lg border border-zinc-800 hover:border-red-600 transition-colors duration-300 shadow-xl"
              >
                <div className="bg-zinc-950 w-16 h-16 rounded-full flex items-center justify-center border-2 border-zinc-700 mb-4 mx-auto md:mx-0">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold text-red-500 mb-1">{item.day}</h4>
                <h5 className="text-lg font-semibold text-white mb-2">{item.title}</h5>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Essentials Grid */}
        <div>
          <motion.h3 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="text-2xl font-bold mb-8 border-l-4 border-red-600 pl-4 text-white"
          >
            Essential Knowledge
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-6">
            {essentials.map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                whileHover="hover"
                className="group relative h-64 bg-zinc-900/80 backdrop-blur-md rounded-xl overflow-hidden border border-zinc-800 cursor-pointer"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 group-hover:opacity-10">
                  <div className="text-red-600 mb-4 scale-125">{item.icon}</div>
                  <h4 className="text-2xl font-bold uppercase text-white">{item.title}</h4>
                  <p className="text-xs text-gray-500 mt-2">Hover to learn</p>
                </div>

                <motion.div
                  variants={{ hover: { opacity: 1, y: 0 } }}
                  initial={{ opacity: 0, y: 20 }}
                  className="absolute inset-0 bg-red-900/95 p-6 flex flex-col items-center justify-center text-center"
                >
                  <h4 className="text-xl font-bold mb-3 text-white">{item.title}</h4>
                  <p className="text-white text-md whitespace-pre-line leading-relaxed">
                    {item.info}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}