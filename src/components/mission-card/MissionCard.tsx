"use client";

import { Lock, Check, Clock, Sparkles } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

type MissionStatus = "available" | "in-progress" | "completed" | "locked";
type Difficulty = "Beginner" | "Intermediate" | "Advanced";

interface MissionCardProps {
  title: string;
  description: string;
  skill: string;
  difficulty: Difficulty;
  xp: number;
  status: MissionStatus;
}

const difficultyColors = {
  Beginner: "success" as const,
  Intermediate: "warning" as const,
  Advanced: "danger" as const,
};

const statusColors = {
  available: "bg-white",
  "in-progress": "bg-blue-50",
  completed: "bg-success-bg",
  locked: "bg-neutral-100",
};

const statusIcons = {
  available: <Sparkles className="w-5 h-5 text-primary-500" />,
  "in-progress": <Clock className="w-5 h-5 text-blue-500" />,
  completed: <Check className="w-5 h-5 text-emerald-600" />,
  locked: <Lock className="w-5 h-5 text-neutral-400" />,
};

export default function MissionCard({ title, description, skill, difficulty, xp, status }: MissionCardProps) {
  const getButtonText = () => {
    switch (status) {
      case "available": return "Start Mission";
      case "in-progress": return "Continue";
      case "completed": return "Review";
      case "locked": return "Locked";
    }
  };

  return (
    <div className={`${statusColors[status]} rounded-3xl p-6 card-shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover:scale-102`}>
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
          status === "locked" ? "bg-neutral-200" : "bg-primary-100"
        }`}>
          {statusIcons[status]}
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-neutral-900 text-lg">{title}</h3>
              <p className="text-sm text-neutral-500 mt-1">{description}</p>
            </div>
            <Badge variant={difficultyColors[difficulty]}>{difficulty}</Badge>
          </div>
          
          <div className="flex items-center gap-3 mt-4 mb-4">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
              skill === "Finance" ? "bg-emerald-50 text-emerald-600" :
              skill === "Digital" ? "bg-blue-50 text-blue-600" :
              skill === "Communication" ? "bg-purple-50 text-purple-600" :
              "bg-orange-50 text-orange-600"
            }`}>
              {skill}
            </span>
            <span className="text-sm font-semibold text-warning">{xp} XP</span>
            {status === "completed" && (
              <span className="text-xs text-neutral-400">Completed</span>
            )}
          </div>
          
          <Button 
            variant={status === "completed" ? "secondary" : status === "locked" ? "ghost" : "primary"} 
            size="sm"
            disabled={status === "locked"}
          >
            {getButtonText()}
          </Button>
        </div>
      </div>
    </div>
  );
}