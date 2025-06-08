// src/components/DataDisplay.tsx
import React from "react";
import { Card } from "react-bootstrap";

type Props = {
  data: any;
};

const DataDisplay: React.FC<Props> = ({ data }) => {
  if (!data) return null;

  return (
    <Card className="mt-4">
      <Card.Header>Extracted Data</Card.Header>
      <Card.Body>
        <pre style={{ whiteSpace: "pre-wrap", fontFamily: "monospace", fontSize: "0.9rem" }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      </Card.Body>
    </Card>
  );
};

export default DataDisplay;
