import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import DataDisplay from "../components/DataDisplay";

export default function UploadForm() {
  const [metadata, setMetadata] = useState<any | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      setError("Please select a file.");
      return;
    }

    try {
      setError(null);
      setSuccess(false);

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(import.meta.env.VITE_API_URL + "/extract", {
        method: "POST",
        body: formData,
      });


      if (!response.ok) throw new Error("Upload failed");

      const json = await response.json();     
      setMetadata(json);  

      setSuccess(true);
    } catch (err) {
      setError((err as Error).message);
    }
    
  };

  return (
    <Container fluid className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <Row className="flex-grow-1 justify-content-center align-items-center">
        <Col xs={12} sm={10} md={6} lg={5} xl={4}>
          <h2 className="mb-4 text-center">Upload a Video</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">Upload successful!</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formFile">
              <Form.Label>Choose a video file</Form.Label>
              <Form.Control
                type="file"
                accept="video/*"
                onChange={(e) => {
                  const fileInput = e.target as HTMLInputElement;
                  setSelectedFile(fileInput.files?.[0] || null);
                }}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Upload
            </Button>
          </Form>
          {metadata && <DataDisplay data={metadata} />}
        </Col>
      </Row>
    </Container>
  );
}
