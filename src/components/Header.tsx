"use client";

import { Search, Bell } from "lucide-react";

export default function Header() {
  const greeting = new Date().getHours() < 12 ? "Good Morning" : new Date().getHours() < 18 ? "Good Afternoon" : "Good Evening";
  
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">{greeting}, Joshua 👋</h1>
        <p className="text-neutral-600">Keep building your communication skills!</p>
      </div>
      <div className="flex items-center gap-3">
        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center card-shadow hover:bg-neutral-100 transition-colors">
          <Search className="w-5 h-5 text-neutral-400" />
        </button>
        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center card-shadow hover:bg-neutral-100 transition-colors relative">
          <Bell className="w-5 h-5 text-neutral-400" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full" />
        </button>
      </div>
    </div>
  );
}