import { company } from "@/config/company";
import { cn } from "@/lib/utils";

export function Logo({
  src,
  variant = "on-dark",
  className,
}: {
  src: string | null;
  variant?: "on-dark" | "on-light";
  className?: string;
}) {
  if (src) {
    return (
      // The file’s intrinsic ratio is preserved. Height is fixed and width follows.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={company.legalName}
        className={cn("h-9 w-auto max-w-[11.5rem] object-contain", className)}
      />
    );
  }

  const onDark = variant === "on-dark";

  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span
        className={cn(
          "font-heading text-[1.05rem] font-semibold tracking-[0.22em]",
          onDark ? "text-white" : "text-navy",
        )}
      >
        ORYVOM
      </span>
      <span
        className={cn(
          "mt-1 text-[0.58rem] font-medium tracking-[0.32em]",
          onDark ? "text-ice/80" : "text-muted-foreground",
        )}
      >
        MOBILITY
      </span>
    </span>
  );
}
