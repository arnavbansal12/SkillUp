import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // No database available (e.g. Vercel without a cloud DB configured) –
  // return a sensible default so the client can still boot.
  if (!prisma) {
    return NextResponse.json({
      id: userId,
      xp: 0,
      level: 1,
      streak: 0,
      enrolledCourses: [],
      completedCourses: [],
      completedMissions: [],
      unlockedAchievements: [],
    });
  }

  try {
    let user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        enrolledCourses: true,
        completedMissions: true,
        achievements: true,
      },
    });

    if (!user) {
      const clerkUser = await currentUser();
      user = await prisma.user.create({
        data: {
          id: userId,
          email: clerkUser?.emailAddresses[0]?.emailAddress || "",
          name: `${clerkUser?.firstName || ""} ${clerkUser?.lastName || ""}`.trim(),
          xp: 0,
          level: 1,
          streak: 0,
        },
        include: {
          enrolledCourses: true,
          completedMissions: true,
          achievements: true,
        },
      });
    }

    const response = {
      ...user,
      completedCourses: user.enrolledCourses
        .filter((ec: { isCompleted: boolean }) => ec.isCompleted)
        .map((ec: { courseId: string }) => ec.courseId),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching user state:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // No database available – acknowledge the save without persisting
  if (!prisma) {
    return NextResponse.json({ id: userId, message: "DB not configured" });
  }

  try {
    const body = await req.json();
    const { xp, level, streak, enrolledCourses, completedCourses, completedMissions, unlockedAchievements } = body;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = await prisma.$transaction(async (tx: any) => {
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          xp,
          level,
          streak,
          lastActive: new Date(),
        },
      });

      if (enrolledCourses && Array.isArray(enrolledCourses)) {
        for (const courseId of enrolledCourses) {
          await tx.enrolledCourse.upsert({
            where: { userId_courseId: { userId, courseId } },
            create: { userId, courseId, completedLessons: "" },
            update: { isCompleted: completedCourses?.includes(courseId) || false },
          });
        }
      }

      if (completedCourses && Array.isArray(completedCourses)) {
        for (const courseId of completedCourses) {
          await tx.enrolledCourse.upsert({
            where: { userId_courseId: { userId, courseId } },
            create: { userId, courseId, completedLessons: "", isCompleted: true },
            update: { isCompleted: true },
          });
        }
      }

      if (completedMissions && Array.isArray(completedMissions)) {
        for (const missionId of completedMissions) {
          await tx.completedMission.upsert({
            where: { userId_missionId: { userId, missionId } },
            create: { userId, missionId },
            update: {},
          });
        }
      }

      if (unlockedAchievements && Array.isArray(unlockedAchievements)) {
        for (const achievementId of unlockedAchievements) {
          await tx.userAchievement.upsert({
            where: { userId_achievementId: { userId, achievementId } },
            create: { userId, achievementId },
            update: {},
          });
        }
      }

      return updatedUser;
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error updating user state:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
