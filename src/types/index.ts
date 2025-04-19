export interface Agent {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  capabilities: string[];
  instructions: string;
  examples: string[];
  pricing: string | null;
  imageUrl: string;
  rating: number;
  reviews: Review[];
  categories: string[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}