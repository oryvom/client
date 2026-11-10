"use client";

export default function GlobalError({
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  return (
    <html lang="en-IN">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#071426",
          color: "#ffffff",
          fontFamily: "Georgia, serif",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: "36rem" }}>
          <p style={{ letterSpacing: "0.2em", fontSize: "0.75rem" }}>ORYVOM</p>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 500 }}>The website hit an unexpected error.</h1>
          <button
            type="button"
            onClick={() => retry()}
            style={{
              marginTop: "1.5rem",
              background: "#ffffff",
              color: "#071426",
              border: 0,
              padding: "0.8rem 1.2rem",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
