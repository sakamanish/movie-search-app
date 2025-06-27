'use client';

import { useEffect } from 'react';
import { SearchBar } from '@/components/movies/SearchBar';
import { MovieCard } from '@/components/movies/MovieCard';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { getUserProfile } from '@/lib/features/auth/authSlice';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function MoviesPage() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { searchResults, isSearching, error, searchQuery } = useAppSelector(
    (state) => state.movies
  );

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserProfile());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold mb-6">Discover Movies</h1>
        <SearchBar />
      </div>

      {error && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isSearching && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="aspect-[2/3] w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          ))}
        </div>
      )}

      {!isSearching && searchResults.length > 0 && (
        <>
          <div className="mb-4">
            <p className="text-muted-foreground">
              Found {searchResults.length} results for "{searchQuery}"
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {searchResults.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        </>
      )}

      {!isSearching && searchQuery && searchResults.length === 0 && !error && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No movies found for "{searchQuery}". Try a different search term.
          </p>
        </div>
      )}

      {!searchQuery && !isSearching && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Start typing to search for movies...
          </p>
        </div>
      )}
    </div>
  );
}