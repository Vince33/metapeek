import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { extractMetadata } from "../services/api";
import DataDisplay from "../components/DataDisplay";
import type { Metadata } from "../types/metadata";
import { useRef } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

export default function UploadForm() {
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!selectedFile) {
    setError("Please select a file.");
    return;
  }

  try {
    setError(null);
    setMetadata(null);
    setLoading(true);
    
    const data = await extractMetadata(selectedFile); // ✅ already throws on failure
    setMetadata(data);
    
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    
    // Reset file input
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
} catch (err) {
    const errorMessage =
     err instanceof Error ? err.message : "Something went wrong during upload.";
    setError(errorMessage);
} finally {
  setLoading(false);
}

};


  return (
    <Container fluid className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <Row className="flex-grow-1 justify-content-center align-items-center">
        <Col xs={12} sm={10} md={6} lg={5} xl={4}>
          <h2 className="mb-4 text-center">Upload a Video</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          {/* {success && <Alert variant="success">Upload successful!</Alert>} */}
          <ToastContainer position="top-center" className="mt-4">
            <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg="success">
              <Toast.Header>
                <strong className="me-auto">Success</strong>
              </Toast.Header>
              <Toast.Body>Upload successful!</Toast.Body>
            </Toast>
          </ToastContainer>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formFile">
              <Form.Label>Choose a video file</Form.Label>
              <Form.Control
                type="file"
                accept="video/*"
                ref={fileInputRef}
                onChange={(e) => {
                  // setSuccess(false);
                  setError(null);
                  const fileInput = e.target as HTMLInputElement;
                  setSelectedFile(fileInput.files?.[0] || null);
                }}
              />
            </Form.Group>
            <Button 
              variant="primary" 
              type="submit" 
              className="w-100"
              disabled={loading} >{loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" />
                  Uploading...
                </>
                ) : (
                  "Upload"
                )}
            </Button>
          </Form>
          {metadata && <DataDisplay data={metadata} />}
        </Col>
      </Row>
    </Container>
  );
}
