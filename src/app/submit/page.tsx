"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  applicantName: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  mobile: z.string().min(10, "Valid mobile required"),
  organisation: z.string().min(2, "Organisation is required"),
  designation: z.string().optional(),
  city: z.string().min(2, "City is required"),
  country: z.string().default("India"),
  applicantType: z.enum([
    "INDIVIDUAL", "ADVERTISING_AGENCY", "CREATIVE_AGENCY", "BRAND", "MARKETING_TEAM", "OTHER",
  ]),
  campaignTitle: z.string().min(3, "Campaign title is required"),
  campaignDescription: z.string().min(50, "Please provide a detailed description (min 50 chars)"),
  categoryId: z.string().min(1, "Select a category"),
  creativeStrategy: z.string().optional(),
  objectives: z.string().optional(),
  targetAudience: z.string().optional(),
  resultsImpact: z.string().optional(),
  portfolioLink: z.string().url().optional().or(z.literal("")),
  hasPermission: z.literal(true, { errorMap: () => ({ message: "You must confirm permission to submit" }) }),
  acceptedTerms: z.literal(true, { errorMap: () => ({ message: "You must accept the terms" }) }),
});

type FormData = z.infer<typeof schema>;

const FALLBACK_CATEGORIES = [
  { id: "cat-best-brand-campaign", name: "Best Brand Campaign" },
  { id: "cat-best-creative-idea", name: "Best Creative Idea" },
  { id: "cat-best-digital-campaign", name: "Best Digital Campaign" },
  { id: "cat-best-film-tv", name: "Best Film / TV Commercial" },
  { id: "cat-best-integrated", name: "Best Integrated Campaign" },
  { id: "cat-young-creative", name: "Young Creative of the Year" },
  { id: "cat-best-print", name: "Best Print / Outdoor" },
  { id: "cat-best-social", name: "Best Social Media Campaign" },
];

export default function SubmitPage() {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(FALLBACK_CATEGORIES);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [submissionId, setSubmissionId] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { country: "India" },
  });

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((d) => {
        if (d.categories && d.categories.length > 0) setCategories(d.categories);
      })
      .catch(() => {});
  }, []);

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Submission failed");
      setSubmissionId(result.submissionId);
      setStatus("success");
      setMessage("Your entry has been submitted successfully.");
    } catch (e: any) {
      setStatus("error");
      setMessage(e.message || "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="section-padding">
        <div className="container-narrow max-w-xl text-center">
          <div className="border border-gold-500/50 p-10">
            <h1 className="text-3xl font-bold text-gold-400 mb-4">Submission Received</h1>
            <p className="text-charcoal-300 mb-4">{message}</p>
            <p className="text-lg font-mono text-white mb-6">
              Submission ID: <strong>{submissionId}</strong>
            </p>
            <p className="text-sm text-charcoal-400">
              A confirmation email has been sent. Please save your Submission ID.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-narrow max-w-2xl">
        <h1 className="text-4xl font-bold mb-2">Submit Your Entry</h1>
        <p className="text-charcoal-400 mb-8">
          Submit your campaign for The AdSphere Awards. Fields marked * are required.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-charcoal-300 mb-1">Full Name *</label>
              <input {...register("applicantName")} className="w-full bg-charcoal-900 border border-charcoal-700 rounded px-3 py-2 text-white focus:border-gold-500 outline-none" />
              {errors.applicantName && <p className="text-red-400 text-xs mt-1">{errors.applicantName.message}</p>}
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
              <label className="block text-sm text-charcoal-300 mb-1">Organisation *</label>
              <input {...register("organisation")} className="w-full bg-charcoal-900 border border-charcoal-700 rounded px-3 py-2 text-white focus:border-gold-500 outline-none" />
              {errors.organisation && <p className="text-red-400 text-xs mt-1">{errors.organisation.message}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-charcoal-300 mb-1">Applicant Type *</label>
              <select {...register("applicantType")} className="w-full bg-charcoal-900 border border-charcoal-700 rounded px-3 py-2 text-white focus:border-gold-500 outline-none">
                <option value="INDIVIDUAL">Individual</option>
                <option value="ADVERTISING_AGENCY">Advertising Agency</option>
                <option value="CREATIVE_AGENCY">Creative Agency</option>
                <option value="BRAND">Brand</option>
                <option value="MARKETING_TEAM">Marketing Team</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-charcoal-300 mb-1">City *</label>
              <input {...register("city")} className="w-full bg-charcoal-900 border border-charcoal-700 rounded px-3 py-2 text-white focus:border-gold-500 outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-charcoal-300 mb-1">Award Category *</label>
            <select {...register("categoryId")} className="w-full bg-charcoal-900 border border-charcoal-700 rounded px-3 py-2 text-white focus:border-gold-500 outline-none">
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            {errors.categoryId && <p className="text-red-400 text-xs mt-1">{errors.categoryId.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-charcoal-300 mb-1">Campaign Title *</label>
            <input {...register("campaignTitle")} className="w-full bg-charcoal-900 border border-charcoal-700 rounded px-3 py-2 text-white focus:border-gold-500 outline-none" />
            {errors.campaignTitle && <p className="text-red-400 text-xs mt-1">{errors.campaignTitle.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-charcoal-300 mb-1">Campaign Description *</label>
            <textarea {...register("campaignDescription")} rows={5} className="w-full bg-charcoal-900 border border-charcoal-700 rounded px-3 py-2 text-white focus:border-gold-500 outline-none" />
            {errors.campaignDescription && <p className="text-red-400 text-xs mt-1">{errors.campaignDescription.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-charcoal-300 mb-1">Creative Strategy / Concept</label>
            <textarea {...register("creativeStrategy")} rows={3} className="w-full bg-charcoal-900 border border-charcoal-700 rounded px-3 py-2 text-white focus:border-gold-500 outline-none" />
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-3 text-sm text-charcoal-300">
              <input type="checkbox" {...register("hasPermission")} className="mt-1" />
              <span>I confirm that I have the necessary rights and permission to submit this campaign. *</span>
            </label>
            {errors.hasPermission && <p className="text-red-400 text-xs">{errors.hasPermission.message}</p>}
            <label className="flex items-start gap-3 text-sm text-charcoal-300">
              <input type="checkbox" {...register("acceptedTerms")} className="mt-1" />
              <span>I accept the Award Submission Terms and Conditions. *</span>
            </label>
            {errors.acceptedTerms && <p className="text-red-400 text-xs">{errors.acceptedTerms.message}</p>}
          </div>

          {status === "error" && <p className="text-red-400 text-sm">{message}</p>}

          <button type="submit" disabled={status === "loading"} className="w-full py-4 bg-gold-500 text-charcoal-950 font-semibold rounded-sm hover:bg-gold-400 transition disabled:opacity-50">
            {status === "loading" ? "Submitting..." : "Submit Entry"}
          </button>
        </form>
      </div>
    </div>
  );
}
