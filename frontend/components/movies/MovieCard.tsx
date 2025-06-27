'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Movie } from '@/lib/omdb';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { addToFavorites, removeFromFavorites } from '@/lib/features/movies/moviesSlice';
import { motion } from 'framer-motion';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const dispatch = useAppDispatch();
  const { favorites, ratings } = useAppSelector((state) => state.movies);
  const [imageError, setImageError] = useState(false);

  const isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);
  const userRating = ratings[movie.imdbID];

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(movie.imdbID));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden">
        <div className="relative aspect-[2/3] bg-muted">
          {!imageError && movie.Poster !== 'N/A' ? (
            <Image
              src={movie.Poster}
              alt={movie.Title}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-muted-foreground">No Image</span>
            </div>
          )}
          
          <div className="absolute top-2 right-2">
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8"
              onClick={handleFavoriteToggle}
            >
              <Heart 
                className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} 
              />
            </Button>
          </div>

          {userRating && (
            <div className="absolute bottom-2 left-2">
              <Badge className="bg-yellow-500/90 text-black">
                <Star className="h-3 w-3 mr-1 fill-current" />
                {userRating}
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <Link href={`/movies/${movie.imdbID}`}>
            <h3 className="font-semibold text-sm line-clamp-2 hover:underline mb-2">
              {movie.Title}
            </h3>
          </Link>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{movie.Year}</span>
            <span className="capitalize">{movie.Type}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}