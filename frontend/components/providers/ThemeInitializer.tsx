'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { initializeTheme } from '@/lib/features/theme/themeSlice';
import { initializeAuth } from '@/lib/features/auth/authSlice';
import { initializeLocalData } from '@/lib/features/movies/moviesSlice';

export function ThemeInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeTheme());
    dispatch(initializeAuth());
    dispatch(initializeLocalData());
  }, [dispatch]);

  return <>{children}</>;
}