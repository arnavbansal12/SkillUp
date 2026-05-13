"use client";

import { useState } from "react";
import { useGame } from "@/lib/GameContext";
import { MISSIONS } from "@/lib/real-data";
import {
  Target, CheckCircle2, Clock, Search,
  ArrowLeft, Sparkles, Eye, Brain,
  Users, Monitor, BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type MissionType = typeof MISSIONS[0];

export default function MissionsPage() {
  const { state, dispatch } = useGame();
  const [selectedMission, setSelectedMission] = useState<MissionType | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [skillFilter, setSkillFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [showCompleted, setShowCompleted] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  const completedMissions = state.completedMissions || [];

  const skills = ["All", ...Array.from(new Set(MISSIONS.map(m => m.skill)))];
  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredMissions = MISSIONS.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkill = skillFilter === "All" || m.skill === skillFilter;
    const matchesDifficulty = difficultyFilter === "All" || m.difficulty === difficultyFilter;
    const matchesCompleted = showCompleted || !completedMissions.includes(m.id);
    return matchesSearch && matchesSkill && matchesDifficulty && matchesCompleted;
  });

  const handleComplete = (missionId: string, xpReward: number) => {
    if (!completedMissions.includes(missionId)) {
      dispatch({ type: "COMPLETE_MISSION", payload: missionId });
      dispatch({ type: "ADD_XP", payload: xpReward });
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "Beginner": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Intermediate": return "bg-amber-100 text-amber-700 border-amber-200";
      case "Advanced": return "bg-rose-100 text-rose-700 border-rose-200";
      default: return "bg-neutral-100 text-neutral-600";
    }
  };

  const getTypeIcon = (type: string, className = "w-6 h-6") => {
    switch (type) {
      case "real-world": return <Users className={className} />;
      case "practice": return <Target className={className} />;
      case "visual": return <Eye className={className} />;
      case "digital": return <Monitor className={className} />;
      case "research": return <BookOpen className={className} />;
      default: return <Brain className={className} />;
    }
  };

  // === MISSION DETAIL VIEW ===
  if (selectedMission) {
    const isCompleted = completedMissions.includes(selectedMission.id);

    return (
      <div className="pb-6 slide-up relative">
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
            {Array.from({ length: 50 }).map((_, i) => {
              // Pseudo-random values based on index to ensure pure render
              const r1 = Math.sin(i) * 10000;
              const random1 = r1 - Math.floor(r1);
              const r2 = Math.cos(i) * 10000;
              const random2 = r2 - Math.floor(r2);
              const r3 = Math.tan(i) * 10000;
              const random3 = Math.abs(r3 - Math.floor(r3));

              const colors = ["bg-primary-500", "bg-emerald-500", "bg-yellow-500", "bg-rose-500"];
              const color = colors[Math.floor(random3 * 4)];

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: 0,
                    scale: random1 * 1.5 + 0.5,
                    x: (random2 - 0.5) * 500,
                    y: (random1 - 0.5) * 500,
                  }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className={`absolute w-3 h-3 rounded-full ${color}`}
                />
              );
            })}
          </div>
        )}

        <button
          onClick={() => setSelectedMission(null)}
          className="flex items-center gap-2 text-neutral-500 hover:text-primary-600 mb-6 group transition-colors"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Quests</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player & Instructions */}
          <div className="lg:col-span-2 slide-up slide-up-delay-1 space-y-6">
            <div className="bg-black rounded-[2.5rem] overflow-hidden shadow-2xl relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  key={selectedMission.videoId}
                  src={`https://www.youtube.com/embed/${selectedMission.videoId}?rel=0&modestbranding=1`}
                  title={selectedMission.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ border: 'none' }}
                />
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-neutral-200/30 border border-neutral-100">
              <h3 className="font-black text-xl text-neutral-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                Mission Instructions
              </h3>
              <div className="space-y-4">
                {selectedMission.instructions.map((step, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    key={idx} 
                    className="flex items-start gap-4 p-4 rounded-2xl hover:bg-neutral-50 border border-transparent hover:border-neutral-100 transition-all group"
                  >
                    <div className="w-8 h-8 bg-neutral-100 text-neutral-500 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 group-hover:bg-primary-500 group-hover:text-white transition-colors shadow-sm">
                      {idx + 1}
                    </div>
                    <p className="text-neutral-700 leading-relaxed pt-1 font-medium">{step}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mission Info Sidebar */}
          <div className="slide-up slide-up-delay-2">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-neutral-200/30 border border-neutral-100 sticky top-6">
              <div className="mb-6 pb-6 border-b border-neutral-100">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg border ${getDifficultyColor(selectedMission.difficulty)}`}>
                    {selectedMission.difficulty}
                  </span>
                  <span className="px-3 py-1 bg-neutral-100 text-neutral-600 text-[10px] font-black uppercase tracking-widest rounded-lg">
                    {selectedMission.type.replace("-", " ")}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-neutral-900 mb-3 leading-tight">{selectedMission.title}</h2>
                <p className="text-sm text-neutral-500 leading-relaxed">{selectedMission.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-neutral-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Brain className="w-5 h-5 text-neutral-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-0.5">Target Skill</p>
                    <p className="font-bold text-neutral-900">{selectedMission.skill}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-neutral-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-neutral-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-0.5">Time Estimate</p>
                    <p className="font-bold text-neutral-900">{selectedMission.timeEstimate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-yellow-600/70 uppercase tracking-widest mb-0.5">Reward</p>
                    <p className="font-black text-yellow-600 text-lg">+{selectedMission.xpReward} XP</p>
                  </div>
                </div>
              </div>

              {isCompleted ? (
                <div className="w-full py-4 bg-emerald-50 text-emerald-700 rounded-2xl font-bold text-center flex items-center justify-center gap-2 border-2 border-emerald-200">
                  <CheckCircle2 className="w-5 h-5" />
                  Quest Completed!
                </div>
              ) : (
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleComplete(selectedMission.id, selectedMission.xpReward)}
                    className="w-full py-4 bg-primary-600 text-white rounded-2xl font-black uppercase tracking-wider hover:bg-primary-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary-600/20"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Claim Reward
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === MISSION LIST VIEW ===
  return (
    <div className="pb-6">
      {/* Header */}
      <div className="mb-8 slide-up flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-black text-neutral-900 tracking-tight">Quests</h1>
          </div>
          <p className="text-neutral-500 ml-[60px] font-medium">Complete challenges to earn XP and master your skills</p>
        </div>
        
        {/* Quick Stats Mini-Board */}
        <div className="flex gap-4 p-2 bg-white rounded-2xl shadow-sm border border-neutral-100">
          <div className="px-4 py-2 text-center border-r border-neutral-100">
            <p className="text-2xl font-black text-emerald-600">{completedMissions.length}</p>
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Completed</p>
          </div>
          <div className="px-4 py-2 text-center">
            <p className="text-2xl font-black text-yellow-500">{MISSIONS.reduce((s, m) => completedMissions.includes(m.id) ? s + m.xpReward : s, 0)}</p>
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Total XP</p>
          </div>
        </div>
      </div>

      {/* Modern Search & Filters */}
      <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-neutral-200/30 border border-neutral-100 mb-8 slide-up slide-up-delay-1">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-primary-500 transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find your next quest..."
              className="w-full pl-14 pr-4 py-4 bg-neutral-50 rounded-2xl border-2 border-transparent focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none transition-all font-medium text-neutral-900 placeholder:text-neutral-400"
            />
          </div>
          
          <div className="flex flex-wrap gap-3 items-center">
            <div className="h-10 w-px bg-neutral-200 hidden lg:block mx-2" />
            
            <button
              onClick={() => setShowCompleted(!showCompleted)}
              className={`px-5 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 ${
                showCompleted
                  ? "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  : "bg-primary-600 text-white shadow-lg shadow-primary-600/20"
              }`}
            >
              <Eye className="w-4 h-4" />
              {showCompleted ? "Hide Completed" : "Show All"}
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-3">Filter by Skill</p>
            <div className="flex gap-2 flex-wrap">
              {skills.map(s => (
                <button
                  key={s}
                  onClick={() => setSkillFilter(s)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    skillFilter === s
                      ? "bg-neutral-900 text-white shadow-md"
                      : "bg-neutral-50 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-3">Difficulty</p>
            <div className="flex gap-2">
              {difficulties.map(d => (
                <button
                  key={d}
                  onClick={() => setDifficultyFilter(d)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    difficultyFilter === d
                      ? "bg-primary-600 text-white shadow-lg shadow-primary-600/20"
                      : "bg-neutral-50 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quest Cards Grid */}
      {filteredMissions.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] p-16 shadow-xl shadow-neutral-200/30 text-center border border-neutral-100">
          <div className="w-24 h-24 bg-neutral-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Target className="w-12 h-12 text-neutral-300" />
          </div>
          <h3 className="text-2xl font-black text-neutral-900 mb-2">No quests found</h3>
          <p className="text-neutral-500 font-medium">Try adjusting your filters to find new challenges</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredMissions.map((mission, idx) => {
              const isCompleted = completedMissions.includes(mission.id);

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.05 }}
                  key={mission.id}
                  className={`bg-white rounded-[2rem] p-6 shadow-xl shadow-neutral-200/30 hover:-translate-y-2 cursor-pointer group relative overflow-hidden transition-all duration-300 border-2 ${
                    isCompleted ? "border-emerald-100" : "border-transparent hover:border-primary-100"
                  }`}
                  onClick={() => setSelectedMission(mission)}
                >
                  {/* Background decoration */}
                  <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-colors duration-500 ${
                    isCompleted ? "bg-emerald-500/10" : "bg-primary-500/10 group-hover:bg-primary-500/20"
                  }`} />

                  {/* Completed Badge */}
                  {isCompleted && (
                    <div className="absolute top-5 right-5 bg-emerald-500 text-white p-2 rounded-xl shadow-sm z-10">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}

                  <div className="flex flex-col h-full relative z-10">
                    <div className="flex items-start gap-4 mb-4">
                      {/* Icon */}
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all shadow-inner ${
                        isCompleted
                          ? "bg-emerald-100 text-emerald-600"
                          : mission.difficulty === "Beginner" ? "bg-emerald-50 text-emerald-600"
                          : mission.difficulty === "Intermediate" ? "bg-amber-50 text-amber-600"
                          : "bg-rose-50 text-rose-600"
                      }`}>
                        {getTypeIcon(mission.type, "w-6 h-6")}
                      </div>

                      <div className="flex-1 min-w-0 pr-6">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md border ${getDifficultyColor(mission.difficulty)}`}>
                            {mission.difficulty}
                          </span>
                        </div>
                        <h3 className={`font-black text-lg leading-tight group-hover:text-primary-600 transition-colors ${
                          isCompleted ? "text-emerald-900" : "text-neutral-900"
                        }`}>
                          {mission.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-sm text-neutral-500 leading-relaxed mb-6 flex-1">{mission.description}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-neutral-400 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" /> {mission.timeEstimate}
                        </span>
                      </div>
                      
                      <span className={`text-sm font-black flex items-center gap-1.5 ${
                        isCompleted ? "text-emerald-600" : "text-yellow-600 bg-yellow-50 px-3 py-1.5 rounded-xl"
                      }`}>
                        {isCompleted ? "Claimed" : `+${mission.xpReward} XP`}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
