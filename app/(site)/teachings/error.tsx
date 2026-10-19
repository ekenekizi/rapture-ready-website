"use client";

export default function TeachingsError({ reset }: { reset: () => void }) {
  return (
    <main id="main-content" className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="font-serif text-4xl">We couldn’t load the teaching.</h1>

      <p className="mt-5 text-sm leading-7 text-muted">
        Please try again in a moment.
      </p>

      <button
        type="button"
        onClick={() => reset()}
        className="mt-7 rounded-sm bg-navy px-6 py-3 text-sm text-white"
      >
        Try Again
      </button>
    </main>
  );
}
