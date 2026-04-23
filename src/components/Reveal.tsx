import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/useReveal";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "fade" | "mask" | "scale";
}

export const Reveal = ({
  children,
  className,
  delay = 0,
  variant = "up",
}: RevealProps) => {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const hidden =
    variant === "up"
      ? "opacity-0 translate-y-8"
      : variant === "scale"
        ? "opacity-0 scale-[0.96]"
        : variant === "mask"
          ? "opacity-100 [clip-path:inset(0_100%_0_0)]"
          : "opacity-0";

  const shown =
    variant === "mask"
      ? "opacity-100 [clip-path:inset(0_0_0_0)]"
      : "opacity-100 translate-y-0 scale-100";

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: variant === "mask" ? "1100ms" : "900ms",
        transitionTimingFunction:
          variant === "mask"
            ? "cubic-bezier(0.65, 0, 0.35, 1)"
            : "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      className={cn(
        variant === "mask" ? "transition-[clip-path,opacity]" : "transition-all",
        visible ? shown : hidden,
        className,
      )}
    >
      {children}
    </div>
  );
};
