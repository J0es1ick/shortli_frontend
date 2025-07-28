import { useState } from "react";
import styles from "./shortenerForm.module.css";

interface ShortenResponse {
  original_url: string;
  short_code: string;
  short_url: string;
  qr_code_base64: string;
}

export function ShortenerForm() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<ShortenResponse | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ original_url: url }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при сокращении URL");
      }

      const data = await response.json();
      setResult(data);
      setError("");
    } catch (err) {
      setError(String(err));
      setResult(null);
    }
  };

  return (
    <div className={styles.form}>
      <h1>Shorten the link</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
      />
      <button onClick={handleSubmit} className={styles.form_button}>
        Shorten
      </button>
      {result && (
        <div className={styles.short_url}>
          <div className={styles.short_url_first_line}>
            <div className={styles.short_link}>
              <p>
                Short link:{" "}
                <a
                  href={`http://localhost:8088/${result.short_url
                    .split("/")
                    .pop()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`${window.location.host}/${result.short_url
                    .split("/")
                    .pop()}`}
                </a>
              </p>
            </div>
            <div className={styles.copy_button}>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    `http://localhost:8088/${result.short_url.split("/").pop()}`
                  )
                }
              >
                <img src="public/copy.svg" alt="copy" />
              </button>
            </div>
          </div>
          {/*
            <div>
              <strong>QR-code:</strong>
              <div style={{ marginTop: "10px" }}>
                <img src={result.qr_code_base64} alt="QR Code" />
                <div style={{ marginTop: "10px" }}>
                  <a
                    href={result.qr_code_base64}
                    download={`qr-${result.short_code}.png`}
                  >
                    download QR-code
                  </a>
                </div>
              </div>
            </div>
          */}
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
