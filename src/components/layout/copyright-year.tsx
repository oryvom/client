import { connection } from "next/server";
import { Suspense } from "react";

async function Year() {
  await connection();
  return <span>{new Date().getFullYear()}</span>;
}

export function CopyrightYear() {
  return (
    <Suspense fallback={<span>2026</span>}>
      <Year />
    </Suspense>
  );
}
