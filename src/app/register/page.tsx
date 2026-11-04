"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email required"),
  mobile: z.string().min(10, "Valid mobile required"),
  organisation: z.string().optional(),
  designation: z.string().optional(),
  city: z.string().min(2, "City is required"),
  country: z.string().default("India"),
  category: z.enum([
    "INDUSTRY_PROFESSIONAL", "BRAND_REPRESENTATIVE", "AGENCY_REPRESENTATIVE",
    "STUDENT", "ENTREPRENEUR", "INVITED_GUEST", "OTHER",
  ]),
  preferredDay: z.enum(["DAY_1", "DAY_2", "BOTH"]),
  dietaryRequirements: z.string().optional(),
  accessibilityNeeds: z.string().optional(),
  acceptedTerms: z.literal(true, { errorMap: () => ({ message: "You must accept the terms and privacy policy" }) }),
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [regData, setRegData] = useState<{ registrationId: string; ticketNumber: string } | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { country: "India", preferredDay: "BOTH" },
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Registration failed");
      setRegData({ registrationId: result.registrationId, ticketNumber: result.ticketNumber });
      setStatus("success");
      setMessage("Registration successful. Check your email for the confirmation and QR ticket.");
    } catch (e: any) {
      setStatus("error");
      setMessage(e.message || "Something went wrong.");
    }
  };

  if (status === "success" && regData) {
    return (
      <div className="section-padding">
        <div className="container-narrow max-w-xl text-center">
          <div className="border border-gold-500/50 p-10">
            <h1 className="text-3xl font-bold text-gold-400 mb-4">Registration Confirmed</h1>
            <p className="text-charcoal-300 mb-6">{message}</p>
            <div className="bg-charcoal-900 p-6 rounded text-left space-y-2 mb-6">
              <p><span className="text-charcoal-400">Registration ID:</span> <strong className="font-mono">{regData.registrationId}</strong></p>
              <p><span className="text-charcoal-400">Ticket Number:</span> <strong className="font-mono">{regData.ticketNumber}</strong></p>
            </div>
            <p className="text-sm text-charcoal-400">
              A confirmation email with your QR code ticket has been sent. Please present the QR code at the venue for check-in.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-narrow max-w-2xl">
        <h1 className="text-4xl font-bold mb-2">Register to Attend</h1>
        <p className="text-charcoal-400 mb-8">
          Join us for The AdSphere Awards, 20–21 February 2027, Bengaluru.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-charcoal-300 mb-1">Full Name *</label>
              <input {...register("fullName")} className="w-full bg-charcoal-900 border border-charcoal-700 rounded px-3 py-2 text-white focus:border-gold-500 outline-none" />
              {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
            </div>
            <div>
              <label className="block text-sm text-charcoal-300 mb-1">Email *</label>
              <input type="email" {...register("email")} className="w-full bg-charcoal-900 border border-charcoal-700 rounded px-3 py-2 text-white focus:border-gold-500 outline-none" />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-charcoal-300 mb-1">Mobile *</label>
              <input {...register("mobile")} className="w-full bg-charcoal-900 border border-charcoal-700 rounded px-3 py-2 text-white focus:border-gold-500 outline-none" />
              {errors.mobile && <p className="text-red-400 text-xs mt-1">{errors.mobile.message}</p>}
            </div>
            <div>
              <label className="block text-sm text-charcoal-300 mb-1">Organisation</label>
              <input {...register("organisation")} className="w-full bg-charcoal-900 border border-charcoal-700 rounded px-3 py-2 text-white focus:border-gold-500 outline-none" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-charcoal-300 mb-1">City *</label>
              <input {...register("city")} className="w-full bg-charcoal-900 border border-charcoal-700 rounded px-3 py-2 text-white focus:border-gold-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm text-charcoal-300 mb-1">Attendee Category *</label>
              <select {...register("category")} className="w-full bg-charcoal-900 border border-charcoal-700 rounded px-3 py-2 text-white focus:border-gold-500 outline-none">
                <option value="INDUSTRY_PROFESSIONAL">Industry Professional</option>
                <option value="BRAND_REPRESENTATIVE">Brand Representative</option>
                <option value="AGENCY_REPRESENTATIVE">Agency Representative</option>
                <option value="STUDENT">Student</option>
                <option value="ENTREPRENEUR">Entrepreneur</option>
                <option value="INVITED_GUEST">Invited Guest</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-charcoal-300 mb-1">Preferred Event Day *</label>
            <select {...register("preferredDay")} className="w-full bg-charcoal-900 border border-charcoal-700 rounded px-3 py-2 text-white focus:border-gold-500 outline-none">
              <option value="DAY_1">Day 1 only (20 Feb – Creative Experience)</option>
              <option value="DAY_2">Day 2 only (21 Feb – Grand Award Night)</option>
              <option value="BOTH">Both Days</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-charcoal-300 mb-1">Dietary Requirements</label>
            <input {...register("dietaryRequirements")} placeholder="e.g. Vegetarian, Vegan, Allergies" className="w-full bg-charcoal-900 border border-charcoal-700 rounded px-3 py-2 text-white focus:border-gold-500 outline-none" />
          </div>

          <label className="flex items-start gap-3 text-sm text-charcoal-300">
            <input type="checkbox" {...register("acceptedTerms")} className="mt-1" />
            <span>I accept the Privacy Policy and Event Terms & Conditions. *</span>
          </label>
          {errors.acceptedTerms && <p className="text-red-400 text-xs">{errors.acceptedTerms.message}</p>}

          {status === "error" && <p className="text-red-400 text-sm">{message}</p>}

          <button type="submit" disabled={status === "loading"} className="w-full py-4 bg-gold-500 text-charcoal-950 font-semibold rounded-sm hover:bg-gold-400 transition disabled:opacity-50">
            {status === "loading" ? "Registering..." : "Complete Registration"}
          </button>
        </form>
      </div>
    </div>
  );
}
