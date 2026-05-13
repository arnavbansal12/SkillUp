"use client";

import { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  color?: "purple" | "green" | "yellow" | "blue";
}

const colors = {
  purple: "bg-primary-50 text-primary-600",
  green: "bg-success-bg text-emerald-600",
  yellow: "bg-warning-bg text-amber-600",
  blue: "bg-blue-50 text-blue-600",
};

export default function StatCard({ label, value, icon, color = "purple" }: StatCardProps) {
  return (
    <div className="bg-white rounded-3xl p-6 card-shadow">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colors[color]}`}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-neutral-900">{value}</p>
          <p className="text-sm text-neutral-500">{label}</p>
        </div>
      </div>
    </div>
  );
}