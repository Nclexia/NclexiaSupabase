'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/app/utils/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';

export interface UserWithRole extends SupabaseUser {
  role?: 'user' | 'admin';
  id: string;
  name?: string | null;
  email: string;
  image?: string | null;
}

interface AuthContextType {
  user: UserWithRole | null;
  setUser: React.Dispatch<React.SetStateAction<UserWithRole | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserWithRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const buildUser = (sessionUser: any, profile: any): UserWithRole => ({
    ...sessionUser,
    // role: (sessionUser.user_metadata?.role as 'user' | 'admin') ?? 'user',
    name: sessionUser.user_metadata?.name ?? sessionUser.user_metadata?.full_name ?? null,
    image: sessionUser.user_metadata?.avatar_url ?? null,
    email: sessionUser.email!,
    role: (profile?.role as 'user' | 'admin') ?? 'user',
  });
  useEffect(() => {
    // ✅ separate async function inside
    const handleAuthChange = async (event: any, session: any) => {
      if (session?.user) {
        const { data: profile, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .maybeSingle();

        setUser(buildUser(session.user, profile));
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
      setLoading(false);
    };

    // ✅ useEffect itself stays synchronous
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);

    return () => subscription.unsubscribe(); // ✅ cleanup works correctly
  }, []);

  // useEffect(() => {
  //  const { data: { subscription } } = supabase.auth.onAuthStateChange(
  //     async (event, session) => {
  //       if (session?.user) {

  //         setUser(buildUser(session.user));
  //         setIsLoggedIn(true);
  //       } else {
  //         setUser(null);
  //         setIsLoggedIn(false);
  //       }
  //       setLoading(false); // ✅ always stop loading after event
  //     }
  //   );

  //   return () => subscription.unsubscribe();
  // }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/'
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading, isLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};