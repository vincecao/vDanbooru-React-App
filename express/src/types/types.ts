interface SafebooruIncomingPostType {
  tags: string[];
  data: {
    directory: string;
    image: string;
    id: string;
    sample?: boolean;
  };
  sampleHeight: number;
  sampleWidth: number;
  height: number;
  width: number;
  id: string;
}

interface IncomingPostType {
  tags: string[];
  sampleHeight: number;
  sampleWidth: number;
  sampleUrl: string;
  previewHeight: number;
  previewWidth: number;
  previewUrl: string;
  height: number;
  width: number;
  fileUrl: string;
  id: string;
  score: number;
  source: string;
  rating: string;
  createdAt: Date;
}

interface PopulatedPostType {
  src: string;
  thumbnail: string;
  thumbnailHeight: number;
  thumbnailWidth: number;
  caption: string;
  tags: object[];
}
