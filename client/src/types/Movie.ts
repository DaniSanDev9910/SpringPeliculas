export interface Movie {
  id: string;
  title: string;
  director: string;
  year: number;
  genre: string;
  rating: number;
  poster?: string;
  description: string;
}