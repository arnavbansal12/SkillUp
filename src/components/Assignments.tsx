"use client";

import { ReactNode } from "react";

const assignments = [
  { 
    icon: "mic",
    title: "Presentation Practice",
    subtitle: "Public Speaking",
    score: "-/100", 
    status: "In Progress",
    statusBg: "bg-primary-50",
    statusText: "text-primary-600",
    iconBg: "#E9D5FF",
    iconColor: "#7C3AED"
  },
  { 
    icon: "ear", 
    title: "Active Listening Test",
    subtitle: "Listening Skills", 
    score: "92/100", 
    status: "Completed",
    statusBg: "bg-success-bg",
    statusText: "text-emerald-600",
    iconBg: "#DBEAFE",
    iconColor: "#3B82F6"
  },
  { 
    icon: "hand", 
    title: "Body Language Quiz",
    subtitle: "Non-verbal Communication", 
    score: "88/100", 
    status: "Completed",
    statusBg: "bg-success-bg",
    statusText: "text-emerald-600",
    iconBg: "#FEF3C7",
    iconColor: "#F59E0B"
  },
];

const icons: Record<string, ReactNode> = {
  mic: (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#E9D5FF" />
      <path d="M12 8V14M9 11h6" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
      <rect x="9" y="14" width="6" height="4" rx="1" fill="#7C3AED" />
    </svg>
  ),
  ear: (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#DBEAFE" />
      <path d="M6 12C6 9 8 7 12 7C16 7 18 9 18 12V16H6V12Z" fill="#3B82F6" />
      <circle cx="12" cy="17" r="1.5" fill="#3B82F6" />
    </svg>
  ),
  hand: (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#FEF3C7" />
      <path d="M8 12L12 16L16 12M8 8L12 12L16 8" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export default function Assignments() {
  return (
    <div className="bg-white rounded-3xl p-6 card-shadow">
      <h2 className="text-lg font-bold text-neutral-900 mb-4">Communication Practice</h2>
      <div className="overflow-hidden">
        <div className="bg-primary-50 -mx-6 px-6 py-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-neutral-600">Assignment</span>
          <span className="text-sm font-semibold text-neutral-600">Score</span>
          <span className="text-sm font-semibold text-neutral-600">Status</span>
        </div>
        {assignments.map((assignment, index) => (
          <div key={index} className="flex items-center justify-between py-4 border-b border-neutral-100 last:border-b-0">
            <div className="flex items-center gap-3 flex-1">
              {icons[assignment.icon]}
              <div>
                <p className="font-semibold text-neutral-900">{assignment.title}</p>
                <p className="text-xs text-neutral-400">{assignment.subtitle}</p>
              </div>
            </div>
            <span className="text-sm text-neutral-600 w-20 text-center">{assignment.score}</span>
            <span className={`text-xs font-semibold px-4 py-2 rounded-full ${assignment.statusBg} ${assignment.statusText} w-24 text-center`}>
              {assignment.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}