"use client";

import { useGame } from "@/lib/GameContext";
import { LEADERBOARD_DATA } from "@/lib/real-data";
import {
  Trophy, Medal, Crown, Star, Flame
} from "lucide-react";

export default function LeaderboardPage() {
  const { state } = useGame();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Medal className="w-5 h-5 text-amber-600" />;
      default: return <span className="text-sm font-bold text-neutral-400">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1: return "bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 shadow-lg shadow-yellow-100";
      case 2: return "bg-gradient-to-r from-gray-50 to-slate-50 border-2 border-gray-200";
      case 3: return "bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200";
      default: return "bg-white border-2 border-transparent";
    }
  };

  const getAvatarGradient = (rank: number) => {
    switch (rank) {
      case 1: return "from-yellow-400 to-orange-500";
      case 2: return "from-gray-300 to-gray-500";
      case 3: return "from-amber-400 to-amber-600";
      default: return "from-primary-400 to-primary-600";
    }
  };

  // Update current user's data with real state
  const leaderboard = LEADERBOARD_DATA.map(entry =>
    entry.isCurrentUser
      ? { ...entry, xp: state.xp, level: state.level, streak: state.streak, name: state.userName || entry.name }
      : entry
  ).sort((a, b) => b.xp - a.xp).map((entry, idx) => ({ ...entry, rank: idx + 1 }));

  return (
    <div className="pb-6">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500 rounded-3xl p-7 mb-6 overflow-hidden slide-up">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3 orb-1" />
        <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 orb-2" />

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-8 h-8 text-white" />
              <h1 className="text-3xl font-bold text-white">Leaderboard</h1>
            </div>
            <p className="text-amber-100">See how you rank among fellow learners</p>
          </div>
          <div className="text-right">
            <p className="text-amber-100 text-sm">Your Rank</p>
            <p className="text-4xl font-bold text-white count-up">
              #{leaderboard.find(e => e.isCurrentUser)?.rank || "-"}
            </p>
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4 mb-6 slide-up slide-up-delay-1">
        {[leaderboard[1], leaderboard[0], leaderboard[2]].filter(Boolean).map((entry, idx) => {
          const podiumOrder = [2, 1, 3];
          const heights = ["h-24", "h-32", "h-20"];
          return (
            <div key={entry.rank} className="flex flex-col items-center">
              <div className={`w-14 h-14 bg-gradient-to-br ${getAvatarGradient(podiumOrder[idx])} rounded-2xl flex items-center justify-center text-lg font-bold text-white mb-2 ${
                podiumOrder[idx] === 1 ? "ring-4 ring-yellow-200 shadow-lg animate-float" : ""
              }`}>
                {entry.avatar}
              </div>
              <p className="text-sm font-bold text-neutral-900 truncate max-w-full">{entry.name}</p>
              <p className="text-xs text-neutral-500">{entry.xp.toLocaleString()} XP</p>
              <div className={`w-full ${heights[idx]} bg-gradient-to-t rounded-t-2xl mt-2 flex items-start justify-center pt-2 ${
                podiumOrder[idx] === 1 ? "from-yellow-400/20 to-yellow-100/5" :
                podiumOrder[idx] === 2 ? "from-gray-300/20 to-gray-100/5" :
                "from-amber-400/20 to-amber-100/5"
              }`}>
                {getRankIcon(podiumOrder[idx])}
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Leaderboard */}
      <div className="bg-white rounded-3xl card-shadow overflow-hidden slide-up slide-up-delay-2">
        <div className="p-5 border-b border-neutral-100">
          <div className="grid grid-cols-12 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            <div className="col-span-1">Rank</div>
            <div className="col-span-5">Player</div>
            <div className="col-span-2 text-center">Level</div>
            <div className="col-span-2 text-center">Streak</div>
            <div className="col-span-2 text-right">XP</div>
          </div>
        </div>
        <div>
          {leaderboard.map((entry, idx) => (
            <div
              key={entry.name}
              className={`stagger-item grid grid-cols-12 items-center p-4 transition-all hover:bg-neutral-50 ${
                entry.isCurrentUser ? "bg-primary-50/50 border-l-4 border-primary-500" : "border-l-4 border-transparent"
              } ${idx < leaderboard.length - 1 ? "border-b border-neutral-50" : ""}`}
              style={{ animationDelay: `${0.3 + idx * 0.06}s` }}
            >
              <div className="col-span-1 flex items-center">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  entry.rank <= 3 ? getRankBg(entry.rank).split(" ")[0] : "bg-neutral-50"
                }`}>
                  {getRankIcon(entry.rank)}
                </div>
              </div>
              <div className="col-span-5 flex items-center gap-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${getAvatarGradient(entry.rank)} rounded-xl flex items-center justify-center text-sm font-bold text-white`}>
                  {entry.avatar}
                </div>
                <div>
                  <p className={`font-semibold text-sm ${entry.isCurrentUser ? "text-primary-700" : "text-neutral-900"}`}>
                    {entry.name} {entry.isCurrentUser && <span className="text-xs text-primary-500">(You)</span>}
                  </p>
                </div>
              </div>
              <div className="col-span-2 text-center">
                <span className="text-sm font-medium text-neutral-600 flex items-center justify-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500" /> {entry.level}
                </span>
              </div>
              <div className="col-span-2 text-center">
                <span className="text-sm font-medium text-neutral-600 flex items-center justify-center gap-1">
                  <Flame className="w-3 h-3 text-orange-500" /> {entry.streak}d
                </span>
              </div>
              <div className="col-span-2 text-right">
                <span className={`text-sm font-bold ${entry.isCurrentUser ? "text-primary-600" : "text-neutral-900"}`}>
                  {entry.xp.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
