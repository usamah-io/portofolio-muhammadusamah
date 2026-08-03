import content from "@/data/content.json";

export const OWNER_EMAILS = Array.from(
  new Set([
    "muhammadusamahabdurrahman@gmail.com",
    "uusamahhhh@gmail.com",
    content.socials?.gmail || "",
  ].filter(Boolean).map((e) => e.toLowerCase()))
);

export const RATE_LIMIT_MS = 24 * 60 * 60 * 1000; // 24 hours

export const RATE_LIMIT_MESSAGE = "Anda telah mengirim pesan hari ini. Silakan coba lagi besok (24 jam lagi).";
export const OWNER_EMAIL_ERROR_MESSAGE = "Anda tidak dapat menggunakan email pemilik website untuk mengirim pesan.";
export const MIN_LENGTH_ERROR_MESSAGE = "Pesan terlalu pendek, minimal 10 karakter.";

export function isOwnerEmail(email: string): boolean {
  if (!email) return false;
  const cleanEmail = email.trim().toLowerCase();
  return OWNER_EMAILS.includes(cleanEmail);
}

export function getRateLimitStatus(): { isRateLimited: boolean; remainingHours: number } {
  if (typeof window === "undefined") {
    return { isRateLimited: false, remainingHours: 0 };
  }
  try {
    const savedTimestampStr = localStorage.getItem("last_sent_timestamp");
    if (!savedTimestampStr) return { isRateLimited: false, remainingHours: 0 };

    const savedTimestamp = parseInt(savedTimestampStr, 10);
    if (isNaN(savedTimestamp)) return { isRateLimited: false, remainingHours: 0 };

    const elapsed = Date.now() - savedTimestamp;
    if (elapsed < RATE_LIMIT_MS) {
      const remainingMs = RATE_LIMIT_MS - elapsed;
      const remainingHours = Math.ceil(remainingMs / (1000 * 60 * 60));
      return { isRateLimited: true, remainingHours };
    }
  } catch {
    // localStorage may fail in private window or cookies disabled
  }

  return { isRateLimited: false, remainingHours: 0 };
}

export function setRateLimitTimestamp(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("last_sent_timestamp", Date.now().toString());
  } catch {
    // localStorage fallback
  }
}

export function validateContactInput(data: {
  email: string;
  message: string;
  honeypot_website?: string;
}): { isValid: boolean; error?: string; isHoneypot?: boolean } {
  // 1. Honeypot check
  if (data.honeypot_website && data.honeypot_website.trim() !== "") {
    return { isValid: false, isHoneypot: true };
  }

  // 2. Self Email check
  if (isOwnerEmail(data.email)) {
    return {
      isValid: false,
      error: OWNER_EMAIL_ERROR_MESSAGE,
    };
  }

  // 3. Message length check
  const cleanMessage = (data.message || "").trim();
  if (cleanMessage.length < 10) {
    return {
      isValid: false,
      error: MIN_LENGTH_ERROR_MESSAGE,
    };
  }

  return { isValid: true };
}
