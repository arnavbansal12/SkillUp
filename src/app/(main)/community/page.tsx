"use client";

import { useState, useEffect } from "react";
import { useGame } from "@/lib/GameContext";
import {
  Heart, Send, Star, Users,
  Bookmark, Share2, MoreHorizontal, Image as ImageIcon,
  Smile, Hash, MessageSquare, Loader2
} from "lucide-react";
import Image from "next/image";

interface CommunityPost {
  id: string;
  userId: string;
  content: string;
  author: string;
  role: string;
  avatar: string | null;
  likes: number;
  comments: number;
  createdAt: string;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

export default function CommunityPage() {
  const { state } = useGame();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [newPost, setNewPost] = useState("");
  const [filter, setFilter] = useState<"all" | "featured" | "recent">("all");
  const [showPostBox, setShowPostBox] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postError, setPostError] = useState("");

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/community");
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(p =>
      p.id === postId
        ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 }
        : p
    ));
  };

  const handleBookmark = (postId: string) => {
    setPosts(prev => prev.map(p =>
      p.id === postId ? { ...p, isBookmarked: !p.isBookmarked } : p
    ));
  };

  const handleSubmitPost = async () => {
    if (!newPost.trim()) return;
    
    try {
      setIsSubmitting(true);
      setPostError("");
      const res = await fetch("/api/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newPost }),
      });

      if (res.ok) {
        const createdPost = await res.json();
        setPosts(prev => [createdPost, ...prev]);
        setNewPost("");
        setShowPostBox(false);
        await fetchPosts();
      } else {
        const errorPayload = await res.json().catch(() => null);
        const errorMessage = errorPayload?.message || "Failed to share post. Please try again.";
        console.error("Server error:", errorPayload);
        setPostError(errorMessage);
      }
    } catch (err) {
      console.error("Network error:", err);
      setPostError("Something went wrong. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredPosts = posts.filter(p => {
    if (filter === "featured") return p.role === "Expert" || p.likes > 10;
    return true;
  });

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
  };

  return (
    <div className="pb-6">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-7 mb-6 overflow-hidden slide-up">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3 orb-1" />
        <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 orb-2" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-8 h-8 text-white" />
            <h1 className="text-3xl font-bold text-white">Community</h1>
          </div>
          <p className="text-blue-100">Connect, share insights, and learn from fellow communicators</p>
        </div>
      </div>

      {/* Create Post */}
      <div className="bg-white rounded-3xl p-5 card-shadow mb-6 slide-up slide-up-delay-1">
        {!showPostBox ? (
          <button
            onClick={() => setShowPostBox(true)}
            className="w-full flex items-center gap-3 p-3 bg-neutral-50 rounded-2xl text-left hover:bg-neutral-100 transition-colors"
          >
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center text-sm font-bold text-primary-600 flex-shrink-0">
              {getInitials(state.userName || "User")}
            </div>
            <span className="text-neutral-400">Share your thoughts with the community...</span>
          </button>
        ) : (
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center text-sm font-bold text-primary-600 flex-shrink-0">
                {getInitials(state.userName || "User")}
              </div>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What's on your mind? Share a tip, win, or question..."
                className="flex-1 px-4 py-3 bg-neutral-50 rounded-2xl border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none resize-none transition-all"
                rows={3}
                autoFocus
              />
            </div>
            <div className="flex items-center justify-between pl-[52px]">
              <div className="flex gap-2">
                <button className="p-2 text-neutral-400 hover:text-primary-500 hover:bg-primary-50 rounded-xl transition-colors">
                  <ImageIcon className="w-5 h-5" />
                </button>
                <button className="p-2 text-neutral-400 hover:text-primary-500 hover:bg-primary-50 rounded-xl transition-colors">
                  <Smile className="w-5 h-5" />
                </button>
                <button className="p-2 text-neutral-400 hover:text-primary-500 hover:bg-primary-50 rounded-xl transition-colors">
                  <Hash className="w-5 h-5" />
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { setShowPostBox(false); setNewPost(""); }}
                  className="px-4 py-2 text-neutral-500 rounded-xl font-medium hover:bg-neutral-100 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitPost}
                  disabled={!newPost.trim() || isSubmitting}
                  className="px-5 py-2 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  Post
                </button>
              </div>
            </div>
            {postError && <p className="text-sm text-rose-600 pl-[52px]">{postError}</p>}
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 slide-up slide-up-delay-2">
        {[
          { key: "all", label: "All Posts" },
          { key: "featured", label: "⭐ Featured" },
          { key: "recent", label: "Most Recent" },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key as typeof filter)}
            className={`px-4 py-2.5 rounded-2xl font-medium transition-all ${
              filter === f.key
                ? "bg-neutral-900 text-white shadow-lg"
                : "bg-white text-neutral-600 hover:bg-neutral-50 card-shadow"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
          <p className="text-neutral-500 font-medium">Loading community discussions...</p>
        </div>
      )}

      {/* No Posts State */}
      {!isLoading && filteredPosts.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center card-shadow">
          <MessageSquare className="w-12 h-12 text-neutral-200 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-neutral-900 mb-2">No posts yet</h3>
          <p className="text-neutral-500">Be the first to share something with the community!</p>
        </div>
      )}

      {/* Posts */}
      <div className="space-y-4">
        {filteredPosts.map((post, idx) => (
          <div
            key={post.id}
            className={`stagger-item bg-white rounded-3xl p-5 card-shadow hover-lift ${
              post.role === "Expert" ? "ring-2 ring-yellow-200" : ""
            }`}
            style={{ animationDelay: `${0.3 + idx * 0.1}s` }}
          >
            {/* Author Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 relative rounded-xl overflow-hidden bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                  {post.avatar ? (
                    <Image src={post.avatar} alt={post.author} fill className="object-cover" unoptimized />
                  ) : (
                    getInitials(post.author)
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-neutral-900">{post.author}</p>
                    {post.role === "Expert" && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <span className="px-2 py-0.5 bg-primary-50 text-primary-600 rounded-md font-medium">{post.role}</span>
                    <span>•</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <button className="p-2 text-neutral-300 hover:text-neutral-500 hover:bg-neutral-50 rounded-xl transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <p className="text-neutral-700 leading-relaxed mb-3">{post.content}</p>

            {/* Actions */}
            <div className="flex items-center gap-1 pt-3 border-t border-neutral-100">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all font-medium text-sm ${
                  post.isLiked
                    ? "text-red-500 bg-red-50 hover:bg-red-100"
                    : "text-neutral-400 hover:text-red-500 hover:bg-red-50"
                }`}
              >
                <Heart className={`w-4 h-4 ${post.isLiked ? "fill-red-500" : ""}`} />
                {post.likes}
              </button>
              <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-neutral-400 hover:text-blue-500 hover:bg-blue-50 transition-all font-medium text-sm">
                <MessageSquare className="w-4 h-4" />
                {post.comments}
              </button>
              <button
                onClick={() => handleBookmark(post.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all font-medium text-sm ${
                  post.isBookmarked
                    ? "text-yellow-500 bg-yellow-50"
                    : "text-neutral-400 hover:text-yellow-500 hover:bg-yellow-50"
                }`}
              >
                <Bookmark className={`w-4 h-4 ${post.isBookmarked ? "fill-yellow-500" : ""}`} />
              </button>
              <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-neutral-400 hover:text-primary-500 hover:bg-primary-50 transition-all font-medium text-sm ml-auto">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
