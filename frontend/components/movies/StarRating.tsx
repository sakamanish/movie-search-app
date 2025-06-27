'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setRating } from '@/lib/features/movies/moviesSlice';

interface StarRatingProps {
  movieId: string;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
}

export function StarRating({ movieId, maxRating = 5, size = 'md' }: StarRatingProps) {
  const dispatch = useAppDispatch();
  const { ratings } = useAppSelector((state) => state.movies);
  const currentRating = ratings[movieId] || 0;
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const handleRating = (rating: number) => {
    dispatch(setRating({ imdbID: movieId, rating }));
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }, (_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= (hoverRating || currentRating);

        return (
          <button
            key={index}
            className="transition-colors hover:scale-110"
            onMouseEnter={() => setHoverRating(starValue)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => handleRating(starValue)}
          >
            <Star
              className={`${sizeClasses[size]} ${
                isFilled
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-muted-foreground hover:text-yellow-400'
              } transition-colors`}
            />
          </button>
        );
      })}
      {currentRating > 0 && (
        <span className="ml-2 text-sm text-muted-foreground">
          {currentRating}/{maxRating}
        </span>
      )}
    </div>
  );
}