import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rateLimit";

// Ensure this route runs in Node.js runtime (Prisma requires Node runtime)
export const runtime = "nodejs";

const limiter = rateLimit({ windowMs: 60 * 1000, max: 5 }); // 5 req / 1 minut

export async function GET() {
  try {
    // Debug: log DATABASE_URL
    if (process.env.NODE_ENV === 'development') {
      console.log("DATABASE_URL:", process.env.DATABASE_URL);
    }

    if (!process.env.DATABASE_URL) {
      if (process.env.NODE_ENV === 'development') {
        console.error("DATABASE_URL is not set! Cannot connect to DB.");
      }
      return NextResponse.json(
        { error: "Server misconfiguration: DATABASE_URL not set" },
        { status: 500 }
      );
    }

    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(testimonials ?? []);
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.error("GET /api/testimonials error:", error);
    }
    return NextResponse.json({ error: error.message || "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // Debug: log DATABASE_URL
    if (process.env.NODE_ENV === 'development') {
      console.log("DATABASE_URL (POST):", process.env.DATABASE_URL);
    }

    if (!process.env.DATABASE_URL) {
      if (process.env.NODE_ENV === 'development') {
        console.error("DATABASE_URL is not set! Cannot connect to DB.");
      }
      return NextResponse.json(
        { error: "Server misconfiguration: DATABASE_URL not set" },
        { status: 500 }
      );
    }

    // ⚠️ Sigurno parsiranje JSON-a
    let body;
    try {
      body = await req.json();
    } catch {
      if (process.env.NODE_ENV === 'development') {
        console.error("Invalid JSON body received");
      }
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    let { name, role, comment, image } = body;

    if (!name || !comment) {
      return NextResponse.json({ error: "Name and comment are required" }, { status: 400 });
    }

    // Sanitize + length limits
    name = String(name).trim().slice(0, 100);
    role = role ? String(role).trim().slice(0, 100) : null;
    comment = String(comment).trim().slice(0, 500);

    // Validate image URL or Base64
    let finalImage = "/images/testimonials/testimonials.png";
    if (image && typeof image === "string" && image.startsWith("data:image")) {
      finalImage = image;
    }

    // Rate limit check
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      req.headers.get("x-vercel-forwarded-for") ||
      "unknown";

    const check = limiter(ip);
    if (!check.success) {
      return NextResponse.json(
        { error: `Too many requests. Try again in ${check.retryAfter}s` },
        { status: 429 }
      );
    }

    // Try creating testimonial
    let newTestimonial;
    try {
      newTestimonial = await prisma.testimonial.create({
        data: {
          name,
          role,
          comment,
          image: finalImage,
          createdAt: new Date(),
          ip,
        },
      });
    } catch (dbError: any) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Prisma DB error:", dbError);
      }
      return NextResponse.json({ error: dbError.message || "Database error" }, { status: 500 });
    }

    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.error("POST /api/testimonials error:", error);
    }
    return NextResponse.json({ error: error.message || "Failed to create testimonial" }, { status: 500 });
  }
}
