import { useState } from "react";
import { Card, ListGroup, Button, Collapse } from "react-bootstrap";
import type { Metadata } from "../types/metadata";


type Props = {
  data: Metadata;
};

function formatDuration(durationStr: string): string {
  const seconds = parseFloat(durationStr);
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

function formatBitrate(bitRateStr: string): string {
  const kbps = Math.floor(parseInt(bitRateStr) / 1000);
  return `${kbps} kbps`;
}

export default function DataDisplay({ data }: Props) {
  const [showRaw, setShowRaw] = useState(false);
  const format = data?.format || {};
  const stream = data?.streams?.[0] || {};

  return (
    <Card className="mt-4 shadow-sm">
      <Card.Header>Metadata</Card.Header>
      <ListGroup  variant="flush" data-testid="metadata-list" >
        <ListGroup.Item><strong>Filename:</strong> {format.filename}</ListGroup.Item>
        <ListGroup.Item><strong>Duration:</strong> {formatDuration(format.duration)}</ListGroup.Item>
        <ListGroup.Item><strong>Bitrate:</strong> {formatBitrate(format.bit_rate)}</ListGroup.Item>
        <ListGroup.Item><strong>Codec:</strong> {stream.codec_name}</ListGroup.Item>
        <ListGroup.Item><strong>Resolution:</strong> {stream.width}×{stream.height}</ListGroup.Item>
      </ListGroup>

      <Card.Body>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => setShowRaw(!showRaw)}
          aria-controls="raw-json"
          aria-expanded={showRaw}
        >
          {showRaw ? "Hide Raw JSON" : "Show Raw JSON"}
        </Button>

        <Collapse in={showRaw}>
          <pre
            id="raw-json"
            className="mt-3 p-2 bg-light border rounded small"
            style={{ maxHeight: "300px", overflowY: "auto", fontSize: "0.8rem" }}
          >
            {JSON.stringify(data, null, 2)}
          </pre>
        </Collapse>
      </Card.Body>
    </Card>
  );
}