const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function extractMetadata(file: File): Promise<any> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/extract`, {
    method: "POST",
    body: formData,
  });

  if (response.status === 413) {
    throw new Error("The uploaded file is too large.");
  }
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to extract metadata");
  }

  return await response.json();
}
