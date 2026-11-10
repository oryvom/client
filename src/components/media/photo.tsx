import { illustrativeCaption } from "@/config/company";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Photo({
  src,
  alt,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 40vw, 100vw",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <figure>
      <div className={cn("relative aspect-[16/10] overflow-hidden bg-navy", className)}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
      <figcaption className="mt-2 text-xs leading-5 text-muted-foreground">
        {illustrativeCaption}
      </figcaption>
    </figure>
  );
}
