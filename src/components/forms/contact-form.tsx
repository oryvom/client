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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactFieldsSchema, type ContactFields } from "@/lib/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, type FieldValues, type UseFormSetError } from "react-hook-form";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ContactFields>({
    resolver: zodResolver(contactFieldsSchema),
    defaultValues: { oryLeaveBlank: "" },
  });

  useEffect(() => {
    const node = document.getElementById("contact-started");
    if (node instanceof HTMLInputElement) node.value = String(Date.now());
  }, []);

  async function onSubmit(values: ContactFields, event?: { target: EventTarget | null }) {
    if (status === "submitting") return;
    const form = event?.target;
    const startedAt =
      form instanceof HTMLFormElement ? Number(new FormData(form).get("formStartedAt")) : Number.NaN;
    setStatus("submitting");
    setMessage(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...values, startedAt }),
      });
      const result = await readJson(response);
      if (!result.ok) {
        applyFieldErrors(result.fieldErrors, setError as UseFormSetError<FieldValues>);
        setStatus("error");
        setMessage(result.error ?? "The message could not be sent.");
        return;
      }
      setStatus("success");
      setMessage(result.message ?? "Thank you. Your message has been sent.");
    } catch {
      setStatus("error");
      setMessage("The message could not be sent.");
    }
  }

  return (
    <FormShell status={status} message={message} onSubmit={handleSubmit(onSubmit)}>
      <Honeypot {...register("oryLeaveBlank")} />
      <input id="contact-started" type="hidden" name="formStartedAt" defaultValue="" />
      <Field id="contact-name" label="Full name" error={errors.name?.message}>
        <Input className={controlClass} autoComplete="name" {...register("name")} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-email" label="Email" error={errors.email?.message}>
          <Input className={controlClass} type="email" autoComplete="email" {...register("email")} />
        </Field>
        <Field id="contact-phone" label="Phone" error={errors.phone?.message}>
          <Input className={controlClass} type="tel" autoComplete="tel" {...register("phone")} />
        </Field>
      </div>
      <Field id="contact-subject" label="Subject" error={errors.subject?.message}>
        <Input className={controlClass} {...register("subject")} />
      </Field>
      <Field id="contact-message" label="Message" error={errors.message?.message}>
        <Textarea className={`${controlClass} min-h-36 py-3`} {...register("message")} />
      </Field>
      <SubmitButton pending={status === "submitting"} label="Send message" />
    </FormShell>
  );
}
