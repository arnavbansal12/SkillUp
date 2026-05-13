const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/lib/real-data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace videos
const updates = {
  "active-listening": { videoId: "7wUCyjiyXdg", lessons: ["7wUCyjiyXdg", "t685WM5R6aM", "o6JGi2voyDM"] },
  "public-speaking": { videoId: "HAnw168huqA", lessons: ["HAnw168huqA", "JF8rlKuSoFM", "3RiIkT4OPM8"] },
  "body-language": { videoId: "KZI97O8R9ZE", lessons: ["KZI97O8R9ZE", "0ZjE9YXRVeM", "VRJzvJ5XPQI"] },
  "persuasion": { videoId: "R2ft5ZpaZP4", lessons: ["R2ft5ZpaZP4", "V6hHNh97FIs", "xe4j7dKA_cI"] },
  "conflict-resolution": { videoId: "jUF9sY4HvxY", lessons: ["jUF9sY4HvxY", "YdbE7r0ucxk", "1z-SkzHqiNk"] },
  "networking": { videoId: "f_N3PGvnVKg", lessons: ["f_N3PGvnVKg", "-9_HkEbV9hU", "i9FW-nmFdlI"] },
  "emotional-intelligence": { videoId: "erfgEHHfFkU", lessons: ["erfgEHHfFkU", "3uFpL_990iQ", "l3i8SfOk5FU"] },
  "storytelling": { videoId: "e8nMhb9Z7ko", lessons: ["e8nMhb9Z7ko", "50w4QGdChII", "iywvNIWKbPI"] },
  "feedback-delivery": { videoId: "wtl5UrrgU8c", lessons: ["wtl5UrrgU8c", "-oRKr5xA9N0", "6Yx9CP2xFvg"] },
  "written-communication": { videoId: "1XctnF7C74s", lessons: ["1XctnF7C74s", "H3tw-qqnwj4", "OIpb3FSWXK0"] },
  "leadership-communication": { videoId: "qp0HIF3SfI4", lessons: ["qp0HIF3SfI4", "pVeq-0dIqpk", "QFpVVm7AnKI"] },
  "intercultural-communication": { videoId: "qg73vGHUWbA", lessons: ["qg73vGHUWbA", "qKViQSnW-UA", "c3Nfs_TqSDc"] },
  "digital-etiquette": { videoId: "Y_-s4pxFpnU", lessons: ["Y_-s4pxFpnU", "b2ifNflhQ5k", "uKRJjv5eKxg"] }
};

const lines = content.split('\n');

let insideCourse = null;
let lessonIndex = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const idMatch = line.match(/id:\s*"([^"]+)"/);
  
  if (idMatch && updates[idMatch[1]] && !line.includes('title')) {
    insideCourse = idMatch[1];
    lessonIndex = 0;
  }
  
  if (insideCourse) {
    if (line.includes('videoId:') && !line.includes('lessons:')) {
      const isLesson = line.includes('{ title:');
      if (!isLesson) {
        lines[i] = line.replace(/videoId:\s*"[^"]+"/, `videoId: "${updates[insideCourse].videoId}"`);
      } else {
        if (lessonIndex < updates[insideCourse].lessons.length) {
          lines[i] = line.replace(/videoId:\s*"[^"]+"/, `videoId: "${updates[insideCourse].lessons[lessonIndex]}"`);
          lessonIndex++;
        }
      }
    }
  }
}

content = lines.join('\n');

// Replace community posts
const communityPostsRegex = /export const COMMUNITY_POSTS = \[([\s\S]*?)\];/;
const newCommunityPosts = `export const COMMUNITY_POSTS = [
  { id: 1, author: "Emma Wilson", role: "Top Contributor", avatar: "EW", time: "2 hours ago", content: "Just hit 15,000 XP! Consistency is key - I practiced communication skills every day for a month. My tip: start with active listening, it's the foundation of all good communication. 💪", likes: 156, comments: 42, tags: ["#Milestone", "#Motivation", "#ActiveListening"], featured: true },
  { id: 2, author: "Sarah Chen", role: "Communication Coach", avatar: "SC", time: "4 hours ago", content: "New to public speaking? Here's my 3-step technique: 1) Pause before you start, 2) Make eye contact with 3 people, 3) End with a clear call-to-action. Try it and let me know how it goes!", likes: 234, comments: 67, tags: ["#PublicSpeaking", "#Tips"], featured: true },
  { id: 3, author: "David Park", role: "Active Learner", avatar: "DP", time: "6 hours ago", content: "Completed my first negotiation exercise today! The anchoring technique really works. Used it when discussing my salary and got a better offer than expected! 🎉", likes: 189, comments: 54, tags: ["#Negotiation", "#Win"], featured: false },
  { id: 4, author: "Maya Patel", role: "Pro Member", avatar: "MP", time: "8 hours ago", content: "Body language tip: When speaking to someone, mirror their posture slightly. It builds rapport unconsciously. Learned this from the Body Language course - game changer!", likes: 145, comments: 38, tags: ["#BodyLanguage", "#Rapport"], featured: false },
  { id: 5, author: "Alex Kim", role: "Beginner", avatar: "AK", time: "12 hours ago", content: "I used the SBI model for feedback today and my colleague responded really well. We actually had a productive conversation instead of getting defensive.", likes: 89, comments: 15, tags: ["#Feedback", "#Workplace"], featured: false },
  { id: 6, author: "Sofia Rodriguez", role: "Pro Member", avatar: "SR", time: "1 day ago", content: "Does anyone else get incredibly nervous before presenting? What are your pre-presentation routines to calm the nerves? Asking for a friend 😅", likes: 210, comments: 84, tags: ["#PublicSpeaking", "#Anxiety"], featured: true },
  { id: 7, author: "James Liu", role: "Active Learner", avatar: "JL", time: "2 days ago", content: "Just finished the Networking course. Attended a local tech meetup and actually enjoyed it instead of standing in the corner! The 'Perfect Introduction' framework saved me.", likes: 134, comments: 22, tags: ["#Networking", "#Success"], featured: false },
  { id: 8, author: "Joshua Santosa", role: "Top Contributor", avatar: "JS", time: "3 days ago", content: "Storytelling is the ultimate cheat code for interviews. Don't just list your skills, tell a story about how you used them to solve a problem.", likes: 432, comments: 56, tags: ["#Storytelling", "#CareerTips"], featured: true },
  { id: 9, author: "Lisa Wang", role: "Communication Coach", avatar: "LW", time: "4 days ago", content: "Remote work communication tip: Assume positive intent. Without body language and tone of voice, text can seem harsh. Give your team the benefit of the doubt! 🌟", likes: 288, comments: 41, tags: ["#RemoteWork", "#Empathy"], featured: false },
  { id: 10, author: "Michael Brown", role: "Beginner", avatar: "MB", time: "5 days ago", content: "I've been practicing active listening with my partner. Today she asked what was different about me because I seemed 'so much more present'. The skills here work in real life too!", likes: 512, comments: 89, tags: ["#ActiveListening", "#Relationships"], featured: true }
];`;

content = content.replace(communityPostsRegex, newCommunityPosts);

fs.writeFileSync(filePath, content, 'utf8');
console.log('done');
