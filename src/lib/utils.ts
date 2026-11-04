import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSubmissionId(): string {
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ASA-${year}-${random}`;
}

export function generateRegistrationId(): string {
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ATT-${year}-${random}`;
}

export function generateTicketNumber(): string {
  const random = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `TKT-${random}`;
}

export function generateQrToken(): string {
  return crypto.randomUUID() + "-" + Math.random().toString(36).substring(2, 15);
}
