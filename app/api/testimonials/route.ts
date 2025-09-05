import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" }, // bolje po datumu nego po id
    });
    return NextResponse.json(testimonials);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, role, comment, image } = body;

    if (!name || !comment) {
      return NextResponse.json({ error: "Name and comment are required" }, { status: 400 });
    }

    // Uhvatimo IP adresu
    const forwarded = req.headers.get("x-forwarded-for");
    const ip =
      forwarded?.split(",")[0] || // Vercel/Netlify
      (req as any).ip ||          // Next.js Edge
      "unknown";

    const newTestimonial = await prisma.testimonial.create({
      data: {
        name,
        role,
        comment,
        image: image || "/images/testimonials/testimonials.png",
        ipAddress: ip,
        
      },
    });

    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error) {
    console.error("POST /api/testimonials error:", error);
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}