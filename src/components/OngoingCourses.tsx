"use client";

import Image from "next/image";
import { Star } from "lucide-react";

const courses = [
  {
    title: "Active Listening",
    subtitle: "12/20 Lessons",
    rating: "4.9",
    reviews: "2.3k",
    progress: 60,
    bgColor: "bg-purple-50",
    imageUrl: "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=400&h=300&fit=crop&crop=face",
  },
  {
    title: "Public Speaking",
    subtitle: "8/15 Lessons",
    rating: "4.8",
    reviews: "1.8k",
    progress: 53,
    bgColor: "bg-blue-50",
    imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop",
  },
];

export default function OngoingCourses() {
  return (
    <div className="bg-white rounded-3xl p-6 card-shadow">
      <h2 className="text-lg font-bold text-neutral-900 mb-4">Ongoing Courses</h2>
      <div className="grid grid-cols-2 gap-4">
        {courses.map((course, index) => (
          <div 
            key={index} 
            className={`${course.bgColor} rounded-2xl p-4`}
          >
            <div className="h-36 rounded-xl overflow-hidden mb-3 relative">
              <Image
                src={course.imageUrl}
                alt={course.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-bold text-neutral-900">{course.title}</h3>
                <p className="text-sm text-neutral-500">{course.subtitle}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 text-warning fill-warning" />
                  <span className="text-sm font-semibold text-neutral-900">{course.rating}</span>
                  <span className="text-xs text-neutral-400">({course.reviews} Reviews)</span>
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-500 rounded-full transition-all"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-neutral-700">{course.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}