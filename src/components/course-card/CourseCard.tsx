"use client";

import Image from "next/image";
import { Laptop, Mic, Wallet, Users, Puzzle, Star } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

interface CourseCardProps {
  title: string;
  subtitle: string;
  progress: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  imageUrl: string;
  status: "not-started" | "in-progress" | "completed";
}

const icons: Record<string, React.ReactNode> = {
  laptop: <Laptop className="w-5 h-5" />,
  mic: <Mic className="w-5 h-5" />,
  wallet: <Wallet className="w-5 h-5" />,
  users: <Users className="w-5 h-5" />,
  puzzle: <Puzzle className="w-5 h-5" />,
};

const difficultyColors = {
  Beginner: "success" as const,
  Intermediate: "warning" as const,
  Advanced: "danger" as const,
};

const statusColors = {
  "not-started": "bg-neutral-100",
  "in-progress": "bg-blue-50",
  "completed": "bg-success-bg",
};

export default function CourseCard({ title, subtitle, progress, difficulty, imageUrl, status }: CourseCardProps) {
  const iconKey = title.toLowerCase().includes("digital") ? "laptop" 
    : title.toLowerCase().includes("communication") ? "mic"
    : title.toLowerCase().includes("financial") ? "wallet"
    : title.toLowerCase().includes("teamwork") ? "users"
    : "puzzle";

  const getButtonText = () => {
    if (status === "completed") return "Review";
    if (progress > 0) return "Continue";
    return "Start Course";
  };

  return (
    <div className={`${statusColors[status]} rounded-3xl p-6 card-shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-float`}>
      <div className="h-40 rounded-2xl overflow-hidden mb-4 relative">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute top-3 right-3">
          <Badge variant={difficultyColors[difficulty]}>{difficulty}</Badge>
        </div>
      </div>
      
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 flex-shrink-0">
          {icons[iconKey]}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-neutral-900 text-lg">{title}</h3>
          <p className="text-sm text-neutral-500">{subtitle}</p>
        </div>
      </div>

      {progress > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-neutral-500">Progress</span>
            <span className="text-sm font-semibold text-neutral-700">{progress}%</span>
          </div>
          <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-500 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Button 
          variant={status === "completed" ? "secondary" : "primary"} 
          size="sm" 
          className="flex-1"
        >
          {getButtonText()}
        </Button>
        {progress > 0 && (
          <div className="flex items-center gap-1 text-warning">
            <Star className="w-4 h-4 fill-warning" />
            <span className="text-sm font-medium">4.8</span>
          </div>
        )}
      </div>
    </div>
  );
}