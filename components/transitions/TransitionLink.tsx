"use client";

import { useRouter, usePathname } from "next/navigation";
import { pageTransitionStore } from "@/lib/pageTransitionStore";
import { useCursorHover } from "@/hooks/useCursorHover";
import { cn } from "@/lib/utils";

interface TransitionLinkProps {
  href: string;
  label: string;
  children: React.ReactNode;
  className?: string;
  cursor?: "open" | "view" | "close";
}

/** A navigation link that plays a full-screen curtain transition before routing. */
export default function TransitionLink({
  href,
  label,
  children,
  className,
  cursor = "open",
}: TransitionLinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  const cursorHandlers = useCursorHover(cursor);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === href) return;
    if (pageTransitionStore.phase !== "idle") return;
    pageTransitionStore.cover({ mode: "room", label });
    // Give the curtain a beat to fully cover before swapping route content.
    setTimeout(() => router.push(href), 550);
  };

  return (
    <a href={href} onClick={handleClick} className={cn(className)} {...cursorHandlers}>
      {children}
    </a>
  );
}
