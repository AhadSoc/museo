import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function POST(
  request: Request,
  { params }: RouteParams
) {
  const { id } = await params;
  const artworkId = Number(id);

  if (!Number.isInteger(artworkId)) {
    return NextResponse.json(
      { error: "Invalid artwork id." },
      { status: 400 }
    );
  }

  let body: { name?: string; email?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const name = body.name?.trim();
  const email = body.email?.trim().toLowerCase();

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 }
    );
  }

  const connection = await pool.getConnection();

  try {
    // Find or create the visitor by email.
    const [existing] = await connection.query(
      "SELECT visitor_id FROM Visitors WHERE email = ? LIMIT 1",
      [email]
    );

    const existingRows = existing as { visitor_id: number }[];

    let visitorId: number;

    if (existingRows.length > 0) {
      visitorId = existingRows[0].visitor_id;
    } else {
      const [result] = await connection.query(
        "INSERT INTO Visitors (full_name, email) VALUES (?, ?)",
        [name, email]
      );

      visitorId = (result as { insertId: number }).insertId;
    }

    // 48-hour hold, matching the site's demo reservations.
    await connection.query(
      "CALL reserve_artwork(?, ?, ?)",
      [artworkId, visitorId, 48]
    );

    return NextResponse.json({ status: "reserved" });
  } catch (error: unknown) {
    const mysqlError = error as {
      sqlState?: string;
      sqlMessage?: string;
    };

    // The stored procedure SIGNALs SQLSTATE 45000 when the
    // artwork isn't available — surface that as a clean 409
    // instead of a generic 500.
    if (mysqlError.sqlState === "45000") {
      return NextResponse.json(
        {
          error:
            mysqlError.sqlMessage ??
            "This artwork is no longer available.",
        },
        { status: 409 }
      );
    }

    console.error("Reservation failed:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  } finally {
    connection.release();
  }
}