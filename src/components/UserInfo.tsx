import { createAsync } from "@solidjs/router";
import { auth } from "@/auth";
import { Show, Suspense } from "solid-js";

export default function UserInfo() {
  const user = createAsync(() => auth());

  return (
    <div>
      <Suspense fallback={<span>Suspense from UserInfo</span>}>
        <Show when={user()} fallback={<span>User Not Signed In</span>}>
          {(userInfo) => <div>{userInfo().properties.email}</div>}
        </Show>
      </Suspense>
    </div>
  );
}
