"use client";

import { motion } from "framer-motion";

interface SkillUpLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export default function SkillUpLogo({ size = "md", showText = true }: SkillUpLogoProps) {
  const sizes = {
    sm: { icon: 32, text: "text-lg", padding: "p-2" },
    md: { icon: 48, text: "text-2xl", padding: "p-3" },
    lg: { icon: 64, text: "text-3xl", padding: "p-4" },
  };

  const s = sizes[size];

  return (
    <div className="flex items-center gap-3">
      <motion.div
        whileHover={{ rotate: 12, scale: 1.05 }}
        className={`bg-gradient-to-br from-primary-600 via-indigo-600 to-purple-600 ${s.padding} rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30 cursor-pointer relative overflow-hidden`}
      >
        {/* Animated glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-orange-500/10 to-transparent rounded-2xl" />
        
        <svg
          width={s.icon}
          height={s.icon}
          viewBox="0 0 48 48"
          fill="none"
          className="relative z-10"
        >
          {/* Anvil/Forge base */}
          <path
            d="M8 32 L14 24 L34 24 L40 32 L40 38 L8 38 Z"
            fill="white"
            fillOpacity="0.95"
          />
          
          {/* Anvil top */}
          <path
            d="M12 24 L18 16 L30 16 L36 24 Z"
            fill="white"
            fillOpacity="0.9"
          />
          
          {/* Hammer */}
          <rect
            x="28"
            y="8"
            width="12"
            height="6"
            rx="1"
            fill="white"
            fillOpacity="0.85"
          />
          <rect
            x="33"
            y="12"
            width="3"
            height="8"
            rx="0.5"
            fill="white"
            fillOpacity="0.75"
          />
          
          {/* Sparks */}
          <circle cx="16" cy="12" r="2" fill="#FBBF24" className="animate-pulse" />
          <circle cx="24" cy="8" r="1.5" fill="#F59E0B" className="animate-pulse" style={{ animationDelay: "0.3s" }} />
          <circle cx="20" cy="14" r="1" fill="#FCD34D" className="animate-pulse" style={{ animationDelay: "0.6s" }} />
          
          {/* Inner glow */}
          <circle
            cx="24"
            cy="28"
            r="8"
            fill="url(#forgeGradient)"
            fillOpacity="0.3"
          />
          
          <defs>
            <linearGradient id="forgeGradient" x1="16" y1="20" x2="32" y2="36">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/0 via-white/10 to-purple-400/0" />
      </motion.div>
      
      {showText && (
        <div>
          <h1 className={`${s.text} font-black text-neutral-900 tracking-tight leading-none`}>
            SkillUp
          </h1>
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
              Mastery Portal
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
