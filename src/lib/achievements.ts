import { ACHIEVEMENTS, MISSIONS } from "@/lib/real-data";

type ProgressState = {
  xp: number;
  streak: number;
  completedCourses: string[];
  completedMissions: string[];
};

const listeningMissionIds = new Set(
  MISSIONS.filter((m) => m.skill === "Listening").map((m) => m.id)
);
const speakingMissionIds = new Set(
  MISSIONS.filter((m) => m.skill === "Speaking").map((m) => m.id)
);
const bodyLanguageMissionIds = new Set(
  MISSIONS.filter((m) => m.skill === "Body Language").map((m) => m.id)
);
const networkingMissionIds = new Set(
  MISSIONS.filter((m) => m.skill === "Networking").map((m) => m.id)
);
const negotiationMissionIds = new Set(
  MISSIONS.filter((m) => m.skill === "Negotiation").map((m) => m.id)
);

function countCompleted(ids: string[], targetIds: Set<string>) {
  return ids.filter((id) => targetIds.has(id)).length;
}

export function getAchievementProgress(state: ProgressState) {
  const listeningCompleted = countCompleted(state.completedMissions, listeningMissionIds);
  const speakingCompleted = countCompleted(state.completedMissions, speakingMissionIds);
  const bodyCompleted = countCompleted(state.completedMissions, bodyLanguageMissionIds);
  const networkingCompleted = countCompleted(state.completedMissions, networkingMissionIds);
  const negotiationCompleted = countCompleted(state.completedMissions, negotiationMissionIds);

  const completedCoursesSet = new Set(state.completedCourses);

  return ACHIEVEMENTS.map((achievement) => {
    let progress = 0;
    switch (achievement.id) {
      case "first_step":
        progress = Math.min(1, state.completedMissions.length);
        break;
      case "active_listener":
        progress = Math.min(achievement.total, listeningCompleted);
        break;
      case "week_warrior":
        progress = Math.min(achievement.total, state.streak);
        break;
      case "public_speaker":
        progress = Math.min(
          achievement.total,
          speakingCompleted + (completedCoursesSet.has("public-speaking") ? 1 : 0)
        );
        break;
      case "body_language_pro":
        progress = Math.min(
          achievement.total,
          bodyCompleted + (completedCoursesSet.has("body-language") ? 2 : 0)
        );
        break;
      case "persuasion_master":
        progress = Math.min(
          achievement.total,
          negotiationCompleted + (completedCoursesSet.has("persuasion") ? 2 : 0)
        );
        break;
      case "networker":
        progress = Math.min(
          achievement.total,
          networkingCompleted + (completedCoursesSet.has("networking") ? 2 : 0)
        );
        break;
      case "consistent":
        progress = Math.min(achievement.total, state.streak);
        break;
      case "xp_collector":
        progress = Math.min(achievement.total, state.xp);
        break;
      case "mission_complete":
        progress = Math.min(achievement.total, state.completedMissions.length);
        break;
      default:
        progress = 0;
    }

    return {
      ...achievement,
      progress,
      unlocked: progress >= achievement.total,
    };
  });
}

