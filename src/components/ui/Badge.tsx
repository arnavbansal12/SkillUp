"use client";

import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "primary" | "success" | "warning" | "danger" | "neutral" | "info";
  className?: string;
}

export default function Badge({ children, variant = "primary", className = "" }: BadgeProps) {
  const variants = {
    primary: "bg-primary-50 text-primary-600",
    success: "bg-success-bg text-emerald-600",
    warning: "bg-warning-bg text-amber-700",
    danger: "bg-red-50 text-red-600",
    neutral: "bg-neutral-100 text-neutral-600",
    info: "bg-blue-50 text-blue-600",
  };
  
  return (
    <span className={`text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center gap-1 ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}