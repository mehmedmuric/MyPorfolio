import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rateLimit";

const limiter = rateLimit({ windowMs: 60 * 1000, max: 5 }); // 5 req / 1 minut


export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(testimonials ?? []); // uvek niz
  } catch (error) {
    console.error("GET /api/testimonials error:", error);
    // vraća prazan niz ako je error
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let { name, role, comment, image } = body;

    if (!name || !comment) {
      return NextResponse.json(
        { error: "Name and comment are required" },
        { status: 400 }
      );
    }

    // Sanitize + length limits
    name = String(name).trim().slice(0, 100);
    role = role ? String(role).trim().slice(0, 100) : null;
    comment = String(comment).trim().slice(0, 500);

    // Validate image URL
    let finalImage = "/images/testimonials/testimonials.png";
    try {
      const url = new URL(image);
      const allowedHosts = ["res.cloudinary.com", "cdn.sanity.io", "localhost"];
      if (allowedHosts.includes(url.hostname)) {
        finalImage = url.toString();
      }
    } catch {
      // fallback na default ako nije validan URL
    }

    // Get IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      req.headers.get("x-vercel-forwarded-for") ||
      "unknown";  
      
      name = String(name).trim().slice(0, 100);
      role = role ? String(role).trim().slice(0, 100) : null;
      comment = String(comment).trim().slice(0, 500);
      
       // ⛔ Rate limit check
    const check = limiter(ip);
    if (!check.success) {
      return NextResponse.json(
        { error: `Too many requests. Try again in ${check.retryAfter}s` },
        { status: 429 }
      );
    }

    const newTestimonial = await prisma.testimonial.create({
      data: {
        name,
        role,
        comment,
        image: finalImage,
        createdAt: new Date(), // fallback ako nije setovano
        ip, // ako imaš polje u bazi
      },
    });

    return NextResponse.json(newTestimonial, { status: 201 });
    
  } catch (error) {
    console.error("POST /api/testimonials error:", error);
    return NextResponse.json(
      { error: "Failed to create testimonial" },
      { status: 500 }
    );
    
  }
  
}
