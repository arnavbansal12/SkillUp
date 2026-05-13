"use client";

import Image from "next/image";
import { Trophy, Medal, Swords } from "lucide-react";
import Button from "@/components/ui/Button";

interface LeaderboardRowProps {
  rank: number;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  isCurrentUser?: boolean;
  onChallenge?: () => void;
}

export default function LeaderboardRow({ rank, name, avatar, level, xp, isCurrentUser = false, onChallenge }: LeaderboardRowProps) {
  const getRankIcon = () => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-neutral-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return <span className="text-sm font-bold text-neutral-400">#{rank}</span>;
  };

  return (
    <div className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
      isCurrentUser 
        ? "bg-primary-50 border-2 border-primary-500" 
        : "bg-white card-shadow hover:shadow-md"
    }`}>
      <div className="w-12 flex items-center justify-center">
        {getRankIcon()}
      </div>
      
      <div className="w-12 h-12 rounded-full overflow-hidden bg-primary-100 flex-shrink-0">
        <Image src={avatar} alt={name} width={48} height={48} className="w-full h-full object-cover" />
      </div>
      
      <div className="flex-1">
        <p className="font-semibold text-neutral-900">
          {name}
          {isCurrentUser && <span className="ml-2 text-xs text-primary-600 font-medium">(You)</span>}
        </p>
        <p className="text-sm text-neutral-400">Level {level}</p>
      </div>
      
      <div className="text-right">
        <p className="font-bold text-neutral-900">{xp.toLocaleString()}</p>
        <p className="text-xs text-neutral-400">XP</p>
      </div>
      
      {!isCurrentUser && (
        <Button variant="ghost" size="sm" onClick={onChallenge}>
          <Swords className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}