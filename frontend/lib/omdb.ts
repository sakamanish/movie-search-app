const OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY || 'cd906e0f';
const OMDB_BASE_URL = process.env.NEXT_PUBLIC_OMDB_API_URL || 'http://www.omdbapi.com/';

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
  Genre?: string;
  Director?: string;
  Actors?: string;
  Plot?: string;
  Runtime?: string;
  Released?: string;
  imdbRating?: string;
  Country?: string;
  Language?: string;
}

export interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

class OMDBClient {
  private apiKey: string;
  private baseURL: string;

  constructor() {
    this.apiKey = OMDB_API_KEY;
    this.baseURL = OMDB_BASE_URL;
  }

  async searchMovies(query: string, page: number = 1): Promise<SearchResponse> {
    const url = `${this.baseURL}?apikey=${this.apiKey}&s=${encodeURIComponent(query)}&page=${page}&type=movie`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.Error) {
        throw new Error(data.Error);
      }
      
      return data;
    } catch (error) {
      console.error('OMDB search error:', error);
      throw error;
    }
  }

  async getMovieDetails(imdbID: string): Promise<Movie> {
    const url = `${this.baseURL}?apikey=${this.apiKey}&i=${imdbID}&plot=full`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.Error) {
        throw new Error(data.Error);
      }
      
      return data;
    } catch (error) {
      console.error('OMDB details error:', error);
      throw error;
    }
  }
}

export const omdbClient = new OMDBClient();