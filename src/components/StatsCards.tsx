export default function StatsCards() {
  const stats = [
    { label: "Courses", value: "2/6", bg: "bg-primary-50" },
    { label: "Missions", value: "8/12", bg: "bg-success-bg" },
    { label: "Day Streak", value: "12 🔥", bg: "bg-warning-bg" },
  ];

  return (
    <div className="flex gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className={`${stat.bg} p-4 rounded-2xl card-shadow flex-1`}>
          <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
          <p className="text-sm font-medium text-neutral-600 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}