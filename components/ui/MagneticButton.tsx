"use client";

import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  strength?: number;
}

export default function MagneticButton({
  children,
  className,
  strength = 0.4,
  ...props
}: MagneticButtonProps) {
  const ref = useMagnetic<HTMLButtonElement>(strength);
  return (
    <button
      ref={ref}
      className={cn("inline-flex items-center justify-center will-change-transform", className)}
      {...props}
    >
      {children}
    </button>
  );
}
