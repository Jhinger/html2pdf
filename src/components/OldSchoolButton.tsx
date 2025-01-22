import { A } from "@solidjs/router";
import { type JSX } from "solid-js";

export default function OldSchoolButton(props: {
  href?: string;
  children: JSX.Element;
}) {
  return (
    <>
      {props.href ? (
        <A
          href={props.href}
          class="relative bg-black w-fit hover:cursor-pointer"
        >
          <div class="relative w-fit px-4 py-2 h-full bg-white ring-2 ring-black left-[6px] bottom-[6px] hover:left-1 hover:bottom-1">
            {props.children}
          </div>
        </A>
      ) : (
        <div class="relative bg-black w-fit hover:cursor-pointer">
          <div class="relative w-fit px-4 py-2 h-full bg-white ring-2 ring-black left-[6px] bottom-[6px] hover:left-1 hover:bottom-1">
            {props.children}
          </div>
        </div>
      )}
    </>
  );
}
