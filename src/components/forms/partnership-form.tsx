"use client";

import {
  applyFieldErrors,
  controlClass,
  Field,
  FormShell,
  Honeypot,
  readJson,
  SelectField,
  SubmitButton,
} from "@/components/forms/form-controls";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  partnershipCategories,
  partnershipFieldsSchema,
  type PartnershipFields,
} from "@/lib/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, type FieldValues, type UseFormSetError } from "react-hook-form";

export function PartnershipForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<PartnershipFields>({
    resolver: zodResolver(partnershipFieldsSchema),
    defaultValues: { oryLeaveBlank: "", category: undefined },
  });

  useEffect(() => {
    const node = document.getElementById("partner-started");
    if (node instanceof HTMLInputElement) node.value = String(Date.now());
  }, []);

  async function onSubmit(values: PartnershipFields, event?: { target: EventTarget | null }) {
    if (status === "submitting") return;
    const form = event?.target;
    const startedAt =
      form instanceof HTMLFormElement ? Number(new FormData(form).get("formStartedAt")) : Number.NaN;
    setStatus("submitting");
    setMessage(null);
    try {
      const response = await fetch("/api/partnership", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...values, startedAt }),
      });
      const result = await readJson(response);
      if (!result.ok) {
        applyFieldErrors(result.fieldErrors, setError as UseFormSetError<FieldValues>);
        setStatus("error");
        setMessage(result.error ?? "The enquiry could not be sent.");
        return;
      }
      setStatus("success");
      setMessage(result.message ?? "Thank you. Your enquiry has been sent.");
    } catch {
      setStatus("error");
      setMessage("The enquiry could not be sent.");
    }
  }

  return (
    <FormShell status={status} message={message} onSubmit={handleSubmit(onSubmit)}>
      <Honeypot {...register("oryLeaveBlank")} />
      <input id="partner-started" type="hidden" name="formStartedAt" defaultValue="" />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="partner-name" label="Name" error={errors.name?.message}>
          <Input className={controlClass} autoComplete="name" {...register("name")} />
        </Field>
        <Field id="partner-company" label="Company name" error={errors.companyName?.message}>
          <Input className={controlClass} autoComplete="organization" {...register("companyName")} />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="partner-email" label="Work email" error={errors.email?.message}>
          <Input className={controlClass} type="email" autoComplete="email" {...register("email")} />
        </Field>
        <Field id="partner-phone" label="Phone" error={errors.phone?.message}>
          <Input className={controlClass} type="tel" autoComplete="tel" {...register("phone")} />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="partner-category" label="Partnership category" error={errors.category?.message}>
          <SelectField {...register("category")} defaultValue="">
            <option value="" disabled>
              Select a category
            </option>
            {partnershipCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </SelectField>
        </Field>
        <Field id="partner-city" label="City" error={errors.city?.message}>
          <Input className={controlClass} autoComplete="address-level2" {...register("city")} />
        </Field>
      </div>
      <Field id="partner-message" label="Message" error={errors.message?.message}>
        <Textarea className={`${controlClass} min-h-36 py-3`} {...register("message")} />
      </Field>
      <SubmitButton pending={status === "submitting"} label="Submit partnership enquiry" />
    </FormShell>
  );
}
