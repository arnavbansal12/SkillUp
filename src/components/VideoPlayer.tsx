"use client";

import { useState } from "react";
import { Play, Maximize2, Volume2 } from "lucide-react";
import Image from "next/image";

interface VideoPlayerProps {
  videoId: string;
  title?: string;
  autoPlay?: boolean;
}

export default function VideoPlayer({ videoId: initialVideoId, title, autoPlay = false }: VideoPlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPreview, setShowPreview] = useState(!autoPlay);

  // Extract video ID from potential full YouTube URLs
  const extractVideoId = (input: string) => {
    if (!input) return "";
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = input.match(regExp);
    return (match && match[7].length === 11) ? match[7] : input;
  };

  const videoId = extractVideoId(initialVideoId);

  // Using standard YouTube embed URL with improved parameters
  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=${autoPlay ? 1 : 0}&showinfo=0`;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className="relative w-full rounded-[2.5rem] overflow-hidden bg-neutral-950 shadow-2xl border border-neutral-800/50 group aspect-video">
      {showPreview ? (
        <div className="absolute inset-0 z-20 cursor-pointer group/preview" onClick={() => setShowPreview(false)}>
          <Image 
            src={thumbnailUrl} 
            alt={title || "Video thumbnail"}
            fill
            className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-1000"
            unoptimized
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-all duration-500">
            <div className="relative">
              {/* Outer Pulse */}
              <div className="absolute inset-0 rounded-full bg-primary-500/20 animate-ping" />
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-500 relative z-10">
                <Play className="w-10 h-10 text-primary-600 fill-primary-600 ml-1" />
              </div>
            </div>
          </div>
          
          <div className="absolute top-8 left-8 z-30">
            <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Available to Stream</span>
            </div>
          </div>

          {title && (
            <div className="absolute bottom-8 left-8 right-8 z-30">
              <h3 className="text-2xl font-black text-white drop-shadow-2xl line-clamp-2 mb-2">{title}</h3>
              <div className="flex items-center gap-4 text-white/60 text-xs font-bold">
                <span className="flex items-center gap-1.5"><Volume2 className="w-4 h-4" /> HD Audio</span>
                <span className="flex items-center gap-1.5"><Maximize2 className="w-4 h-4" /> Full Screen</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <iframe
            src={embedUrl}
            title={title || "Video player"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className={`absolute inset-0 w-full h-full border-none z-10 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsLoaded(true)}
          />
          
          {!isLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900 z-0">
              <div className="relative mb-6">
                <div className="w-16 h-16 border-4 border-primary-500/20 rounded-full" />
                <div className="absolute inset-0 w-16 h-16 border-4 border-t-primary-500 rounded-full animate-spin" />
              </div>
              <p className="text-white text-sm font-black tracking-widest uppercase animate-pulse">Initializing Stream</p>
            </div>
          )}

        </>
      )}
    </div>
  );
}
