"use client";

import { ReactNode } from "react";

const lessons = [
  { icon: "mic", title: "Powerful Opening Techniques", course: "Public Speaking", iconBg: "#F3E8FF", iconColor: "#A855F7" },
  { icon: "ear", title: "Mirroring & Validation", course: "Active Listening", iconBg: "#DBEAFE", iconColor: "#3B82F6" },
  { icon: "gesture", title: "Hand Gestures Guide", course: "Body Language", iconBg: "#FEF3C7", iconColor: "#F59E0B" },
  { icon: "chat", title: "Persuasion Frameworks", course: "Negotiation", iconBg: "#D1FAE5", iconColor: "#10B981" },
];

const icons: Record<string, ReactNode> = {
  mic: (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <rect x="5" y="3" width="14" height="18" rx="3" fill="#F3E8FF" />
      <rect x="10" y="17" width="4" height="2" fill="#A855F7" />
      <path d="M12 7V12M9 10h6" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  ear: (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <ellipse cx="12" cy="12" rx="8" ry="9" fill="#DBEAFE" />
      <path d="M8 12C8 9 10 7 12 7C14 7 16 9 16 12V16" stroke="#3B82F6" strokeWidth="2" fill="none" />
      <circle cx="12" cy="18" r="1.5" fill="#3B82F6" />
    </svg>
  ),
  gesture: (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path d="M12 4L8 8L12 12L16 8L12 4Z" fill="#FEF3C7" />
      <path d="M12 8L8 12L12 16L16 12L12 8Z" fill="#F59E0B" />
      <path d="M12 12L8 16L12 20L16 16L12 12Z" fill="#D97706" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <rect x="3" y="4" width="18" height="14" rx="3" fill="#D1FAE5" />
      <path d="M7 18L10 22L14 18" fill="#10B981" />
      <circle cx="8" cy="10" r="1.5" fill="#065F46" />
      <circle cx="12" cy="10" r="1.5" fill="#065F46" />
      <circle cx="16" cy="10" r="1.5" fill="#065F46" />
    </svg>
  ),
};

export default function SavedLessons() {
  return (
    <div className="bg-white rounded-3xl p-6 card-shadow">
      <h2 className="text-lg font-bold text-neutral-900 mb-4">Saved Lessons</h2>
      <div className="flex flex-col">
        {lessons.map((lesson, index) => (
          <div 
            key={index} 
            className={`flex items-center gap-3 p-3 h-16 hover:bg-neutral-50 rounded-xl transition-colors cursor-pointer ${
              index < lessons.length - 1 ? 'border-b border-neutral-100' : ''
            }`}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: lesson.iconBg }}>
              {icons[lesson.icon]}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-neutral-900 text-sm">{lesson.title}</p>
              <p className="text-xs text-neutral-400">{lesson.course}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}