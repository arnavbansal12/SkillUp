"use client";

import { ReactNode } from "react";
import Badge from "@/components/ui/Badge";

interface AchievementBadgeProps {
  title: string;
  icon: ReactNode;
  unlocked: boolean;
}

export default function AchievementBadge({ title, icon, unlocked }: AchievementBadgeProps) {
  return (
    <div className={`p-4 rounded-2xl text-center transition-all ${
      unlocked 
        ? "bg-gradient-to-br from-primary-50 to-primary-100" 
        : "bg-neutral-100 opacity-60"
    }`}>
      <div className={`w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center ${
        unlocked ? "bg-primary-500 text-white" : "bg-neutral-200 text-neutral-400"
      }`}>
        {icon}
      </div>
      <p className={`font-semibold text-sm ${unlocked ? "text-neutral-900" : "text-neutral-400"}`}>
        {title}
      </p>
      {unlocked && (
        <Badge variant="success" className="mt-2">Unlocked</Badge>
      )}
      {!unlocked && (
        <Badge variant="neutral" className="mt-2">Locked</Badge>
      )}
    </div>
  );
}