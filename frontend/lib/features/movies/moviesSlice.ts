import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { omdbClient, Movie, SearchResponse } from '../../omdb';

interface MoviesState {
  searchResults: Movie[];
  currentMovie: Movie | null;
  isLoading: boolean;
  isSearching: boolean;
  error: string | null;
  searchQuery: string;
  totalResults: number;
  currentPage: number;
  favorites: Movie[];
  ratings: Record<string, number>;
}

const initialState: MoviesState = {
  searchResults: [],
  currentMovie: null,
  isLoading: false,
  isSearching: false,
  error: null,
  searchQuery: '',
  totalResults: 0,
  currentPage: 1,
  favorites: [],
  ratings: {},
};

// Async thunks
export const searchMovies = createAsyncThunk(
  'movies/search',
  async ({ query, page = 1 }: { query: string; page?: number }) => {
    const response = await omdbClient.searchMovies(query, page);
    return { ...response, query, page };
  }
);

export const getMovieDetails = createAsyncThunk(
  'movies/getDetails',
  async (imdbID: string) => {
    const response = await omdbClient.getMovieDetails(imdbID);
    return response;
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchQuery = '';
      state.totalResults = 0;
      state.currentPage = 1;
    },
    clearCurrentMovie: (state) => {
      state.currentMovie = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    addToFavorites: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      const existingIndex = state.favorites.findIndex(f => f.imdbID === movie.imdbID);
      if (existingIndex === -1) {
        state.favorites.push(movie);
        // Persist to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('favorites', JSON.stringify(state.favorites));
        }
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      const imdbID = action.payload;
      state.favorites = state.favorites.filter(movie => movie.imdbID !== imdbID);
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      }
    },
    setRating: (state, action: PayloadAction<{ imdbID: string; rating: number }>) => {
      const { imdbID, rating } = action.payload;
      state.ratings[imdbID] = rating;
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('ratings', JSON.stringify(state.ratings));
      }
    },
    initializeLocalData: (state) => {
      if (typeof window !== 'undefined') {
        const favorites = localStorage.getItem('favorites');
        const ratings = localStorage.getItem('ratings');
        
        if (favorites) {
          state.favorites = JSON.parse(favorites);
        }
        
        if (ratings) {
          state.ratings = JSON.parse(ratings);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Search movies
      .addCase(searchMovies.pending, (state) => {
        state.isSearching = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.isSearching = false;
        state.searchResults = action.payload.Search || [];
        state.searchQuery = action.payload.query;
        state.totalResults = parseInt(action.payload.totalResults) || 0;
        state.currentPage = action.payload.page;
        state.error = null;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.isSearching = false;
        state.error = action.error.message || 'Search failed';
        state.searchResults = [];
      })
      
      // Get movie details
      .addCase(getMovieDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMovieDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentMovie = action.payload;
        state.error = null;
      })
      .addCase(getMovieDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to load movie details';
      });
  },
});

export const {
  clearSearchResults,
  clearCurrentMovie,
  clearError,
  addToFavorites,
  removeFromFavorites,
  setRating,
  initializeLocalData,
} = moviesSlice.actions;

export default moviesSlice.reducer;