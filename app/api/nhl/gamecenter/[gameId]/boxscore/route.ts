import { NextResponse } from "next/server";
import { BASE_URL } from "../../../constants";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: { gameId: string } },
) {
  try {
    if (!params.gameId) {
      return new NextResponse("Game ID missing", { status: 400 });
    }

    const url = new URL(`${BASE_URL}/gamecenter/${params.gameId}/boxscore`);

    const response = await fetch(url.toString());
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
