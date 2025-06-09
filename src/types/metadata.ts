export interface MetadataFormat {
  filename: string;
  duration: string;
  bit_rate: string;
}

export interface MetadataStream {
  codec_name: string;
  width: number;
  height: number;
  duration?: string;
}

export interface Metadata {
  format: MetadataFormat;
  streams: MetadataStream[];
}