"use client";

import { useId, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useWaitlist } from "@/context/WaitlistContext";

// Basic client-side pre-check; the API performs the authoritative validation.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function WaitlistForm() {
  const { t } = useLanguage();
  const { count, submit } = useWaitlist();
  const fieldId = useId();

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);

  // Split "{n} already on the list" so the number can be emphasised.
  const [countBefore, countAfter] = t.count_n.split("{n}");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (pending) return;

    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setSuccess(false);
      setError(t.error_invalid);
      return;
    }

    setPending(true);
    setError(null);
    const result = await submit(value);
    setPending(false);

    if (result.ok) {
      setSuccess(true);
      setError(null);
      setEmail("");
      return;
    }

    setSuccess(false);
    if (result.error === "dupe") setError(t.error_dupe);
    else if (result.error === "network") setError(t.offline_note);
    else setError(t.error_invalid);
  }

  return (
    <>
      <form className="wl-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor={fieldId} className="sr-only">
          {t.placeholder}
        </label>
        <input
          id={fieldId}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.placeholder}
          autoComplete="email"
          aria-invalid={error ? true : undefined}
          required
        />
        <button type="submit" className="wl-btn" disabled={pending}>
          {t.cta}
        </button>
      </form>

      {error && (
        <p className="wl-error" role="alert">
          {error}
        </p>
      )}
      {success && (
        <div className="wl-success" role="status">
          {t.success}
        </div>
      )}

      <p className="wl-count" aria-live="polite">
        {count > 0 ? (
          <>
            {countBefore}
            <b>{count}</b>
            {countAfter}
          </>
        ) : (
          t.count_zero
        )}
      </p>
    </>
  );
}
