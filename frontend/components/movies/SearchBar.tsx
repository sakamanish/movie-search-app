'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { searchMovies, clearSearchResults } from '@/lib/features/movies/moviesSlice';
import { useDebounce } from '@/hooks/useDebounce';

export function SearchBar() {
  const dispatch = useAppDispatch();
  const { isSearching, searchQuery } = useAppSelector((state) => state.movies);
  const [query, setQuery] = useState(searchQuery);
  const debouncedQuery = useDebounce(query, 500);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (debouncedQuery.trim() && debouncedQuery.length >= 2) {
      dispatch(searchMovies({ query: debouncedQuery }));
    } else if (debouncedQuery.length === 0) {
      dispatch(clearSearchResults());
    }
  }, [debouncedQuery, dispatch]);

  const handleClear = () => {
    setQuery('');
    dispatch(clearSearchResults());
    inputRef.current?.focus();
  };

  return (
    <div className="relative max-w-md w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10"
          disabled={isSearching}
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6"
            onClick={handleClear}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
      
      {isSearching && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
}