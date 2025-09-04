import { NextResponse } from "next/server";
import dbConnect from "../lib/mongodb";
import Testimonial from "../models/Testimonials";

// GET - svi komentari
export async function GET() {
  await dbConnect();
  const testimonials = await Testimonial.find().sort({ createdAt: -1 });
  return NextResponse.json(testimonials);
}

// POST - novi komentar
export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();

  const testimonial = await Testimonial.create({
    name: body.name,
    role: body.role,
    comment: body.comment,
    image: body.image,
  });

  return NextResponse.json(testimonial);
}