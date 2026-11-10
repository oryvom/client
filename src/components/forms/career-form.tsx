"use client";

import {
  applyFieldErrors,
  controlClass,
  Field,
  FormShell,
  Honeypot,
  readJson,
  SubmitButton,
} from "@/components/forms/form-controls";
import { company } from "@/config/company";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { careerFieldsSchema, type CareerFields } from "@/lib/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, type FieldValues, type UseFormSetError } from "react-hook-form";

export function CareerForm({ maxBytes }: { maxBytes: number }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CareerFields>({
    resolver: zodResolver(careerFieldsSchema),
    defaultValues: { oryLeaveBlank: "" },
  });

  useEffect(() => {
    const node = document.getElementById("career-started");
    if (node instanceof HTMLInputElement) node.value = String(Date.now());
  }, []);

  async function onSubmit(values: CareerFields, event?: { target: EventTarget | null }) {
    if (status === "submitting") return;
    const form = event?.target;
    const input = form instanceof HTMLFormElement ? form.querySelector<HTMLInputElement>("#career-resume") : null;
    const file = input?.files?.[0];
    if (!file) {
      setFileError("Attach a PDF resume.");
      return;
    }
    if (!file.name.toLowerCase().endsWith(".pdf") || (file.type && file.type !== "application/pdf")) {
      setFileError("Attach a PDF resume. Other file types are not accepted.");
      return;
    }
    if (file.size > maxBytes) {
      setFileError(`The resume must be ${Math.floor(maxBytes / 1_000_000)} MB or smaller.`);
      return;
    }

    const startedAt =
      form instanceof HTMLFormElement ? Number(new FormData(form).get("formStartedAt")) : Number.NaN;
    setFileError(null);
    setStatus("submitting");
    setMessage(null);

    const body = new FormData();
    body.set("name", values.name);
    body.set("email", values.email);
    body.set("phone", values.phone);
    body.set("position", values.position);
    body.set("message", values.message);
    body.set("oryLeaveBlank", values.oryLeaveBlank ?? "");
    body.set("startedAt", String(startedAt));
    body.set("resume", file);

    try {
      const response = await fetch("/api/careers", {
        method: "POST",
        headers: { Accept: "application/json" },
        body,
      });
      const result = await readJson(response);
      if (!result.ok) {
        applyFieldErrors(result.fieldErrors, setError as UseFormSetError<FieldValues>);
        if (result.fieldErrors?.resume) setFileError(result.fieldErrors.resume);
        setStatus("error");
        setMessage(result.error ?? "The enquiry could not be sent.");
        return;
      }
      setStatus("success");
      setMessage(result.message ?? "Thank you. Your enquiry has been sent.");
    } catch {
      setStatus("error");
      setMessage(`The enquiry could not be sent. Please email ${company.email}.`);
    }
  }

  return (
    <FormShell status={status} message={message} onSubmit={handleSubmit(onSubmit)}>
      <Honeypot {...register("oryLeaveBlank")} />
      <input id="career-started" type="hidden" name="formStartedAt" defaultValue="" />
      <Field id="career-name" label="Full name" error={errors.name?.message}>
        <Input className={controlClass} autoComplete="name" {...register("name")} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="career-email" label="Email" error={errors.email?.message}>
          <Input className={controlClass} type="email" autoComplete="email" {...register("email")} />
        </Field>
        <Field id="career-phone" label="Phone" error={errors.phone?.message}>
          <Input className={controlClass} type="tel" autoComplete="tel" {...register("phone")} />
        </Field>
      </div>
      <Field
        id="career-position"
        label="Position of interest"
        hint="Name the kind of work you would like to be considered for. This is an expression of interest, not an application to a published vacancy."
        error={errors.position?.message}
      >
        <Input className={controlClass} {...register("position")} />
      </Field>
      <Field
        id="career-resume"
        label="Resume"
        hint={`PDF only, up to ${Math.floor(maxBytes / 1_000_000)} MB. Files are stored privately and are not published.`}
        error={fileError ?? undefined}
      >
        <Input className={`${controlClass} py-2`} type="file" accept="application/pdf,.pdf" name="resume" />
      </Field>
      <Field id="career-message" label="Cover message" error={errors.message?.message}>
        <Textarea className={`${controlClass} min-h-36 py-3`} {...register("message")} />
      </Field>
      <SubmitButton pending={status === "submitting"} label="Submit enquiry" />
    </FormShell>
  );
}
