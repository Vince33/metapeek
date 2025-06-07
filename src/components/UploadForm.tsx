import { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8080/extract", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      setMetadata(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Upload failed");
      setMetadata(null);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Upload a Video File</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            accept="video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Extract Metadata
        </button>
      </form>

      {error && <div className="alert alert-danger mt-4">{error}</div>}
      {metadata && (
        <div className="mt-4">
          <h4>Metadata</h4>
          <pre className="bg-light p-3 rounded">
            {JSON.stringify(metadata, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
