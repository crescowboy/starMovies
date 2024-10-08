export interface Movie {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
  overview?: string;
  release_date?: string;
}
