"use client";

const quests = [
  { 
    title: "Practice Active Listening", 
    subtitle: "Today", 
    progress: "0/1",
    chestType: "gems",
    xpBadge: "150"
  },
  { 
    title: "Complete Speaking Exercise", 
    subtitle: "2 Days", 
    claimable: true,
    chestType: "coins",
    xpBadge: "200"
  },
  { 
    title: "Review Body Language", 
    subtitle: "3 Days", 
    progress: "0/1",
    chestType: "gems",
    xpBadge: "100"
  },
];

const QuestChest = ({ type }: { type: 'gems' | 'coins' }) => (
  <div className="relative">
    <svg viewBox="0 0 60 52" className="w-12 h-10">
      {type === 'gems' ? (
        <>
          <path d="M8 24 C8 14, 20 6, 30 6 C40 6, 52 14, 52 24 L52 44 C52 48, 40 52, 30 52 C20 52, 8 48, 8 44 Z" fill="#10B981" />
          <path d="M30 6 C20 6, 8 14, 8 24 L8 44 C8 48, 20 52, 30 52 C40 52, 52 48, 52 44 L52 24 C52 14, 40 6, 30 6" fill="#059669" />
          <path d="M8 24 L52 24 L52 28 L8 28 Z" fill="#047857" />
          <rect x="24" y="22" width="12" height="14" rx="2" fill="#FEF3C7" />
          <rect x="26" y="25" width="8" height="3" rx="1" fill="#D97706" />
          <circle cx="22" cy="3" r="2.5" fill="#38BDF8" />
          <circle cx="38" cy="5" r="3" fill="#60A5FA" />
          <circle cx="30" cy="0" r="2" fill="#3B82F6" />
        </>
      ) : (
        <>
          <path d="M8 24 C8 14, 20 6, 30 6 C40 6, 52 14, 52 24 L52 44 C52 48, 40 52, 30 52 C20 52, 8 48, 8 44 Z" fill="#FBBF24" />
          <path d="M30 6 C20 6, 8 14, 8 24 L8 44 C8 48, 20 52, 30 52 C40 52, 52 48, 52 44 L52 24 C52 14, 40 6, 30 6" fill="#F59E0B" />
          <path d="M8 24 L52 24 L52 28 L8 28 Z" fill="#D97706" />
          <rect x="24" y="22" width="12" height="14" rx="2" fill="#FEF3C7" />
          <rect x="26" y="25" width="8" height="3" rx="1" fill="#D97706" />
          <circle cx="22" cy="3" r="2.5" fill="#FCD34D" />
          <circle cx="38" cy="5" r="3" fill="#FCD34D" />
          <circle cx="30" cy="0" r="3" fill="#FCD34D" />
        </>
      )}
    </svg>
    <span className={`absolute -top-1 -right-2 ${type === 'gems' ? 'bg-primary-600' : 'bg-cyan-500'} text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full`}>
      {type === 'gems' ? '250' : '500'}
    </span>
  </div>
);

export default function Quests() {
  return (
    <div className="bg-white rounded-3xl p-6 card-shadow">
      <h2 className="text-lg font-bold text-neutral-900 mb-4">Daily Missions</h2>
      <div className="flex flex-col gap-4">
        {quests.map((quest, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl">
            <div className="flex items-center gap-4">
              <QuestChest type={quest.chestType as 'gems' | 'coins'} />
              <div>
                <p className="font-semibold text-neutral-900">{quest.title}</p>
                <p className="text-xs text-neutral-400">{quest.subtitle}</p>
              </div>
            </div>
            {quest.claimable ? (
              <button className="bg-warning text-white text-sm font-semibold px-4 py-2 rounded-full">
                Claim
              </button>
            ) : (
              <span className="text-sm font-medium text-neutral-500">{quest.progress}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}