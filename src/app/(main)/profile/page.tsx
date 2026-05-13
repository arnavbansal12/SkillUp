"use client";

import { useState } from "react";
import { useGame } from "@/lib/GameContext";
import { COURSES, MISSIONS, ACHIEVEMENTS } from "@/lib/real-data";
import {
  Settings, Edit3, BookOpen, Target, Trophy, Flame,
  Star, TrendingUp, Calendar, Clock, X, Save, Camera,
  Bell, Moon, Globe, LogOut, ChevronRight, Mail,
  Award, Zap, CheckCircle2, BarChart3
} from "lucide-react";

export default function ProfilePage() {
  const { state, dispatch } = useGame();
  const [activeTab, setActiveTab] = useState<"overview" | "activity" | "settings">("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: state.userName || "Joshua Santosa",
    email: "joshua@skillup.com",
    bio: "Communication enthusiast passionate about learning"
  });
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    emailUpdates: true,
    soundEffects: true,
    weeklyReport: true,
    showOnLeaderboard: true
  });
  const [saved, setSaved] = useState(false);

  const completedCourses = (state.completedCourses || []).length;
  const completedMissions = (state.completedMissions || []).length;
  const unlockedAchievements = ACHIEVEMENTS.filter(a => a.progress >= a.total).length;

  const handleSaveProfile = () => {
    dispatch({ type: "SET_USERNAME", payload: editForm.name });
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleToggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const joinDate = new Date();
  joinDate.setMonth(joinDate.getMonth() - 3);

  // Activity data for chart
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weekActivity = [3, 5, 2, Math.max(2, state.completedMissions.length), Math.max(1, state.completedCourses.length), state.streak % 7 + 1, Math.max(1, Math.floor(state.xp / 1000))];

  const recentActivity = [];
  if (state.completedMissions.length > 0) {
    const lastMissionId = state.completedMissions[state.completedMissions.length - 1];
    const lastMission = MISSIONS.find(m => m.id === lastMissionId);
    if (lastMission) recentActivity.push({ action: "Completed Mission", detail: lastMission.title, time: "Today", icon: Target, color: "bg-emerald-100 text-emerald-600" });
  }
  if (state.completedCourses.length > 0) {
    const lastCourseId = state.completedCourses[state.completedCourses.length - 1];
    const lastCourse = COURSES.find(c => c.id === lastCourseId);
    if (lastCourse) recentActivity.push({ action: "Completed Course", detail: lastCourse.title, time: "Yesterday", icon: BookOpen, color: "bg-blue-100 text-blue-600" });
  }
  if (state.unlockedAchievements.length > 0) {
    const lastAchId = state.unlockedAchievements[state.unlockedAchievements.length - 1];
    const lastAch = ACHIEVEMENTS.find(a => a.id === lastAchId);
    if (lastAch) recentActivity.push({ action: "Earned Achievement", detail: lastAch.name, time: "2 days ago", icon: Trophy, color: "bg-yellow-100 text-yellow-600" });
  }
  recentActivity.push({ action: "Streak Extended", detail: `${state.streak} days and counting!`, time: "3 days ago", icon: Flame, color: "bg-orange-100 text-orange-600" });
  recentActivity.push({ action: "Leveled Up", detail: `Reached Level ${state.level}`, time: "4 days ago", icon: Star, color: "bg-purple-100 text-purple-600" });

  return (
    <div className="pb-6">
      {/* Profile Header */}
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-purple-800 rounded-3xl overflow-hidden mb-6 slide-up">
        {/* Background Orbs */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/4 orb-1" />
        <div className="absolute bottom-0 left-1/3 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 orb-2" />

        <div className="relative z-10 p-7">
          <div className="flex items-start gap-5">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-lg ring-4 ring-white/20">
                {(state.userName || "JS").split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-lg flex items-center justify-center border-2 border-white">
                <CheckCircle2 className="w-3 h-3 text-white" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white mb-1">{state.userName || "Joshua Santosa"}</h1>
              <p className="text-primary-200 text-sm mb-3">{editForm.bio}</p>
              <div className="flex items-center gap-4">
                <span className="text-xs text-primary-200 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Joined {joinDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </span>
                <span className="text-xs text-primary-200 flex items-center gap-1">
                  <Star className="w-3 h-3" /> Level {state.level}
                </span>
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-xl text-sm font-medium hover:bg-white/20 transition-all flex items-center gap-2 border border-white/10"
            >
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-3 mt-6">
            {[
              { label: "Total XP", value: state.xp.toLocaleString(), icon: Zap },
              { label: "Day Streak", value: state.streak, icon: Flame },
              { label: "Courses", value: completedCourses, icon: BookOpen },
              { label: "Missions", value: completedMissions, icon: Target },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/5">
                <stat.icon className="w-4 h-4 text-primary-200 mx-auto mb-1" />
                <p className="text-lg font-bold text-white">{stat.value}</p>
                <p className="text-[10px] text-primary-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 slide-up slide-up-delay-1">
        {[
          { key: "overview", label: "Overview", icon: BarChart3 },
          { key: "activity", label: "Activity", icon: TrendingUp },
          { key: "settings", label: "Settings", icon: Settings }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`px-5 py-2.5 rounded-2xl font-medium transition-all flex items-center gap-2 ${
              activeTab === tab.key
                ? "bg-neutral-900 text-white shadow-lg"
                : "bg-white text-neutral-600 hover:bg-neutral-50 card-shadow"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-6 slide-up slide-up-delay-2">
          {/* Learning Progress */}
          <div className="bg-white rounded-3xl p-6 card-shadow">
            <h2 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-500" />
              Learning Progress
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-700">Courses</span>
                  <BookOpen className="w-4 h-4 text-blue-500" />
                </div>
                <p className="text-2xl font-bold text-blue-800">{completedCourses}/{COURSES.length}</p>
                <div className="h-2 bg-blue-100 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full transition-all duration-700" style={{ width: `${(completedCourses / COURSES.length) * 100}%` }} />
                </div>
              </div>
              <div className="p-4 bg-emerald-50 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-emerald-700">Missions</span>
                  <Target className="w-4 h-4 text-emerald-500" />
                </div>
                <p className="text-2xl font-bold text-emerald-800">{completedMissions}/{MISSIONS.length}</p>
                <div className="h-2 bg-emerald-100 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all duration-700" style={{ width: `${(completedMissions / MISSIONS.length) * 100}%` }} />
                </div>
              </div>
              <div className="p-4 bg-amber-50 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-amber-700">Achievements</span>
                  <Trophy className="w-4 h-4 text-amber-500" />
                </div>
                <p className="text-2xl font-bold text-amber-800">{unlockedAchievements}/{ACHIEVEMENTS.length}</p>
                <div className="h-2 bg-amber-100 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full transition-all duration-700" style={{ width: `${(unlockedAchievements / ACHIEVEMENTS.length) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-white rounded-3xl p-6 card-shadow">
            <h2 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              Earned Achievements
            </h2>
            <div className="flex flex-wrap gap-3">
              {ACHIEVEMENTS.filter(a => a.progress >= a.total).map((a) => (
                <div key={a.id} className="flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-amber-50 px-4 py-2.5 rounded-2xl border border-yellow-200">
                  <span className="text-xl">{a.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-amber-800">{a.name}</p>
                    <p className="text-[10px] text-amber-600">+{a.xp} XP</p>
                  </div>
                </div>
              ))}
              {ACHIEVEMENTS.filter(a => a.progress >= a.total).length === 0 && (
                <p className="text-sm text-neutral-400">No achievements unlocked yet. Keep learning!</p>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "activity" && (
        <div className="space-y-6 slide-up slide-up-delay-2">
          {/* Weekly Activity Chart */}
          <div className="bg-white rounded-3xl p-6 card-shadow">
            <h2 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary-500" />
              This Week&apos;s Activity
            </h2>
            <div className="flex items-end justify-between gap-3 h-40">
              {weekDays.map((day, i) => (
                <div key={day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="flex-1 w-full flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-primary-500 to-primary-400 rounded-t-lg transition-all duration-700 hover:from-primary-600 hover:to-primary-500"
                      style={{ height: `${(weekActivity[i] / 7) * 100}%`, animationDelay: `${i * 0.1}s` }}
                    />
                  </div>
                  <span className="text-xs text-neutral-500 font-medium">{day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="bg-white rounded-3xl p-6 card-shadow">
            <h2 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-neutral-500" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-neutral-50 transition-colors stagger-item" style={{ animationDelay: `${0.3 + idx * 0.1}s` }}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color} flex-shrink-0`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-neutral-900 text-sm">{item.action}</p>
                    <p className="text-xs text-neutral-400">{item.detail}</p>
                  </div>
                  <span className="text-xs text-neutral-400">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="space-y-4 slide-up slide-up-delay-2">
          {[
            { key: "notifications" as const, label: "Push Notifications", desc: "Get notified about new missions and achievements", icon: Bell, color: "bg-blue-100 text-blue-600" },
            { key: "emailUpdates" as const, label: "Email Updates", desc: "Receive weekly progress reports via email", icon: Mail, color: "bg-emerald-100 text-emerald-600" },
            { key: "soundEffects" as const, label: "Sound Effects", desc: "Play sounds for XP gains and achievements", icon: Globe, color: "bg-purple-100 text-purple-600" },
            { key: "weeklyReport" as const, label: "Weekly Report", desc: "Get a summary of your weekly progress", icon: BarChart3, color: "bg-orange-100 text-orange-600" },
            { key: "showOnLeaderboard" as const, label: "Show on Leaderboard", desc: "Display your name on the public leaderboard", icon: Trophy, color: "bg-yellow-100 text-yellow-600" },
            { key: "darkMode" as const, label: "Dark Mode", desc: "Switch to dark theme (coming soon)", icon: Moon, color: "bg-neutral-100 text-neutral-600" },
          ].map((setting) => (
            <div key={setting.key} className="bg-white rounded-2xl p-4 card-shadow flex items-center justify-between group hover-lift">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${setting.color}`}>
                  <setting.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-neutral-900">{setting.label}</p>
                  <p className="text-xs text-neutral-400">{setting.desc}</p>
                </div>
              </div>
              <button
                onClick={() => handleToggleSetting(setting.key)}
                className={`w-12 h-7 rounded-full transition-all duration-300 relative ${
                  settings[setting.key] ? "bg-primary-500" : "bg-neutral-200"
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all duration-300 shadow-sm ${
                  settings[setting.key] ? "left-6" : "left-1"
                }`} />
              </button>
            </div>
          ))}

          {/* Account Actions */}
          <div className="bg-white rounded-2xl p-4 card-shadow mt-6">
            <h3 className="font-semibold text-neutral-900 mb-3">Account</h3>
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition-colors text-left group">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <LogOut className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-red-600">Sign Out</p>
                <p className="text-xs text-neutral-400">Log out of your account</p>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-red-400" />
            </button>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setIsEditing(false)}>
          <div className="bg-white rounded-3xl p-6 w-full max-w-md card-shadow bounce-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-neutral-900">Edit Profile</h2>
              <button onClick={() => setIsEditing(false)} className="w-8 h-8 bg-neutral-100 rounded-xl flex items-center justify-center hover:bg-neutral-200 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Avatar */}
            <div className="flex justify-center mb-6">
              <div className="relative group">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center text-2xl font-bold text-white">
                  {editForm.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()}
                </div>
                <div className="absolute inset-0 bg-black/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <Camera className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Display Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  className="w-full px-4 py-3 bg-neutral-50 rounded-2xl border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  className="w-full px-4 py-3 bg-neutral-50 rounded-2xl border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Bio</label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                  className="w-full px-4 py-3 bg-neutral-50 rounded-2xl border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none resize-none transition-all"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 py-3 bg-neutral-100 text-neutral-700 rounded-2xl font-medium hover:bg-neutral-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="flex-1 py-3 bg-primary-600 text-white rounded-2xl font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Confirmation Toast */}
      {saved && (
        <div className="fixed bottom-6 right-6 bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-2 z-50 bounce-in">
          <CheckCircle2 className="w-5 h-5" />
          Profile updated successfully!
        </div>
      )}
    </div>
  );
}
