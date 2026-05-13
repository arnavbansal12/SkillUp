import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
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
    const { content } = body;
    const clerkUser = await currentUser();

    const post = await prisma.post.create({
      data: {
        userId,
        content,
        author: `${clerkUser?.firstName || ""} ${clerkUser?.lastName || ""}`.trim() || "Anonymous",
        avatar: clerkUser?.imageUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`,
        role: "Member",
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
