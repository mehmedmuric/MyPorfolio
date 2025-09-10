import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("GET /api/testimonials error:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, role, comment, image } = body;

    if (!name || !comment) {
      return NextResponse.json(
        { error: "Name and comment are required" },
        { status: 400 }
      );
    }

    // Uhvatimo IP adresu (Vercel / Netlify / lokalno)
    const forwarded = req.headers.get("x-forwarded-for");
    const ip =
      forwarded?.split(",")[0] ||
      (req as any).ip ||
      "unknown";

    const newTestimonial = await prisma.testimonial.create({
      data: {
        name,
        role: role || null,
        comment,
        image: image || "/images/testimonials/testimonials.png",
        createdAt: new Date(), // fallback ako nije setovano
        ip, // optional, možeš dodati polje ip u schema.prisma
      },
    });

    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error) {
    console.error("POST /api/testimonials error:", error);
    return NextResponse.json(
      { error: "Failed to create testimonial", details: (error as any).message },
      { status: 500 }
    );
  }
}
