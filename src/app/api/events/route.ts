import { NextRequest, NextResponse } from "next/server";
import eventsData from "@/data/events.json";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));

  const start = (page - 1) * limit;
  const slice = eventsData.slice(start, start + limit);

  return NextResponse.json({
    events: slice,
    total: eventsData.length,
    page,
    limit,
    hasMore: start + limit < eventsData.length,
  });
}
