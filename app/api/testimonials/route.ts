import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { id: "desc" },
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

    const newTestimonial = await prisma.testimonial.create({
      data: {
        name,
        role,
        comment,
        image,
      },
    });

    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}