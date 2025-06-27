'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Heart, Calendar, Clock, Globe, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { StarRating } from '@/components/movies/StarRating';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { getMovieDetails, addToFavorites, removeFromFavorites } from '@/lib/features/movies/moviesSlice';
import { motion } from 'framer-motion';

export default function MovieDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const movieId = params.id as string;

  const { currentMovie, isLoading, error, favorites } = useAppSelector(
    (state) => state.movies
  );
  
  const [imageError, setImageError] = useState(false);
  const isFavorite = favorites.some(fav => fav.imdbID === movieId);

  useEffect(() => {
    if (movieId) {
      dispatch(getMovieDetails(movieId));
    }
  }, [movieId, dispatch]);

  const handleFavoriteToggle = () => {
    if (currentMovie) {
      if (isFavorite) {
        dispatch(removeFromFavorites(movieId));
      } else {
        dispatch(addToFavorites(currentMovie));
      }
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-32 mb-6" />
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Skeleton className="aspect-[2/3] w-full" />
          </div>
          <div className="md:col-span-2 space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!currentMovie) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert>
          <AlertDescription>Movie not found</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-0">
              <div className="relative aspect-[2/3] bg-muted rounded-lg overflow-hidden">
                {!imageError && currentMovie.Poster !== 'N/A' ? (
                  <Image
                    src={currentMovie.Poster}
                    alt={currentMovie.Title}
                    fill
                    className="object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-muted-foreground">No Image Available</span>
                  </div>
                )}
              </div>
              
              <div className="p-4 space-y-4">
                <StarRating movieId={movieId} size="lg" />
                
                <Button
                  variant={isFavorite ? "default" : "outline"}
                  className="w-full"
                  onClick={handleFavoriteToggle}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-3xl mb-2">{currentMovie.Title}</CardTitle>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{currentMovie.Year}</span>
                    {currentMovie.Runtime && (
                      <>
                        <span>•</span>
                        <Clock className="h-4 w-4" />
                        <span>{currentMovie.Runtime}</span>
                      </>
                    )}
                  </div>
                </div>
                {currentMovie.imdbRating && currentMovie.imdbRating !== 'N/A' && (
                  <Badge variant="secondary" className="text-lg">
                    ⭐ {currentMovie.imdbRating}
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {currentMovie.Genre && (
                <div>
                  <h3 className="font-semibold mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentMovie.Genre.split(', ').map((genre) => (
                      <Badge key={genre} variant="outline">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {currentMovie.Plot && currentMovie.Plot !== 'N/A' && (
                <div>
                  <h3 className="font-semibold mb-2">Plot</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {currentMovie.Plot}
                  </p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                {currentMovie.Director && currentMovie.Director !== 'N/A' && (
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Director
                    </h3>
                    <p className="text-muted-foreground">{currentMovie.Director}</p>
                  </div>
                )}

                {currentMovie.Actors && currentMovie.Actors !== 'N/A' && (
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Cast
                    </h3>
                    <p className="text-muted-foreground">{currentMovie.Actors}</p>
                  </div>
                )}

                {currentMovie.Country && currentMovie.Country !== 'N/A' && (
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center">
                      <Globe className="h-4 w-4 mr-2" />
                      Country
                    </h3>
                    <p className="text-muted-foreground">{currentMovie.Country}</p>
                  </div>
                )}

                {currentMovie.Language && currentMovie.Language !== 'N/A' && (
                  <div>
                    <h3 className="font-semibold mb-2">Language</h3>
                    <p className="text-muted-foreground">{currentMovie.Language}</p>
                  </div>
                )}
              </div>

              {currentMovie.Released && currentMovie.Released !== 'N/A' && (
                <div>
                  <h3 className="font-semibold mb-2">Release Date</h3>
                  <p className="text-muted-foreground">{currentMovie.Released}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}