import { Container } from "@/components/layout/container";
import Image from "next/image";

export function PageHero({
  eyebrow,
  title,
  lede,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      {image ? (
        <Image
          src={image}
          alt={imageAlt ?? ""}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/88 to-navy/70" />
      <Container className="relative pt-32 pb-16 md:pt-40 md:pb-24">
        <p className="text-[0.72rem] font-medium tracking-[0.28em] text-ice uppercase">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl leading-[1.08] font-semibold text-white md:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-ice md:text-lg">{lede}</p>
      </Container>
    </section>
  );
}
