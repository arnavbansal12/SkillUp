"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";

interface GameState {
  xp: number;
  level: number;
  streak: number;
  lastLogin: string;
  userName: string;
  enrolledCourses: string[];
  completedCourses: string[];
  completedMissions: string[];
  unlockedAchievements: string[];
}

type GameAction =
  | { type: "ADD_XP"; payload: number }
  | { type: "SET_STREAK"; payload: number }
  | { type: "SET_USERNAME"; payload: string }
  | { type: "ENROLL_COURSE"; payload: string }
  | { type: "COMPLETE_COURSE"; payload: string }
  | { type: "COMPLETE_MISSION"; payload: string }
  | { type: "UNLOCK_ACHIEVEMENT"; payload: string }
  | { type: "LOAD_STATE"; payload: GameState }
  | { type: "RESET" };

const initialState: GameState = {
  xp: 0,
  level: 1,
  streak: 0,
  lastLogin: new Date().toISOString().split("T")[0],
  userName: "",
  enrolledCourses: [],
  completedCourses: [],
  completedMissions: [],
  unlockedAchievements: [],
};

function calculateLevel(xp: number): number {
  return Math.floor(xp / 500) + 1;
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "ADD_XP": {
      const newXp = state.xp + action.payload;
      return {
        ...state,
        xp: newXp,
        level: calculateLevel(newXp),
      };
    }
    case "SET_STREAK":
      return { ...state, streak: action.payload };
    case "SET_USERNAME":
      return { ...state, userName: action.payload };
    case "ENROLL_COURSE":
      if (state.enrolledCourses.includes(action.payload)) return state;
      return { ...state, enrolledCourses: [...state.enrolledCourses, action.payload] };
    case "COMPLETE_COURSE":
      if (state.completedCourses.includes(action.payload)) return state;
      return {
        ...state,
        completedCourses: [...state.completedCourses, action.payload],
        enrolledCourses: state.enrolledCourses.includes(action.payload)
          ? state.enrolledCourses
          : [...state.enrolledCourses, action.payload],
      };
    case "COMPLETE_MISSION":
      if (state.completedMissions.includes(action.payload)) return state;
      return { ...state, completedMissions: [...state.completedMissions, action.payload] };
    case "UNLOCK_ACHIEVEMENT":
      if (state.unlockedAchievements.includes(action.payload)) return state;
      return { ...state, unlockedAchievements: [...state.unlockedAchievements, action.payload] };
    case "LOAD_STATE":
      return { ...action.payload };
    case "RESET":
      return { ...initialState, lastLogin: new Date().toISOString().split("T")[0] };
    default:
      return state;
  }
}

const STORAGE_KEY = "skillup_game_state_v5";

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const GameContext = createContext<GameContextType>({
  state: initialState,
  dispatch: () => {},
});

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Load from server and localStorage on mount
  useEffect(() => {
    const initGame = async () => {
      try {
        // 1. Try server first
        const response = await fetch("/api/user/sync");
        if (response.ok) {
          const userData = await response.json();
          const syncedState: GameState = {
            ...initialState,
            xp: userData.xp,
            level: userData.level,
            streak: userData.streak,
            lastLogin: userData.lastActive.split("T")[0],
            userName: userData.name || initialState.userName,
            enrolledCourses: userData.enrolledCourses?.map((c: { courseId: string }) => c.courseId) || [],
            completedCourses: userData.completedCourses || [],
            completedMissions: userData.completedMissions?.map((m: { missionId: string }) => m.missionId) || [],
            unlockedAchievements: userData.achievements?.map((a: { achievementId: string }) => a.achievementId) || [],
          };
          dispatch({ type: "LOAD_STATE", payload: syncedState });
          return;
        }
      } catch (e) {
        console.error("Failed to sync with server:", e);
      }

      // 2. Fallback to localStorage
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          const merged: GameState = {
            ...initialState,
            ...parsed,
          };
          
          // Streak logic
          const today = new Date().toISOString().split("T")[0];
          const lastLogin = merged.lastLogin;
          if (lastLogin) {
            const last = new Date(lastLogin);
            const now = new Date(today);
            const diffDays = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
            if (diffDays === 1) merged.streak += 1;
            else if (diffDays > 1) merged.streak = 1;
          }
          merged.lastLogin = today;
          dispatch({ type: "LOAD_STATE", payload: merged });
        }
      } catch (e) {
        console.error("Failed to load from localStorage:", e);
      }
    };

    initGame();
  }, []);

  // Sync to server and localStorage on state change
  useEffect(() => {
    if (!state) return;

    const syncState = async () => {
      try {
        // Save to local
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

        // Save to server
        await fetch("/api/user/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            xp: state.xp,
            level: state.level,
            streak: state.streak,
            enrolledCourses: state.enrolledCourses,
            completedCourses: state.completedCourses,
            completedMissions: state.completedMissions,
            unlockedAchievements: state.unlockedAchievements,
          }),
        });
      } catch (e) {
        console.error("Failed to sync state:", e);
      }
    };

    const timeout = setTimeout(syncState, 2000); // Debounce sync
    return () => clearTimeout(timeout);
  }, [state]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}


export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
