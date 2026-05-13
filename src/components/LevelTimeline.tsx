"use client";

import { Check, Lock, ChevronLeft, ChevronRight } from "lucide-react";

const levels = [
  { 
    level: 5, 
    completed: true, 
    bgColor: "bg-emerald-50",
    xp: "250",
    xpBg: "bg-primary-600",
    status: "check",
    chestType: "gems"
  },
  { 
    level: 6, 
    completed: false, 
    bgColor: "bg-amber-50",
    xp: "350",
    xpBg: "bg-cyan-500",
    status: "claim",
    chestType: "coins"
  },
  { 
    level: 7, 
    completed: false, 
    bgColor: "bg-blue-50",
    xp: "450",
    xpBg: "bg-blue-500",
    status: "lock",
    chestType: "closed"
  },
  { 
    level: 8, 
    completed: false, 
    bgColor: "bg-purple-100",
    xp: "600",
    xpBg: "bg-primary-500",
    status: "lock",
    chestType: "closed"
  },
];

const TreasureChest3D = ({ type }: { type: 'gems' | 'coins' | 'closed' }) => (
  <svg viewBox="0 0 80 70" className="w-20 h-16">
    {type === 'gems' ? (
      <>
        <ellipse cx="40" cy="55" rx="35" ry="10" fill="#047857" opacity="0.3" />
        <path d="M10 30 C10 18, 25 8, 40 8 C55 8, 70 18, 70 30 L70 55 C70 60, 55 68, 40 68 C25 68, 10 60, 10 55 Z" fill="#10B981" />
        <path d="M40 8 C25 8, 10 18, 10 30 L10 55 C10 60, 25 68, 40 68 C55 68, 70 60, 70 55 L70 30 C70 18, 55 8, 40 8" fill="#059669" />
        <path d="M10 30 L70 30 L70 35 L10 35 Z" fill="#047857" />
        <rect x="32" y="28" width="16" height="20" rx="3" fill="#FEF3C7" />
        <rect x="35" y="32" width="10" height="4" rx="1" fill="#D97706" />
        <ellipse cx="40" cy="5" rx="12" ry="4" fill="#FEF3C7" />
        <circle cx="30" cy="0" r="3" fill="#38BDF8" />
        <circle cx="50" cy="2" r="4" fill="#60A5FA" />
        <circle cx="40" cy="-3" r="2.5" fill="#3B82F6" />
        <circle cx="55" cy="5" r="2" fill="#818CF8" />
        <circle cx="25" cy="4" r="2.5" fill="#A78BFA" />
      </>
    ) : type === 'coins' ? (
      <>
        <ellipse cx="40" cy="55" rx="35" ry="10" fill="#B45309" opacity="0.3" />
        <path d="M10 30 C10 18, 25 8, 40 8 C55 8, 70 18, 70 30 L70 55 C70 60, 55 68, 40 68 C25 68, 10 60, 10 55 Z" fill="#FBBF24" />
        <path d="M40 8 C25 8, 10 18, 10 30 L10 55 C10 60, 25 68, 40 68 C55 68, 70 60, 70 55 L70 30 C70 18, 55 8, 40 8" fill="#F59E0B" />
        <path d="M10 30 L70 30 L70 35 L10 35 Z" fill="#D97706" />
        <rect x="32" y="28" width="16" height="20" rx="3" fill="#FEF3C7" />
        <rect x="35" y="32" width="10" height="4" rx="1" fill="#D97706" />
        <ellipse cx="40" cy="5" rx="12" ry="4" fill="#FCD34D" />
        <circle cx="28" cy="0" r="3" fill="#FCD34D" />
        <circle cx="52" cy="2" r="3" fill="#FCD34D" />
        <circle cx="40" cy="-2" r="4" fill="#FCD34D" />
        <circle cx="20" cy="3" r="2.5" fill="#FCD34D" />
        <circle cx="60" cy="5" r="2" fill="#FCD34D" />
      </>
    ) : (
      <>
        <ellipse cx="40" cy="55" rx="35" ry="10" fill="#374151" opacity="0.3" />
        <path d="M10 30 C10 18, 25 8, 40 8 C55 8, 70 18, 70 30 L70 55 C70 60, 55 68, 40 68 C25 68, 10 60, 10 55 Z" fill="#9CA3AF" />
        <path d="M40 8 C25 8, 10 18, 10 30 L10 55 C10 60, 25 68, 40 68 C55 68, 70 60, 70 55 L70 30 C70 18, 55 8, 40 8" fill="#6B7280" />
        <path d="M10 30 L70 30 L70 35 L10 35 Z" fill="#4B5563" />
        <rect x="32" y="28" width="16" height="20" rx="3" fill="#374151" />
        <rect x="35" y="32" width="10" height="4" rx="1" fill="#9CA3AF" />
        <path d="M36 22 C36 18, 44 18, 44 22 L44 28 L36 28 Z" fill="#374151" />
        <rect x="38" y="25" width="4" height="8" fill="#9CA3AF" />
      </>
    )}
  </svg>
);

export default function LevelTimeline() {
  return (
    <div className="bg-white rounded-3xl p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-neutral-900">Your Level</h2>
        <div className="flex gap-2">
          <button className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <button className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between relative">
        <div className="absolute top-8 left-12 right-12 h-0.5 bg-emerald-500 border-t-2 border-dashed opacity-60" />
        
        {levels.map((item) => (
          <div key={item.level} className="flex flex-col items-center z-10">
            <div className={`w-24 h-20 rounded-2xl flex items-center justify-center ${item.bgColor}`}>
              <TreasureChest3D type={item.chestType as 'gems' | 'coins' | 'closed'} />
            </div>
            <p className="text-sm font-bold text-neutral-900 mt-2">Lv. {item.level}</p>
            <span className={`${item.xpBg} text-white text-xs font-semibold px-3 py-1 rounded-full mt-1`}>
              {item.xp}
            </span>
            {item.status === 'check' ? (
              <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center mt-1">
                <Check className="w-4 h-4 text-white" />
              </div>
            ) : item.status === 'claim' ? (
              <button className="bg-warning text-white text-sm font-semibold px-4 py-2 rounded-full mt-1">
                Claim
              </button>
            ) : (
              <div className="w-6 h-6 bg-neutral-200 rounded-full flex items-center justify-center mt-1">
                <Lock className="w-3 h-3 text-neutral-500" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}