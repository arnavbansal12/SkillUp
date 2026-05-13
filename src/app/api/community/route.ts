import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { COMMUNITY_POSTS } from "@/lib/real-data";

const SEED_USERS = [
  { id: "seed-emma", name: "Emma Wilson", email: "emma.seed@skillforge.local" },
  { id: "seed-sarah", name: "Sarah Chen", email: "sarah.seed@skillforge.local" },
  { id: "seed-david", name: "David Park", email: "david.seed@skillforge.local" },
  { id: "seed-maya", name: "Maya Patel", email: "maya.seed@skillforge.local" },
];

const EXTRA_SEED_CONTENT = [
  "Daily speaking reps are changing how confident I feel in meetings.",
  "Tried the pause-before-answer technique today and it worked really well.",
  "Body language practice tip: record yourself on mute for 2 minutes.",
  "Networking feels easier when I ask follow-up questions first.",
  "I used the SBI feedback model and avoided a difficult conversation spiral.",
  "Small improvement today: slower pace, clearer message.",
  "Conflict resolution got easier when I repeated the other person’s point first.",
  "Anyone else practicing eye contact with camera for remote calls?",
  "Today’s mission streak felt hard but worth it.",
  "Writing shorter emails has improved my response rates.",
];

function buildSeedPosts() {
  const primary = COMMUNITY_POSTS.map((post, idx) => ({
    id: `seed-primary-${post.id}`,
    userId: SEED_USERS[idx % SEED_USERS.length].id,
    content: post.content,
    author: post.author,
    role: idx % 2 === 0 ? "Expert" : "Member",
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(post.author)}`,
    likes: post.likes,
    comments: post.comments,
  }));

  const extra = Array.from({ length: 36 }, (_, i) => {
    const user = SEED_USERS[i % SEED_USERS.length];
    const text = EXTRA_SEED_CONTENT[i % EXTRA_SEED_CONTENT.length];
    return {
      id: `seed-extra-${i + 1}`,
      userId: user.id,
      content: `${text} #Day${(i % 14) + 1}`,
      author: user.name,
      role: i % 5 === 0 ? "Expert" : "Member",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.id)}&backgroundColor=b6e3f4,c0aede,d1d4f9`,
      likes: 4 + (i % 22),
      comments: i % 9,
    };
  });

  return [...primary, ...extra];
}

async function seedIfEmpty() {
  const existingCount = await prisma.post.count();
  if (existingCount > 0) return;

  await prisma.user.createMany({
    data: SEED_USERS.map((u) => ({
      id: u.id,
      email: u.email,
      name: u.name,
      xp: 0,
      level: 1,
      streak: 0,
    })),
    skipDuplicates: true,
  });

  await prisma.post.createMany({
    data: buildSeedPosts(),
    skipDuplicates: true,
  });
}

export async function GET() {
  try {
    await seedIfEmpty();
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    const content = String(body?.content ?? "").trim();
    if (!content) {
      return new NextResponse("Post content is required", { status: 400 });
    }

    let clerkUser: Awaited<ReturnType<typeof currentUser>> | null = null;
    try {
      clerkUser = await currentUser();
    } catch (clerkError) {
      console.error("currentUser lookup failed:", clerkError);
    }

    const name =
      `${clerkUser?.firstName || ""} ${clerkUser?.lastName || ""}`.trim() ||
      clerkUser?.username ||
      "Member";
    const email = clerkUser?.emailAddresses[0]?.emailAddress || `${userId}@skillforge.local`;
    const avatar = clerkUser?.imageUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`;

    // Ensure User exists before creating a Post (FK on Post.userId -> User.id).
    await prisma.user.upsert({
      where: { id: userId },
      update: { name, email },
      create: {
        id: userId,
        name,
        email,
        xp: 0,
        level: 1,
        streak: 0,
      },
    });

    const post = await prisma.post.create({
      data: {
        userId,
        content,
        author: name,
        avatar,
        role: "Member",
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post", message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
