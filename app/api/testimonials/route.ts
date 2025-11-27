import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rateLimit";

const limiter = rateLimit({ windowMs: 60 * 1000, max: 5 }); // 5 req / 1 minut

// Helper: safe JSON
const safeJson = (data: any) => {
  try {
    return JSON.parse(JSON.stringify(data));
  } catch {
    return [];
  }
};

export async function GET() {
  try {
    console.log("GET /api/testimonials called");
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });
    console.log("Testimonials fetched:", testimonials.length);
    return NextResponse.json(safeJson(testimonials));
  } catch (error) {
    console.error("GET /api/testimonials error:", error);
    // Uvek vrati JSON, nikad HTML
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // ⚠️ Sigurno parsiranje JSON-a
    let body;
    try {
      body = await req.json();
    } catch {
      console.error("Invalid JSON body");
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

    // Validate image (Base64 or fallback)
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

    // MongoDB + Prisma: kreiraj dokument
    const newTestimonial = await prisma.testimonial.create({
      data: {
        name,
        role,
        comment,
        image: finalImage,
        createdAt: new Date(), // MongoDB DateTime
        ip,
      },
    });

    return NextResponse.json(safeJson(newTestimonial), { status: 201 });
  } catch (error) {
    console.error("POST /api/testimonials error:", error);
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}
