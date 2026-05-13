const STORAGE_PREFIX = 'skillup_';

export interface UserProgress {
  name: string;
  xp: number;
  level: number;
  streak: number;
  coursesCompleted: number;
  missionsDone: number;
  joinedDate: string;
}

export interface CourseProgress {
  id: string;
  title: string;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed';
  lastAccessed: string;
}

export interface MissionProgress {
  id: string;
  title: string;
  status: 'available' | 'in-progress' | 'completed' | 'locked';
  completedAt?: string;
}

export interface Settings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklySummary: boolean;
  darkMode: boolean;
}

const defaultUserProgress: UserProgress = {
  name: 'Joshua Santosa',
  xp: 4500,
  level: 12,
  streak: 12,
  coursesCompleted: 3,
  missionsDone: 8,
  joinedDate: new Date().toISOString(),
};

const defaultCourses: CourseProgress[] = [
  { id: '1', title: 'Digital Literacy Basics', progress: 45, status: 'in-progress', lastAccessed: new Date().toISOString() },
  { id: '2', title: 'Communication & Confidence', progress: 0, status: 'not-started', lastAccessed: new Date().toISOString() },
  { id: '3', title: 'Financial Planning for Students', progress: 100, status: 'completed', lastAccessed: new Date().toISOString() },
  { id: '4', title: 'Teamwork & Leadership', progress: 30, status: 'in-progress', lastAccessed: new Date().toISOString() },
  { id: '5', title: 'Problem Solving 101', progress: 0, status: 'not-started', lastAccessed: new Date().toISOString() },
];

const defaultMissions: MissionProgress[] = [
  { id: '1', title: 'Create a Monthly Budget', status: 'available' },
  { id: '2', title: 'Write a Professional Email', status: 'in-progress' },
  { id: '3', title: 'Spot the Phishing Scam', status: 'available' },
  { id: '4', title: 'Resolve a Team Conflict', status: 'locked' },
  { id: '5', title: 'Master Excel Basics', status: 'completed', completedAt: new Date().toISOString() },
  { id: '6', title: 'Savings Challenge', status: 'available' },
  { id: '7', title: 'Public Speaking Prep', status: 'available' },
  { id: '8', title: 'Lead a Group Project', status: 'in-progress' },
];

const defaultSettings: Settings = {
  emailNotifications: true,
  pushNotifications: false,
  weeklySummary: true,
  darkMode: false,
};

function saveProgress(key: string, data: unknown): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

function loadProgress<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const stored = localStorage.getItem(STORAGE_PREFIX + key);
    if (stored) {
      return JSON.parse(stored) as T;
    }
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
  }
  return defaultValue;
}

export const storage = {
  user: {
    get: (): UserProgress => loadProgress('user', defaultUserProgress),
    save: (data: UserProgress) => saveProgress('user', data),
    addXP: (amount: number) => {
      const user = storage.user.get();
      user.xp += amount;
      user.level = Math.floor(user.xp / 500) + 1;
      storage.user.save(user);
      return user;
    },
    incrementStreak: () => {
      const user = storage.user.get();
      user.streak += 1;
      storage.user.save(user);
      return user;
    },
    incrementCourses: () => {
      const user = storage.user.get();
      user.coursesCompleted += 1;
      storage.user.save(user);
      return user;
    },
    incrementMissions: () => {
      const user = storage.user.get();
      user.missionsDone += 1;
      storage.user.save(user);
      return user;
    },
    reset: () => {
      saveProgress('user', defaultUserProgress);
      return defaultUserProgress;
    },
  },
  
  courses: {
    get: (): CourseProgress[] => loadProgress('courses', defaultCourses),
    save: (data: CourseProgress[]) => saveProgress('courses', data),
    updateProgress: (courseId: string, progress: number) => {
      const courses = storage.courses.get();
      const index = courses.findIndex(c => c.id === courseId);
      if (index !== -1) {
        courses[index].progress = progress;
        courses[index].lastAccessed = new Date().toISOString();
        if (progress === 100) {
          courses[index].status = 'completed';
        } else if (progress > 0) {
          courses[index].status = 'in-progress';
        }
        storage.courses.save(courses);
      }
      return courses;
    },
    reset: () => {
      saveProgress('courses', defaultCourses);
      return defaultCourses;
    },
  },
  
  missions: {
    get: (): MissionProgress[] => loadProgress('missions', defaultMissions),
    save: (data: MissionProgress[]) => saveProgress('missions', data),
    complete: (missionId: string) => {
      const missions = storage.missions.get();
      const index = missions.findIndex(m => m.id === missionId);
      if (index !== -1) {
        missions[index].status = 'completed';
        missions[index].completedAt = new Date().toISOString();
        storage.missions.save(missions);
      }
      return missions;
    },
    reset: () => {
      saveProgress('missions', defaultMissions);
      return defaultMissions;
    },
  },
  
  settings: {
    get: (): Settings => loadProgress('settings', defaultSettings),
    save: (data: Settings) => saveProgress('settings', data),
    update: (key: keyof Settings, value: boolean) => {
      const settings = storage.settings.get();
      settings[key] = value;
      storage.settings.save(settings);
      return settings;
    },
    reset: () => {
      saveProgress('settings', defaultSettings);
      return defaultSettings;
    },
  },
  
  clearAll: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_PREFIX + 'user');
    localStorage.removeItem(STORAGE_PREFIX + 'courses');
    localStorage.removeItem(STORAGE_PREFIX + 'missions');
    localStorage.removeItem(STORAGE_PREFIX + 'settings');
  },
  
  isInitialized: (): boolean => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_PREFIX + 'user') !== null;
  },
  
  initialize: () => {
    if (!storage.isInitialized()) {
      storage.user.save(defaultUserProgress);
      storage.courses.save(defaultCourses);
      storage.missions.save(defaultMissions);
      storage.settings.save(defaultSettings);
    }
  },
};

export { saveProgress, loadProgress };