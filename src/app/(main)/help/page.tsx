"use client";

import { useState } from "react";
import { FAQ_DATA } from "@/lib/real-data";
import {
  Search, Book, MessageCircle, Mail, ChevronDown,
  Video, MessageSquare, Send, HelpCircle, CheckCircle2,
  Sparkles
} from "lucide-react";
import Link from "next/link";

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("Getting Started");
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setContactForm({ name: "", email: "", message: "" });
  };

  // Search across all FAQ categories
  const allQuestions = FAQ_DATA.flatMap(c => c.questions.map(q => ({ ...q, category: c.category })));
  const searchResults = searchQuery.trim()
    ? allQuestions.filter(q =>
        q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.a.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const currentFAQ = FAQ_DATA.find(c => c.category === activeCategory)?.questions || [];

  return (
    <div className="pb-6">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-600 rounded-3xl p-7 mb-6 overflow-hidden slide-up">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3 orb-1" />
        <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 orb-2" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <HelpCircle className="w-8 h-8 text-white" />
            <h1 className="text-3xl font-bold text-white">Help Center</h1>
          </div>
          <p className="text-blue-100 mb-5">Find answers, get support, and learn more about SkillUp</p>

          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for help..."
                className="w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 focus:border-white/40 outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search Results */}
      {searchQuery.trim() && (
        <div className="bg-white rounded-3xl p-5 card-shadow mb-6 slide-up">
          <h3 className="font-bold text-neutral-900 mb-3">
            {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} for &ldquo;{searchQuery}&rdquo;
          </h3>
          {searchResults.length === 0 ? (
            <p className="text-neutral-500 text-sm">No results found. Try different keywords.</p>
          ) : (
            <div className="space-y-2">
              {searchResults.map((item, idx) => (
                <div key={idx} className="border border-neutral-200 rounded-2xl overflow-hidden hover:border-primary-200 transition-colors">
                  <button
                    onClick={() => setExpandedQuestion(expandedQuestion === item.q ? null : item.q)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-neutral-50 transition-colors"
                  >
                    <div>
                      <span className="font-medium text-neutral-900 block">{item.q}</span>
                      <span className="text-xs text-primary-500 font-medium">{item.category}</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-neutral-400 transition-transform flex-shrink-0 ${expandedQuestion === item.q ? "rotate-180" : ""}`} />
                  </button>
                  {expandedQuestion === item.q && (
                    <div className="px-4 pb-4 slide-up">
                      <p className="text-neutral-600 leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 slide-up slide-up-delay-1">
        {[
          { href: "/courses", icon: Book, label: "Learning Guide", desc: "Step-by-step tutorial", color: "bg-primary-100 text-primary-600" },
          { href: "/courses", icon: Video, label: "Video Tutorials", desc: "Watch & learn", color: "bg-blue-100 text-blue-600" },
          { href: "/community", icon: MessageSquare, label: "Community", desc: "Get peer support", color: "bg-emerald-100 text-emerald-600" },
          { href: "/achievements", icon: Sparkles, label: "Achievements", desc: "Track progress", color: "bg-purple-100 text-purple-600" },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="bg-white rounded-3xl p-5 card-shadow hover-lift group cursor-pointer"
          >
            <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">{item.label}</h3>
            <p className="text-sm text-neutral-500">{item.desc}</p>
          </Link>
        ))}
      </div>

      {/* FAQ Section */}
      {!searchQuery.trim() && (
        <div className="bg-white rounded-3xl p-6 card-shadow mb-6 slide-up slide-up-delay-2">
          <h2 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary-500" />
            Frequently Asked Questions
          </h2>
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {FAQ_DATA.map((cat) => (
              <button
                key={cat.category}
                onClick={() => { setActiveCategory(cat.category); setExpandedQuestion(null); }}
                className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.category
                    ? "bg-neutral-900 text-white shadow-lg"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {currentFAQ.map((item, idx) => (
              <div key={idx} className="border border-neutral-200 rounded-2xl overflow-hidden stagger-item hover:border-primary-200 transition-colors" style={{ animationDelay: `${0.3 + idx * 0.1}s` }}>
                <button
                  onClick={() => setExpandedQuestion(expandedQuestion === item.q ? null : item.q)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-neutral-50 transition-colors"
                >
                  <span className="font-medium text-neutral-900 pr-4">{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-neutral-400 transition-transform flex-shrink-0 ${expandedQuestion === item.q ? "rotate-180" : ""}`} />
                </button>
                {expandedQuestion === item.q && (
                  <div className="px-4 pb-4 slide-up">
                    <p className="text-neutral-600 leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 slide-up slide-up-delay-3">
        <div className="bg-white rounded-3xl p-6 card-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center">
              <Mail className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">Email Support</h3>
              <p className="text-sm text-neutral-500">Response within 24 hours</p>
            </div>
          </div>
          <a href="mailto:support@skillup.com" className="block w-full py-3 bg-neutral-100 text-neutral-700 rounded-2xl font-medium hover:bg-neutral-200 transition-colors text-center">
support@skillup.com
          </a>
        </div>
        <div className="bg-white rounded-3xl p-6 card-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">Quick Message</h3>
              <p className="text-sm text-neutral-500">We&apos;ll get back to you ASAP</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Your name"
              value={contactForm.name}
              onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
              className="w-full px-4 py-2.5 bg-neutral-50 rounded-xl border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
              required
            />
            <input
              type="email"
              placeholder="Your email"
              value={contactForm.email}
              onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
              className="w-full px-4 py-2.5 bg-neutral-50 rounded-xl border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
              required
            />
            <textarea
              placeholder="How can we help?"
              value={contactForm.message}
              onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
              className="w-full px-4 py-2.5 bg-neutral-50 rounded-xl border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none resize-none transition-all"
              rows={3}
              required
            />
            <button type="submit" className="w-full py-3 bg-primary-600 text-white rounded-2xl font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              {submitted ? "Message Sent! ✓" : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      {/* Success Toast */}
      {submitted && (
        <div className="fixed bottom-6 right-6 bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-2 z-50 bounce-in">
          <CheckCircle2 className="w-5 h-5" />
          Message sent successfully!
        </div>
      )}
    </div>
  );
}
