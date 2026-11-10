"use client";

import { company } from "@/config/company";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { ComponentProps, FormEvent, ReactElement, ReactNode } from "react";
import { cloneElement, useEffect, useId, useRef } from "react";

export const controlClass =
  "h-12 rounded-sm bg-white px-3 text-base text-navy md:text-base";

export type ApiResult = {
  ok: boolean;
  message?: string;
  error?: string;
  fieldErrors?: Record<string, string>;
  contactEmail?: string;
};

export function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactElement<{
    id?: string;
    "aria-invalid"?: boolean;
    "aria-describedby"?: string;
  }>;
}) {
  const described = [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>
        {label}
        <span className="text-destructive" aria-hidden>
          {" "}
          *
        </span>
        <span className="sr-only"> required</span>
      </Label>
      {cloneElement(children, {
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": described || undefined,
      })}
      {hint ? (
        <p id={`${id}-hint`} className="text-sm leading-5 text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Honeypot(props: ComponentProps<"input">) {
  return (
    <div className="absolute -left-[9999px] h-0 overflow-hidden" aria-hidden="true">
      <label htmlFor="oryLeaveBlank">Leave this field empty</label>
      <input id="oryLeaveBlank" tabIndex={-1} autoComplete="off" {...props} />
    </div>
  );
}

export function FormShell({
  children,
  status,
  message,
  onSubmit,
}: {
  children: ReactNode;
  status: "idle" | "submitting" | "success" | "error";
  message: string | null;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const titleId = useId();
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="border border-line bg-paper p-8 outline-none"
      >
        <h2 id={titleId} className="text-2xl text-navy">
          Enquiry received
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-5">
      {status === "error" && message ? (
        <div role="alert" className="border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          <p>{message}</p>
          <p className="mt-2">
            You can also write directly to{" "}
            <a className="underline" href={`mailto:${company.email}`}>
              {company.email}
            </a>
            .
          </p>
        </div>
      ) : null}
      {children}
    </form>
  );
}

export function SubmitButton({ pending, label }: { pending: boolean; label: string }) {
  return (
    <Button
      type="submit"
      disabled={pending}
      className="h-12 w-full rounded-sm px-6 text-sm tracking-wide sm:w-auto"
    >
      {pending ? "Sending…" : label}
    </Button>
  );
}

export function SelectField({
  className,
  children,
  ...props
}: ComponentProps<"select">) {
  return (
    <select
      className={cn(
        controlClass,
        "w-full border border-input bg-white focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export async function readJson(response: Response): Promise<ApiResult> {
  const data: unknown = await response.json().catch(() => null);
  if (!data || typeof data !== "object") {
    return {
      ok: false,
      error: `The submission could not be completed. Please email ${company.email}.`,
      contactEmail: company.email,
    };
  }
  return data as ApiResult;
}

export function applyFieldErrors(
  fieldErrors: Record<string, string> | undefined,
  setError: (name: string, error: { message: string }) => void,
) {
  if (!fieldErrors) return;
  for (const [key, value] of Object.entries(fieldErrors)) {
    setError(key, { message: value });
  }
}
