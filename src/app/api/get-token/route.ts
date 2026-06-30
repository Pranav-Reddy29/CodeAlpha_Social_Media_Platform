export const dynamic = "force-dynamic";
import { validateRequest } from "@/auth";
import streamServerClient from "@/lib/stream";

export async function GET() {
  try {
    console.log("1. GET /api/get-token");

    const { user } = await validateRequest();

    console.log("2. User:", user);

    if (!user) {
      console.log("3. Unauthorized");
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("4. Creating token");

    const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60;
    const issuedAt = Math.floor(Date.now() / 1000) - 60;

    const token = streamServerClient.createToken(
      user.id,
      expirationTime,
      issuedAt,
    );

    console.log("5. Token created");

    return Response.json({ token });
  } catch (error) {
    console.error("GET TOKEN ERROR:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}