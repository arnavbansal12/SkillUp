import urllib.request
import urllib.parse
import re
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

topics = [
    "Active Listening Skills", "Empathetic Listening", "Listening Barriers",
    "Think Fast Talk Smart", "Vocal Mechanics", "Audience Engagement",
    "The Science of Cues body language", "Micro-expressions", "Confidence Postures",
    "The Art of Persuasion", "Building Instant Rapport", "Subconscious Influence",
    "How to Have Better Conflicts", "De-escalation Tools", "The Peace Formula",
    "The Perfect Introduction", "Small Talk to Big Talk", "Effective Follow-ups",
    "Four Domains of EQ", "Self-Awareness emotional intelligence", "Managing Triggers",
    "The Hero's Journey storytelling", "Hooking Your Audience", "Story Structure",
    "Feedback That Works", "The SBI Model feedback", "Handling Defensiveness",
    "Email Etiquette Tips", "Concise Writing", "Professional Tone",
    "The Golden Circle Simon Sinek", "Building Trust Leadership", "Infinite Game Mindset",
    "The Culture Map", "High-Context Cultures", "Global Collaboration",
    "Golden Rules of Netiquette", "Slack & Teams Etiquette", "Video Call Presence"
]

results = {}
for topic in topics:
    try:
        url = "https://www.youtube.com/results?search_query=" + urllib.parse.quote(topic)
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req, context=ctx).read().decode('utf-8')
        video_ids = re.findall(r'"videoId":"([a-zA-Z0-9_-]{11})"', html)
        # filter out common google/youtube ids
        for vid in video_ids:
            if vid not in results.values():
                results[topic] = vid
                print(f"{topic}: {vid}")
                break
    except Exception as e:
        print(f"Error {topic}: {e}")

