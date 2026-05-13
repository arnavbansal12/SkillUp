"use client";

import { useState } from "react";
import { useGame } from "@/lib/GameContext";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Flame,
  Star,
  Target,
  Zap,
  Bell,
  BookOpen as BookOpenIcon
} from "lucide-react";
import Link from "next/link";

export default function RightPanel() {
  const { state } = useGame();
  const [currentDate, setCurrentDate] = useState(new Date());

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<number | null>(today.getDate());
  const [showEventFor, setShowEventFor] = useState<number | null>(today.getDate());

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get first day of month (0=Sun, 1=Mon, etc)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  // Adjust so Monday = 0
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const monthName = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    setSelectedDate(null);
    setShowEventFor(null);
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    setSelectedDate(null);
    setShowEventFor(null);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(today.getDate());
    setShowEventFor(today.getDate());
  };

  const isToday = (day: number) => {
    return day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear();
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(day);
    // Simulate finding an event for that day
    setShowEventFor(day);
  };

  // Mock events generator based on day
  const getEventForDay = (day: number | null) => {
    if (!day) return null;
    if (day === today.getDate() && currentMonth === today.getMonth()) {
      return { title: "Daily Live Session", time: "19:00 - 20:00", type: "live", desc: "Join our daily live coaching session." };
    }
    if (day % 3 === 0) {
      return { title: "Peer Practice", time: "15:00 - 15:30", type: "practice", desc: "1-on-1 practice with another learner." };
    }
    if (day % 5 === 0) {
      return { title: "Mock Interview", time: "10:00 - 11:00", type: "assessment", desc: "Technical mock interview session." };
    }
    return null;
  };

  const selectedEvent = getEventForDay(showEventFor);

  const xpForNextLevel = 500;
  const xpProgress = state.xp % xpForNextLevel;

  return (
    <div className="space-y-6 pb-6">
      {/* Top Bar with Profile & Notifications */}
      <div className="flex items-center justify-between bg-white/90 backdrop-blur-md rounded-3xl p-4 card-shadow border border-white/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100/40 rounded-full blur-3xl -z-10" />
        <Link href="/profile" className="flex items-center gap-3 hover:bg-neutral-50 p-2 rounded-2xl transition-colors flex-1 group">
          <div className="w-11 h-11 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-primary-300 transition-all duration-300 group-hover:scale-105">
            {state.userName ? state.userName.substring(0, 2).toUpperCase() : "JS"}
          </div>
          <div>
            <p className="font-bold text-sm text-neutral-900 leading-tight group-hover:text-primary-600 transition-colors">{state.userName || "Joshua Santosa"}</p>
            <p className="text-xs font-medium text-neutral-500">View Profile</p>
          </div>
        </Link>
        <Link 
          href="/profile"
          className="w-11 h-11 rounded-xl bg-neutral-50 flex items-center justify-center text-neutral-500 hover:bg-primary-50 hover:text-primary-600 transition-all duration-300 relative flex-shrink-0 ml-2 shadow-sm border border-neutral-100 group"
        >
          <Bell className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white shadow-sm" />
        </Link>
      </div>

      {/* Calendar */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 card-shadow border border-white/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 to-purple-400" />
        
        <div className="flex items-center justify-between mb-4 mt-1">
          <h3 className="font-bold text-neutral-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary-500" />
            Calendar
          </h3>
          <div className="flex items-center gap-1 bg-neutral-50 rounded-xl p-1 border border-neutral-100">
            <button
              onClick={goToPrevMonth}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm transition-all text-neutral-500 hover:text-neutral-900"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={goToToday}
              className="px-2 py-1 text-xs font-bold text-primary-600 hover:bg-white hover:shadow-sm rounded-lg transition-all"
            >
              Today
            </button>
            <button
              onClick={goToNextMonth}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm transition-all text-neutral-500 hover:text-neutral-900"
              aria-label="Next month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-sm text-neutral-700 font-bold text-center mb-4">{monthName}</p>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map(day => (
            <div key={day} className="text-center text-[10px] font-bold text-neutral-400 py-1 uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1.5">
          {/* Empty cells for offset */}
          {Array.from({ length: startOffset }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          {/* Day cells */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const todayMatch = isToday(day);
            const isSelected = selectedDate === day && currentMonth === currentDate.getMonth();
            const hasEvent = getEventForDay(day) !== null && currentMonth === currentDate.getMonth();
            
            return (
              <button
                key={day}
                onClick={() => handleDateClick(day)}
                className={`aspect-square flex flex-col items-center justify-center rounded-xl text-xs font-semibold transition-all duration-300 relative ${
                  todayMatch
                    ? "bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-md shadow-primary-200"
                    : isSelected
                    ? "bg-primary-50 text-primary-700 border-2 border-primary-200"
                    : "text-neutral-600 hover:bg-neutral-100 hover:scale-105"
                }`}
              >
                <span>{day}</span>
                {hasEvent && !todayMatch && (
                  <div className={`w-1 h-1 rounded-full absolute bottom-1.5 ${isSelected ? 'bg-primary-500 animate-bounce' : 'bg-primary-400'}`} />
                )}
                {hasEvent && todayMatch && (
                  <div className="w-1 h-1 rounded-full bg-white absolute bottom-1.5 animate-bounce" />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Event Details */}
        <div className="mt-5 pt-4 border-t border-neutral-100">
          <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
            {selectedDate && currentMonth === currentDate.getMonth() 
              ? `${monthName.split(' ')[0]} ${selectedDate}`
              : "Selected Date"}
          </p>
          {selectedEvent ? (
            <div className="flex flex-col gap-3 p-4 rounded-2xl bg-gradient-to-br from-primary-50 to-white border border-primary-100 shadow-sm">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm flex-shrink-0 ${
                  selectedEvent.type === 'live' ? 'bg-gradient-to-br from-rose-400 to-rose-500' :
                  selectedEvent.type === 'practice' ? 'bg-gradient-to-br from-blue-400 to-blue-500' :
                  'bg-gradient-to-br from-amber-400 to-amber-500'
                }`}>
                  {selectedEvent.type === 'live' && <Zap className="w-5 h-5" />}
                  {selectedEvent.type === 'practice' && <Target className="w-5 h-5" />}
                  {selectedEvent.type === 'assessment' && <Star className="w-5 h-5" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-900 leading-tight">{selectedEvent.title}</p>
                  <p className="text-xs font-medium text-primary-600 flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" /> {selectedEvent.time}
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">{selectedEvent.desc}</p>
                </div>
              </div>
              <button 
                onClick={() => alert("Session link will be available at " + selectedEvent.time)}
                className="w-full py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Join Session
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 text-center">
              <p className="text-sm font-medium text-neutral-500">No events scheduled for this day.</p>
              <button 
                onClick={() => alert("Coming soon!")}
                className="mt-2 text-xs font-semibold text-primary-600 hover:text-primary-700"
              >Browse Upcoming</button>
            </div>
          )}
        </div>
      </div>

      {/* Streak & Level */}
      <div className="bg-gradient-to-br from-orange-500 via-rose-500 to-red-600 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg shadow-orange-500/20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-inner border border-white/10">
                <Flame className="w-6 h-6 text-yellow-300 drop-shadow-md" />
              </div>
              <div>
                <p className="font-extrabold text-2xl drop-shadow-sm">{state.streak} Day</p>
                <p className="text-orange-100 text-sm font-medium uppercase tracking-wider">Streak</p>
              </div>
            </div>
          </div>
          <div className="flex gap-1.5">
            {Array.from({ length: 7 }).map((_, i) => {
              const isActive = i < Math.min(state.streak, 7);
              return (
                <div key={i} className="flex-1 flex flex-col gap-2 items-center">
                  <div
                    className={`w-full h-2 rounded-full transition-all duration-500 ${
                      isActive ? "bg-yellow-300 shadow-[0_0_10px_rgba(253,224,71,0.5)]" : "bg-white/20"
                    }`}
                  />
                  <span className={`text-[9px] font-bold uppercase ${isActive ? 'text-yellow-100' : 'text-white/40'}`}>
                    {["M","T","W","T","F","S","S"][i]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 card-shadow border border-white/50">
        <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          Quick Actions
        </h3>
        <div className="space-y-3">
          <Link href="/courses" className="flex items-center gap-4 p-3 rounded-2xl hover:bg-primary-50 transition-all duration-300 group cursor-pointer border border-transparent hover:border-primary-100">
            <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center group-hover:bg-primary-500 transition-colors duration-300 shadow-sm">
              <BookOpenIcon className="w-5 h-5 text-primary-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <div className="flex-1">
              <span className="text-sm font-bold text-neutral-800 group-hover:text-primary-700 transition-colors block">Continue Learning</span>
              <span className="text-xs font-medium text-neutral-400 group-hover:text-primary-500">Pick up where you left off</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
              <ChevronRight className="w-4 h-4 text-primary-500" />
            </div>
          </Link>
          <Link href="/missions" className="flex items-center gap-4 p-3 rounded-2xl hover:bg-emerald-50 transition-all duration-300 group cursor-pointer border border-transparent hover:border-emerald-100">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center group-hover:bg-emerald-500 transition-colors duration-300 shadow-sm">
              <Target className="w-5 h-5 text-emerald-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <div className="flex-1">
              <span className="text-sm font-bold text-neutral-800 group-hover:text-emerald-700 transition-colors block">Daily Missions</span>
              <span className="text-xs font-medium text-neutral-400 group-hover:text-emerald-500">3 new missions available</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
              <ChevronRight className="w-4 h-4 text-primary-500" />
            </div>
          </Link>
        </div>
      </div>

      {/* Level Progress */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 card-shadow border border-white/50 relative overflow-hidden group">
        <div className="absolute -right-4 -top-4 w-20 h-20 bg-yellow-100 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center shadow-md shadow-yellow-200">
              <Star className="w-4 h-4 text-white fill-white" />
            </div>
            <h3 className="font-extrabold text-lg text-neutral-900">Level {state.level}</h3>
          </div>
          <div className="px-2 py-1 bg-primary-50 text-primary-700 rounded-lg text-xs font-bold border border-primary-100 shadow-sm">
            {xpProgress} / {xpForNextLevel} XP
          </div>
        </div>
        <div className="h-3 bg-neutral-100 rounded-full overflow-hidden shadow-inner relative z-10">
          <div
            className="h-full bg-gradient-to-r from-primary-400 via-primary-500 to-purple-500 rounded-full transition-all duration-1000 ease-out relative"
            style={{ width: `${(xpProgress / xpForNextLevel) * 100}%` }}
          >
            <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]" />
          </div>
        </div>
        <p className="text-xs font-medium text-neutral-500 mt-3 text-center relative z-10">
          Earn <span className="text-primary-600 font-bold">{xpForNextLevel - xpProgress} XP</span> more to reach Level {state.level + 1}
        </p>
      </div>
    </div>
  );
}
