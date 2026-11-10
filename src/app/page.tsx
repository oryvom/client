import { HomePage } from "@/components/sections/home-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "ORYVOM MOBILITY PRIVATE LIMITED | Mobility and Transportation",
  description:
    "ORYVOM MOBILITY PRIVATE LIMITED builds connected mobility, transportation, logistics and travel solutions for businesses in India.",
  path: "/",
  absolute: true,
});

export default function Page() {
  return <HomePage />;
}
