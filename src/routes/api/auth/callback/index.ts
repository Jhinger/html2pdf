import { client, setTokens } from "@/auth";
import { json, redirect } from "@solidjs/router";
import type { APIEvent } from "@solidjs/start/server";

export async function GET(event: APIEvent) {
  const url = new URL(event.request.url);
  const code = url.searchParams.get("code");

  const exchanged = await client.exchange(code!, `${url.origin}/api/callback`);

  if (exchanged.err)
    return json({ error: exchanged.err.message }, { status: 400 });

  await setTokens(
    event.nativeEvent,
    exchanged.tokens.access,
    exchanged.tokens.refresh,
  );

  redirect(`${url.origin}/`);
}
