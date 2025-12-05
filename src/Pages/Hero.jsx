import '../App.css';
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef(null);

  // Parallax Effect Setup
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  // The background video will move slower than the scroll (0% to 50%)
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Stagger animation configuration
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, 
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: "easeOut" } 
    },
  };

  return (
    <section ref={ref} className="h-screen w-full overflow-hidden">
      {/* Parallax Background Video Container */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute top-0 left-0 w-full h-[120%] -z-10" 
      >
        <video
          src="/F1-hero.mp4" 
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 max-w-5xl mx-auto">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Main Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 uppercase"
          >
            F1 for 
            {/* UPDATED SPAN BELOW */}
            <span className="text-red-600 px-3 rounded-xl transition-all duration-300 hover:bg-red-600 hover:text-white cursor-pointer ml-2">
              Dummies
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl font-light"
          >
            Everything you need to know about Formula 1 — from the cars and drivers to the tracks and rules.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6"
          >
             {/* You can put buttons here later */}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}