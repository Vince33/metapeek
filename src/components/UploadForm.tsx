import { useState } from "react";
import { extractMetadata } from "../services/api";

export default function UploadForm() {
  // Log the API base URL for debugging purposes
  console.log("API Base URL:", import.meta.env.VITE_API_URL);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    try {
      const data = await extractMetadata(file);
      setMetadata(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setMetadata(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      handleUpload(selectedFile);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
      />
      <button type="submit">Upload</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {metadata && <pre>{JSON.stringify(metadata, null, 2)}</pre>}
    </form>
  );
}
