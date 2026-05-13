"use client";

import { useState, useMemo } from "react";
import { useGame } from "@/lib/GameContext";
import { ACHIEVEMENTS } from "@/lib/real-data";
import { getAchievementProgress } from "@/lib/achievements";
import {
  Trophy, Lock, CheckCircle2, Star,
  Zap, Search, ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AchievementsPage() {
  const { state } = useGame();
  const [filter, setFilter] = useState<"all" | "unlocked" | "locked">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const achievements = useMemo(
    () =>
      getAchievementProgress({
        xp: state.xp,
        streak: state.streak,
        completedCourses: state.completedCourses,
        completedMissions: state.completedMissions,
      }),
    [state.xp, state.streak, state.completedCourses, state.completedMissions]
  );

  const stats = useMemo(() => {
    const unlocked = achievements.filter((a) => a.unlocked);
    return {
      unlockedCount: unlocked.length,
      totalXp: unlocked.reduce((sum, a) => sum + a.xp, 0),
      completionRate: Math.round((unlocked.length / ACHIEVEMENTS.length) * 100),
      nextMilestone: achievements.find((a) => !a.unlocked)
    };
  }, [achievements]);

  const filteredAchievements = achievements.filter(a => {
    const matchesFilter = 
      filter === "all" || 
      (filter === "unlocked" && a.unlocked) || 
      (filter === "locked" && !a.unlocked);
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100
      }
    }
  };
  return (
    <div className="pb-20">
      {/* Premium Header Section */}
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 rounded-[3rem] blur-3xl -z-10" />
        
        <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between p-2">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex-1"
          >
            <div className="inline-flex items-center gap-2 bg-primary-100/50 text-primary-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-primary-200/50 backdrop-blur-md">
              <ShieldCheck className="w-4 h-4" />
              Prestige System v2.0
            </div>
            <h1 className="text-5xl font-black text-neutral-900 tracking-tight mb-4 flex items-center gap-4">
              Legacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Achievements</span>
            </h1>
            <p className="text-neutral-500 text-lg max-w-xl font-medium leading-relaxed">
              Your journey to communication mastery is memorialized here. Each badge represents a milestone in your professional evolution.
            </p>
          </motion.div>

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full lg:w-auto flex gap-4"
          >
            <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white shadow-2xl shadow-primary-500/10 flex flex-col items-center justify-center min-w-[140px]">
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mb-3">
                <Trophy className="w-6 h-6 text-amber-600" />
              </div>
              <span className="text-3xl font-black text-neutral-900 leading-none mb-1">{stats.unlockedCount}</span>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Badges</span>
            </div>
            <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white shadow-2xl shadow-indigo-500/10 flex flex-col items-center justify-center min-w-[140px]">
              <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center mb-3">
                <Zap className="w-6 h-6 text-indigo-600" />
              </div>
              <span className="text-3xl font-black text-neutral-900 leading-none mb-1">{stats.totalXp.toLocaleString()}</span>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Bonus XP</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between relative z-20">
        <div className="flex bg-white/60 backdrop-blur-xl p-1.5 rounded-[1.5rem] border border-white/50 shadow-sm w-full md:w-auto overflow-x-auto no-scrollbar">
          {(["all", "unlocked", "locked"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 capitalize whitespace-nowrap ${
                filter === f
                  ? "bg-neutral-900 text-white shadow-lg"
                  : "text-neutral-500 hover:text-neutral-900 hover:bg-white/50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-primary-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search milestones..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/60 backdrop-blur-xl border border-white/50 rounded-[1.5rem] py-3 pl-12 pr-4 text-sm font-medium outline-none focus:ring-2 focus:ring-primary-500/20 focus:bg-white transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Achievements Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredAchievements.map((achievement) => {
            const isUnlocked = achievement.unlocked;
            const progressPct = Math.min(100, (achievement.progress / achievement.total) * 100);

            return (
              <motion.div
                layout
                key={achievement.id}
                variants={itemVariants}
                exit={{ scale: 0.8, opacity: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`relative group h-full ${!isUnlocked && "grayscale-[0.5] opacity-80"}`}
              >
                {/* 3D Reflection Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 rounded-[2.5rem] -z-10 blur-sm group-hover:blur-md transition-all duration-500" />
                
                <div className={`h-full bg-white/80 backdrop-blur-xl rounded-[2.5rem] border-2 p-8 shadow-xl transition-all duration-500 flex flex-col ${
                  isUnlocked 
                    ? "border-amber-200 shadow-amber-500/5 group-hover:border-amber-400 group-hover:shadow-amber-500/10" 
                    : "border-white/50 shadow-neutral-500/5 group-hover:border-white group-hover:shadow-neutral-500/10"
                }`}>
                  {/* Badge Icon */}
                  <div className="relative mx-auto mb-8">
                    <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center text-4xl relative z-10 overflow-hidden ${
                      isUnlocked 
                        ? "bg-gradient-to-br from-amber-400 to-orange-600 shadow-xl shadow-amber-200" 
                        : "bg-neutral-100 text-neutral-400"
                    }`}>
                      {isUnlocked && (
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] opacity-30 animate-pulse" />
                      )}
                      <span className="relative z-10 group-hover:scale-110 transition-transform duration-500">
                        {achievement.icon}
                      </span>
                    </div>
                    
                    {/* Achievement Ring */}
                    <svg className="absolute -inset-2 w-[calc(100%+1rem)] h-[calc(100%+1rem)] -rotate-90">
                      <circle
                        cx="52"
                        cy="52"
                        r="50"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="transparent"
                        className="text-neutral-100"
                      />
                      <motion.circle
                        cx="52"
                        cy="52"
                        r="50"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="transparent"
                        initial={{ strokeDasharray: "314.159", strokeDashoffset: "314.159" }}
                        animate={{ strokeDashoffset: 314.159 - (314.159 * progressPct) / 100 }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                        className={isUnlocked ? "text-amber-500" : "text-primary-500"}
                      />
                    </svg>
                  </div>

                  <div className="text-center flex-1">
                    <h3 className="text-xl font-black text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {achievement.name}
                    </h3>
                    <p className="text-sm font-medium text-neutral-500 leading-relaxed mb-6 px-2">
                      {achievement.description}
                    </p>
                  </div>

                  {/* Progress Section */}
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-2 px-1">
                      <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                        {isUnlocked ? "Completed" : "In Progress"}
                      </span>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${isUnlocked ? "text-amber-600" : "text-primary-600"}`}>
                        {achievement.progress}/{achievement.total}
                      </span>
                    </div>
                    
                    <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden p-[1px]">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPct}%` }}
                        transition={{ duration: 1, ease: "circOut" }}
                        className={`h-full rounded-full ${
                          isUnlocked 
                            ? "bg-gradient-to-r from-amber-400 to-orange-500" 
                            : "bg-gradient-to-r from-primary-400 to-primary-600"
                        }`}
                      />
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-black text-neutral-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {achievement.xp} XP
                      </div>
                      {isUnlocked && (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="bg-emerald-500 text-white p-1 rounded-full shadow-lg shadow-emerald-200"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Locked Overlay */}
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <div className="bg-white shadow-2xl rounded-2xl p-4 border border-neutral-100 flex items-center gap-3">
                        <Lock className="w-5 h-5 text-neutral-400" />
                        <span className="text-sm font-bold text-neutral-900">Locked Milestone</span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredAchievements.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/60 backdrop-blur-xl rounded-[3rem] p-20 text-center border border-white shadow-xl"
        >
          <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <Search className="w-10 h-10 text-neutral-300" />
          </div>
          <h2 className="text-2xl font-black text-neutral-900 mb-2">No milestones found</h2>
          <p className="text-neutral-500 font-medium">Try adjusting your filters or search terms.</p>
          <button 
            onClick={() => { setFilter("all"); setSearchQuery(""); }}
            className="mt-8 px-8 py-3 bg-neutral-900 text-white rounded-2xl font-bold hover:shadow-2xl transition-all"
          >
            Reset Filters
          </button>
        </motion.div>
      )}

      {/* Completion Progress Footer */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-20 bg-neutral-900 rounded-[3rem] p-10 relative overflow-hidden group shadow-2xl shadow-neutral-900/20"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black text-white mb-2">Completion Progress</h2>
            <p className="text-neutral-400 font-medium max-w-md">
              You&apos;re <span className="text-primary-400">{stats.completionRate}%</span> through your collection. Unlock the remaining {ACHIEVEMENTS.length - stats.unlockedCount} badges to become a Grandmaster.
            </p>
          </div>
          
          <div className="flex-1 w-full max-w-lg">
            <div className="flex justify-between mb-4">
              <span className="text-white font-bold">{stats.unlockedCount} / {ACHIEVEMENTS.length} Badges</span>
              <span className="text-primary-400 font-black">{stats.completionRate}%</span>
            </div>
            <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden p-1 border border-white/10">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${stats.completionRate}%` }}
                transition={{ duration: 2, ease: "circOut" }}
                className="h-full bg-gradient-to-r from-primary-500 via-indigo-500 to-purple-500 rounded-full"
              />
            </div>
          </div>

          <button className="bg-white text-neutral-900 px-8 py-4 rounded-2xl font-black hover:scale-105 transition-all shadow-xl">
            Claim Rewards
          </button>
        </div>
      </motion.div>
    </div>
  );
}
