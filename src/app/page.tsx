"use client";

import React from "react";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="relative w-screen h-screen bg-gray-950 overflow-hidden">
      {/* Background Poster covering the screen with Ken Burns effect */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 z-0"
      >
        <img
          src="/joker.png"
          alt="Joker"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Subtle overlay to enhance moody/premium look */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-gray-950/40 pointer-events-none z-10" />

      {/* Floating neon ambient glows on top of image for extra aesthetic */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-purple-500/20 blur-[100px]"
        />
        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-red-500/20 blur-[120px]"
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20 pointer-events-none z-30" />
    </div>
  );
}
