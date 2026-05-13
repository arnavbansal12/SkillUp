"use client";

import Image from "next/image";

interface AvatarProps {
  src?: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export default function Avatar({ src, name = "", size = "md", className = "" }: AvatarProps) {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-lg",
    xl: "w-24 h-24 text-2xl",
  };
  
  if (src) {
    return (
      <div className={`${sizes[size]} rounded-full overflow-hidden bg-primary-100 flex items-center justify-center ${className}`}>
        <Image src={src} alt={name} width={96} height={96} className="w-full h-full object-cover" />
      </div>
    );
  }
  
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  
  return (
    <div className={`${sizes[size]} rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold ${className}`}>
      {initials || "?"}
    </div>
  );
}