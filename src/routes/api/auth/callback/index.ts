import { client } from "@/auth/client";
import { setTokens } from "@/auth";
import { json, redirect } from "@solidjs/router";
import { reload, revalidate } from "@solidjs/router";
import { authCacheKey } from "@/auth";
import type { APIEvent } from "@solidjs/start/server";

export async function GET(event: APIEvent) {
  const url = new URL(event.request.url);
  const code = url.searchParams.get("code");

  const exchanged = await client.exchange(
    code!,
    `${url.origin}/api/auth/callback`,
  );

  if (exchanged.err)
    return json({ error: exchanged.err.message }, { status: 400 });

  await setTokens(
    event.nativeEvent,
    exchanged.tokens.access,
    exchanged.tokens.refresh,
  );

  console.log("callback redirect url: ", `${url.origin}/`);

  // TODO: only use one revalidate method - currenty using both as I can't tell which one works :joy:
  await revalidate(authCacheKey);
  reload({ revalidate: authCacheKey });
  return redirect(`${url.origin}/`, 303);
}
