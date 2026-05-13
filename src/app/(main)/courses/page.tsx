"use client";

import { useState, useRef } from "react";
import { useGame } from "@/lib/GameContext";
import { COURSES } from "@/lib/real-data";
import {
  BookOpen, Play, CheckCircle2, Clock, ChevronRight,
  Search, Award, ArrowLeft,
  Sparkles, Zap, GraduationCap, Eye, BarChart3
} from "lucide-react";
import Image from "next/image";

type CourseType = typeof COURSES[0];

export default function CoursesPage() {
  const { state, dispatch } = useGame();
  const [filter, setFilter] = useState<"all" | "enrolled" | "completed">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<CourseType | null>(null);
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0);
  const [difficultyFilter, setDifficultyFilter] = useState<string>("All");
  const videoRef = useRef<HTMLIFrameElement>(null);

  const enrolledCourseIds = state.enrolledCourses || [];
  const completedCourseIds = state.completedCourses || [];

  const filteredCourses = COURSES.filter((course) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "enrolled" && enrolledCourseIds.includes(course.id)) ||
      (filter === "completed" && completedCourseIds.includes(course.id));
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === "All" || course.difficulty === difficultyFilter;
    return matchesFilter && matchesSearch && matchesDifficulty;
  });

  const handleEnroll = (courseId: string) => {
    if (!enrolledCourseIds.includes(courseId)) {
      dispatch({ type: "ENROLL_COURSE", payload: courseId });
    }
  };

  const handleCompleteCourse = (courseId: string) => {
    if (!completedCourseIds.includes(courseId)) {
      dispatch({ type: "COMPLETE_COURSE", payload: courseId });
      dispatch({ type: "ADD_XP", payload: 200 });
    }
  };

  const handleStartCourse = (course: CourseType) => {
    handleEnroll(course.id);
    setSelectedCourse(course);
    setCurrentLessonIdx(0);
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "Beginner": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Intermediate": return "bg-amber-100 text-amber-700 border-amber-200";
      case "Advanced": return "bg-rose-100 text-rose-700 border-rose-200";
      default: return "bg-neutral-100 text-neutral-600";
    }
  };

  const getDifficultyIcon = (diff: string) => {
    switch (diff) {
      case "Beginner": return <Sparkles className="w-3 h-3" />;
      case "Intermediate": return <Zap className="w-3 h-3" />;
      case "Advanced": return <Award className="w-3 h-3" />;
      default: return null;
    }
  };

  // === VIDEO PLAYER VIEW ===
  if (selectedCourse) {
    const currentLesson = selectedCourse.lessons[currentLessonIdx];
    const progress = Math.round(((currentLessonIdx + 1) / selectedCourse.lessons.length) * 100);

    return (
      <div className="pb-6 slide-up">
        {/* Back Navigation */}
        <button
          onClick={() => setSelectedCourse(null)}
          className="flex items-center gap-2 text-neutral-500 hover:text-primary-600 mb-6 group transition-colors"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Courses</span>
        </button>

        {/* Course Header */}
        <div className="bg-white rounded-3xl p-6 card-shadow mb-6 slide-up slide-up-delay-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 mb-2">{selectedCourse.title}</h1>
              <p className="text-neutral-500 leading-relaxed max-w-2xl">{selectedCourse.description}</p>
            </div>
            <span className={`px-3 py-1 rounded-xl text-xs font-semibold border flex items-center gap-1 ${getDifficultyColor(selectedCourse.difficulty)}`}>
              {getDifficultyIcon(selectedCourse.difficulty)}
              {selectedCourse.difficulty}
            </span>
          </div>
          {/* Progress Bar */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-700 ease-out progress-glow"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-primary-600">{progress}%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-2 slide-up slide-up-delay-2">
            <div className="bg-black rounded-3xl overflow-hidden card-shadow relative aspect-video">
              <iframe
                key={`${selectedCourse.id}-${currentLessonIdx}`}
                src={`https://www.youtube.com/embed/${currentLesson.videoId}?rel=0&modestbranding=1&autoplay=1`}
                title={currentLesson.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ border: 'none' }}
              />
            </div>
            {/* Current Lesson Info */}
            <div className="bg-white rounded-3xl p-5 mt-4 card-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-primary-500 font-semibold mb-1">
                    Lesson {currentLessonIdx + 1} of {selectedCourse.lessons.length}
                  </p>
                  <h3 className="text-lg font-bold text-neutral-900">{currentLesson.title}</h3>
                </div>
                <div className="flex items-center gap-2 text-neutral-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{currentLesson.duration}</span>
                </div>
              </div>
              {/* Lesson Navigation */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setCurrentLessonIdx(Math.max(0, currentLessonIdx - 1))}
                  disabled={currentLessonIdx === 0}
                  className="px-4 py-2 bg-neutral-100 text-neutral-600 rounded-xl font-medium hover:bg-neutral-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {currentLessonIdx < selectedCourse.lessons.length - 1 ? (
                  <button
                    onClick={() => setCurrentLessonIdx(currentLessonIdx + 1)}
                    className="px-4 py-2 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors flex items-center gap-2"
                  >
                    Next Lesson
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleCompleteCourse(selectedCourse.id);
                      setSelectedCourse(null);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all flex items-center gap-2 neon-glow"
                    style={{ '--tw-shadow-color': 'rgba(16,185,129,0.4)' } as React.CSSProperties}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Complete Course (+200 XP)
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Lesson Sidebar */}
          <div className="slide-up slide-up-delay-3">
            <div className="bg-white rounded-3xl p-5 card-shadow sticky top-6">
              <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary-500" />
                Course Lessons
              </h3>
              <div className="space-y-2">
                {selectedCourse.lessons.map((lesson, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentLessonIdx(idx)}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl text-left transition-all group ${
                      idx === currentLessonIdx
                        ? "bg-primary-50 border-2 border-primary-200"
                        : "hover:bg-neutral-50 border-2 border-transparent"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      idx === currentLessonIdx
                        ? "bg-primary-500 text-white"
                        : idx < currentLessonIdx
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-neutral-100 text-neutral-400 group-hover:bg-neutral-200"
                    }`}>
                      {idx < currentLessonIdx ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : idx === currentLessonIdx ? (
                        <Play className="w-4 h-4" />
                      ) : (
                        <span className="text-xs font-bold">{idx + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${
                        idx === currentLessonIdx ? "text-primary-700" : "text-neutral-700"
                      }`}>{lesson.title}</p>
                      <p className="text-xs text-neutral-400">{lesson.duration}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === COURSE CATALOG VIEW ===
  return (
    <div className="pb-6">
      {/* Header */}
      <div className="mb-8 slide-up">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900">Courses</h1>
        </div>
        <p className="text-neutral-500 ml-[52px]">Master communication skills with expert-led video courses</p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-3xl p-5 card-shadow mb-6 slide-up slide-up-delay-1">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses..."
              className="w-full pl-12 pr-4 py-3 bg-neutral-50 rounded-2xl border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
            />
          </div>
          {/* Status Filter */}
          <div className="flex gap-2">
            {(["all", "enrolled", "completed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-3 rounded-2xl font-medium capitalize transition-all ${
                  filter === f
                    ? "bg-primary-600 text-white shadow-lg shadow-primary-200"
                    : "bg-neutral-50 text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        {/* Difficulty Filter */}
        <div className="flex gap-2 mt-3">
          {["All", "Beginner", "Intermediate", "Advanced"].map((d) => (
            <button
              key={d}
              onClick={() => setDifficultyFilter(d)}
              className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                difficultyFilter === d
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-50 text-neutral-500 hover:bg-neutral-100"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4 mb-6 slide-up slide-up-delay-2">
        <div className="bg-white rounded-2xl p-4 card-shadow flex items-center gap-3 premium-card">
          <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <p className="text-xl font-bold text-neutral-900">{COURSES.length}</p>
            <p className="text-xs text-neutral-500">Total Courses</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 card-shadow flex items-center gap-3 premium-card">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-xl font-bold text-neutral-900">{enrolledCourseIds.length}</p>
            <p className="text-xs text-neutral-500">Enrolled</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 card-shadow flex items-center gap-3 premium-card">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-xl font-bold text-neutral-900">{completedCourseIds.length}</p>
            <p className="text-xs text-neutral-500">Completed</p>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      {filteredCourses.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 card-shadow text-center slide-up slide-up-delay-3">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-neutral-400" />
          </div>
          <h3 className="text-xl font-bold text-neutral-900 mb-2">No courses found</h3>
          <p className="text-neutral-500">Try adjusting your filters or search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredCourses.map((course, idx) => {
            const isEnrolled = enrolledCourseIds.includes(course.id);
            const isCompleted = completedCourseIds.includes(course.id);

            return (
              <div
                key={course.id}
                className={`stagger-item bg-white rounded-3xl overflow-hidden card-shadow hover-lift group relative ${
                  isCompleted ? "ring-2 ring-emerald-200" : ""
                }`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Completion badge */}
                {isCompleted && (
                  <div className="absolute top-4 right-4 z-10 bg-emerald-500 text-white p-2 rounded-xl shadow-lg">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}

                {/* Video Thumbnail */}
                <div
                  className="relative h-44 bg-gradient-to-br from-neutral-800 to-neutral-900 overflow-hidden cursor-pointer"
                  onClick={() => handleStartCourse(course)}
                >
                  <Image
                    src={`https://img.youtube.com/vi/${course.videoId}/maxresdefault.jpg`}
                    alt={course.title}
                    fill
                    className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 text-primary-600 ml-1" />
                    </div>
                  </div>
                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1 backdrop-blur-sm">
                    <Clock className="w-3 h-3" />
                    {course.duration}
                  </div>
                  {/* Lesson Count */}
                  <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-lg text-xs font-medium backdrop-blur-sm">
                    {course.lessons.length} lessons
                  </div>
                </div>

                {/* Course Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-neutral-900 group-hover:text-primary-600 transition-colors leading-tight">
                      {course.title}
                    </h3>
                  </div>

                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border mb-3 ${getDifficultyColor(course.difficulty)}`}>
                    {getDifficultyIcon(course.difficulty)}
                    {course.difficulty}
                  </span>

                  {/* Full Description */}
                  <div className="mb-4">
                    <p className="text-sm text-neutral-500 leading-relaxed transition-all">
                      {course.description}
                    </p>
                  </div>

                  {/* Action Button */}
                  {isCompleted ? (
                    <button
                      onClick={() => handleStartCourse(course)}
                      className="w-full py-3 bg-emerald-50 text-emerald-700 rounded-2xl font-semibold hover:bg-emerald-100 transition-all flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Review Course
                    </button>
                  ) : isEnrolled ? (
                    <button
                      onClick={() => handleStartCourse(course)}
                      className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-200/50"
                    >
                      <Play className="w-4 h-4" />
                      Continue Learning
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStartCourse(course)}
                      className="w-full py-3 bg-neutral-900 text-white rounded-2xl font-semibold hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      <Sparkles className="w-4 h-4 group-hover/btn:animate-spin" />
                      Start Course
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
