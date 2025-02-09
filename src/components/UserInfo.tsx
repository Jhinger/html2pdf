import { createAsync } from "@solidjs/router";
import { auth } from "@/auth";
import { login, logout } from "@/auth";
import { Show, Suspense } from "solid-js";

export default function UserInfo() {
  const user = createAsync(() => auth());

  console.log(user());

  return (
    <div>
      <Suspense fallback={<span>Suspense from UserInfo</span>}>
        <Show when={user()}>
          {(userInfo) => <div>{userInfo().properties.email}</div>}
        </Show>
        <Show when={!user()}>
          <form action={login} method="post">
            <button class="py-2 px-4 rounded-sm bg-gray-300" type="submit">
              Login
            </button>
          </form>
        </Show>
        <Show when={user()}>
          <form action={logout} method="post">
            <button class="py-2 px-4 rounded-sm bg-gray-300" type="submit">
              Logout
            </button>
          </form>
        </Show>
      </Suspense>
    </div>
  );
}
