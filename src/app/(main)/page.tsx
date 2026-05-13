"use client";

import { motion } from "framer-motion";
import { useGame } from "@/lib/GameContext";
import { COURSES, MISSIONS, ACHIEVEMENTS } from "@/lib/real-data";
import Link from "next/link";
import {
  Flame, Star, Zap, Trophy, BookOpen, Target, ChevronRight,
  Clock, ArrowUpRight, Play,
  CheckCircle2, Shield,
  ArrowRight
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring" as const, 
      stiffness: 100, 
      damping: 12 
    }
  }
};

export default function DashboardPage() {
  const { state } = useGame();
  const [greeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  });

  const completedCourses = (state.completedCourses || []).length;
  const completedMissions = (state.completedMissions || []).length;
  const unlockedAchievements = ACHIEVEMENTS.filter(a => a.progress >= a.total).length;
  const xpForNextLevel = 1000;
  const xpProgress = state.xp % xpForNextLevel;
  const xpPercent = (xpProgress / xpForNextLevel) * 100;

  const recentCourses = COURSES.slice(0, 3);
  const recentMissions = MISSIONS.filter(m => !(state.completedMissions || []).includes(m.id)).slice(0, 3);

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10 pb-12"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-[10px] font-black uppercase tracking-widest">Dashboard Overview</span>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
          </div>
          <h1 className="text-4xl font-black text-neutral-900 tracking-tight">
            {greeting}, <span className="text-primary-600">{state.userName || "Joshua"}</span>
          </h1>
          <p className="text-neutral-500 font-medium mt-2">You&apos;re making incredible progress this week. Keep the momentum!</p>
        </div>
        
        <div 
          onClick={() => alert("Join your study group in the Community tab!")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="flex -space-x-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-neutral-100 flex items-center justify-center overflow-hidden shadow-sm relative">
                <Image 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}&backgroundColor=b6e3f4,c0aede,d1d4f9`} 
                  alt="User avatar" 
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-white bg-primary-600 flex items-center justify-center text-white text-[10px] font-bold shadow-sm relative z-10">
              +12
            </div>
          </div>
          <span className="text-xs font-bold text-neutral-400 group-hover:text-primary-600 transition-colors">Study Group Active</span>
        </div>
      </motion.div>

      {/* Hero / Main Stats Card */}
      <motion.div variants={itemVariants} className="relative group">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-600 via-indigo-600 to-purple-600 rounded-[2.5rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-700" />
        <div className="relative bg-neutral-900 rounded-[2.5rem] p-8 md:p-10 overflow-hidden shadow-2xl">
          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full translate-y-1/2 blur-3xl" />
          
          <div className="relative z-10 grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Mastery Status: Advanced</span>
              </div>
              
              <div>
                <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                  Reach Level {state.level + 1} <br/>
                  <span className="text-neutral-500 italic">this weekend.</span>
                </h2>
                <p className="text-neutral-400 mt-4 text-lg font-medium max-w-md">
                  Complete 2 more lessons to unlock your next milestone and gain exclusive badges.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/courses">
                  <button className="px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-2xl font-bold shadow-lg shadow-primary-900/40 transition-all active:scale-95 flex items-center gap-2">
                    Start Learning <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/missions">
                  <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-bold backdrop-blur-md transition-all active:scale-95">
                    View Missions
                  </button>
                </Link>
              </div>
            </div>
            
            <div className="md:col-span-5">
              <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-neutral-400 text-xs font-black uppercase tracking-widest mb-1">Current Progress</p>
                    <p className="text-2xl font-black text-white">Level {state.level}</p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-tr from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20 rotate-3 group-hover:rotate-6 transition-transform duration-500">
                    <Star className="w-8 h-8 text-white fill-white" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-neutral-300 text-sm font-bold">{state.xp.toLocaleString()} XP Total</span>
                    <span className="text-primary-400 text-xs font-black">{Math.round(xpPercent)}%</span>
                  </div>
                  <div className="h-4 bg-white/5 rounded-full overflow-hidden p-[2px] border border-white/5 shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${xpPercent}%` }}
                      transition={{ duration: 2, ease: [0.34, 1.56, 0.64, 1] }}
                      className="h-full bg-gradient-to-r from-primary-500 via-indigo-500 to-purple-500 rounded-full relative"
                    >
                      <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]" />
                    </motion.div>
                  </div>
                  <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-tighter text-center pt-1">
                    {xpForNextLevel - xpProgress} XP Remaining for Level {state.level + 1}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: Flame, label: "Daily Streak", value: `${state.streak} Days`, color: "bg-orange-500", shadow: "shadow-orange-200" },
          { icon: BookOpen, label: "Courses Done", value: `${completedCourses}/${COURSES.length}`, color: "bg-blue-500", shadow: "shadow-blue-200" },
          { icon: Target, label: "Missions", value: `${completedMissions}/${MISSIONS.length}`, color: "bg-emerald-500", shadow: "shadow-emerald-200" },
          { icon: Trophy, label: "Achievements", value: `${unlockedAchievements}/${ACHIEVEMENTS.length}`, color: "bg-purple-500", shadow: "shadow-purple-200" },
        ].map((stat) => (
          <motion.div 
            key={stat.label}
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-white rounded-[2rem] p-6 shadow-xl shadow-neutral-200/40 border border-neutral-100/80 group cursor-default"
          >
            <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg ${stat.shadow} group-hover:rotate-12 transition-transform duration-500`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-3xl font-black text-neutral-900 tracking-tight">{stat.value}</p>
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Learning & Missions */}
        <div className="lg:col-span-8 space-y-8">
          {/* Continue Learning Section */}
          <motion.div variants={itemVariants} className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-neutral-200/30 border border-neutral-100">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Play className="w-5 h-5 text-primary-600 fill-primary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-neutral-900 tracking-tight">Continue Learning</h3>
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Your in-progress paths</p>
                </div>
              </div>
              <Link href="/courses" className="p-2 hover:bg-neutral-50 rounded-xl transition-colors group">
                <ArrowUpRight className="w-6 h-6 text-neutral-400 group-hover:text-primary-600 transition-colors" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentCourses.map((course) => {
                const isCompleted = (state.completedCourses || []).includes(course.id);
                return (
                  <Link key={course.id} href={`/courses?id=${course.id}`}>
                    <div className="flex items-center gap-6 p-4 rounded-3xl hover:bg-neutral-50 transition-all border border-transparent hover:border-neutral-100 group">
                      <div className="w-32 h-20 rounded-2xl overflow-hidden bg-neutral-200 flex-shrink-0 relative">
                        <Image 
                          src={`https://img.youtube.com/vi/${course.videoId}/mqdefault.jpg`} 
                          alt={course.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {isCompleted && (
                          <div className="absolute inset-0 bg-emerald-500/80 flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6 text-white" />
                          </div>
                        )}
                        {!isCompleted && (
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Play className="w-8 h-8 text-white fill-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-neutral-900 text-lg leading-tight group-hover:text-primary-600 transition-colors truncate">
                          {course.title}
                        </h4>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
                            <Clock className="w-3 h-3" /> {course.duration}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-neutral-300" />
                          <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">{course.lessons.length} Lessons</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center group-hover:border-primary-500 group-hover:text-primary-600 transition-all">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* Active Missions */}
          <motion.div variants={itemVariants} className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-neutral-200/30 border border-neutral-100">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-neutral-900 tracking-tight">Active Missions</h3>
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Daily challenges</p>
                </div>
              </div>
              <Link href="/missions" className="text-sm font-black text-primary-600 hover:text-primary-700 transition-colors px-4 py-2 bg-primary-50 rounded-xl">
                See All
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {recentMissions.map((mission) => (
                <div key={mission.id} className="p-6 rounded-3xl bg-neutral-50 border border-neutral-100/50 hover:bg-white hover:shadow-xl hover:shadow-neutral-200/40 transition-all group cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      mission.difficulty === "Beginner" ? "bg-emerald-100 text-emerald-600" :
                      mission.difficulty === "Intermediate" ? "bg-amber-100 text-amber-600" :
                      "bg-rose-100 text-rose-600"
                    }`}>
                      <Zap className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black text-primary-600 uppercase tracking-tighter bg-primary-50 px-2 py-1 rounded-lg">
                      +{mission.xpReward} XP
                    </span>
                  </div>
                  <h4 className="font-bold text-neutral-900 group-hover:text-primary-600 transition-colors mb-1">{mission.title}</h4>
                  <p className="text-xs font-medium text-neutral-400">{mission.skill} • {mission.difficulty}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Achievements & Friends */}
        <div className="lg:col-span-4 space-y-8">
          <motion.div variants={itemVariants} className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-neutral-200/30 border border-neutral-100 h-full">
            <h3 className="text-xl font-black text-neutral-900 tracking-tight mb-8">Achievements</h3>
            <div className="space-y-6">
              {ACHIEVEMENTS.slice(0, 4).map((achievement) => {
                const isUnlocked = achievement.progress >= achievement.total;
                const pct = Math.min(100, (achievement.progress / achievement.total) * 100);
                return (
                  <div key={achievement.id} className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className={`text-2xl w-12 h-12 flex items-center justify-center rounded-2xl ${isUnlocked ? 'bg-amber-100 border border-amber-200 shadow-sm shadow-amber-100' : 'bg-neutral-100 grayscale opacity-40'}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-bold text-sm ${isUnlocked ? 'text-amber-800' : 'text-neutral-600'}`}>{achievement.name}</p>
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{achievement.progress}/{achievement.total} progress</p>
                      </div>
                    </div>
                    <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 1.5, delay: 1 }}
                        className={`h-full rounded-full ${isUnlocked ? 'bg-gradient-to-r from-amber-400 to-orange-500' : 'bg-primary-500'}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            
            <Link href="/achievements" className="block mt-10">
              <button className="w-full py-4 bg-neutral-50 hover:bg-neutral-100 text-neutral-600 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2">
                View All Achievements <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
