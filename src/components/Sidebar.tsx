"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, BookOpen, Target, Trophy, Users, 
  Settings, LogOut, Sparkles, TrendingUp, Award, Crown, Zap
} from "lucide-react";
import { motion } from "framer-motion";
import SkillUpLogo from "./SkillUpLogo";
import { SignOutButton } from "@clerk/nextjs";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Courses", href: "/courses", icon: BookOpen },
  { label: "Quests", href: "/missions", icon: Target },
  { label: "Leaderboard", href: "/leaderboard", icon: TrendingUp },
  { label: "Community", href: "/community", icon: Users },
];



export default function Sidebar() {
  const pathname = usePathname();
  
  return (
    <div className="h-full flex flex-col bg-white border-r border-neutral-200/60 relative overflow-hidden group/sidebar shadow-2xl shadow-neutral-200/10">
      {/* Premium Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[40%] bg-primary-200/30 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-[30%] -right-[20%] w-[60%] h-[40%] bg-purple-200/20 rounded-full blur-[100px]" />
      </div>

      {/* Brand Logo */}
      <div className="px-6 pt-10 pb-8 relative z-10">
        <SkillUpLogo size="md" />
      </div>

      {/* Main Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-4 space-y-8 relative z-10">
        {/* Navigation Section */}
        <section>
          <div className="px-4 py-2 mb-3">
            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">Learning Paths</p>
          </div>
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} className="block">
                  <motion.div
                    whileHover={{ x: 6 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group relative ${
                      isActive 
                        ? "text-primary-700 bg-primary-50/50 shadow-sm" 
                        : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="sidebarActive"
                        className="absolute inset-y-0 left-0 w-1.5 bg-primary-600 rounded-full my-3"
                        transition={{ type: "spring" as const, bounce: 0.25, duration: 0.5 }}
                      />
                    )}
                    <div className={`transition-all duration-300 ${
                      isActive ? "scale-110" : "group-hover:scale-110"
                    }`}>
                      <item.icon className={`w-5 h-5 transition-colors duration-300 ${
                        isActive ? "text-primary-600" : "group-hover:text-primary-500"
                      }`} />
                    </div>
                    <span className={`text-sm font-bold tracking-tight transition-all duration-300 ${
                      isActive ? "translate-x-1" : ""
                    }`}>
                      {item.label}
                    </span>
                  </motion.div>
                </Link>
              );
            })}
          </nav>
        </section>

      {/* Social Section */}
      <section>
        <div className="px-4 py-2 mb-3">
          <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">Insights</p>
        </div>
        <div className="space-y-2">
          <Link href="/achievements" className="block">
            <motion.div
              whileHover={{ x: 6 }}
              className="flex items-center gap-4 px-5 py-3.5 rounded-2xl text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-all duration-300"
            >
              <Trophy className="w-5 h-5" />
              <span className="text-sm font-bold tracking-tight">Achievements</span>
            </motion.div>
          </Link>
        </div>
      </section>

        {/* Premium Upgrade Card */}
        <div className="px-2 pt-4 pb-8">
          <motion.div 
            whileHover={{ y: -5 }}
            className="relative overflow-hidden rounded-3xl group cursor-pointer"
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600" />
            
            {/* Animated Glow Effects */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/20 rounded-full blur-3xl group-hover:bg-white/30 transition-all duration-700" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-yellow-400/30 rounded-full blur-3xl" />
            
            {/* Decorative Elements */}
            <div className="absolute top-3 right-3">
              <Crown className="w-6 h-6 text-yellow-300 fill-yellow-300/50" />
            </div>
            
            {/* Content */}
            <div className="relative p-6 text-center">
              <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/20">
                <Award className="w-8 h-8 text-white" />
              </div>
              
              <p className="text-[10px] font-black text-white/80 uppercase tracking-widest mb-2">Go Beyond Limits</p>
              <h4 className="text-white text-lg font-black mb-1">Unlock Premium</h4>
              <p className="text-white/70 text-xs mb-4">Access exclusive quests & features</p>
              
              <button 
                onClick={() => alert("Premium features coming soon!")}
                className="w-full py-3 bg-white text-purple-700 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-purple-50 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
              >
                Upgrade Now
              </button>
              
              <p className="text-[10px] text-white/60 mt-3">Free 7-day trial included</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="px-6 py-6 border-t border-neutral-100 bg-white/95 backdrop-blur-md relative z-20">
        <div className="flex flex-col gap-2">
          <Link href="/profile" className="flex items-center gap-4 px-5 py-3 rounded-2xl text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-all group">
            <Users className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-sm font-bold tracking-tight">View Profile</span>
          </Link>
          <SignOutButton redirectUrl="/">
            <button className="flex items-center gap-4 px-5 py-3 rounded-2xl text-rose-500 hover:bg-rose-50 transition-all group w-full text-left">
              <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-500" />
              <span className="text-sm font-bold tracking-tight">Sign Out</span>
            </button>
          </SignOutButton>
        </div>
        
        {/* Version Info */}
        <div className="mt-5 text-center">
          <p className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">SkillUp v2.4.0</p>
        </div>
      </div>
    </div>
  );
}
