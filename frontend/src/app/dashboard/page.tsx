'use client'

import { useEffect, useState } from 'react';
import { createClient } from '@/app/utils/supabase/client';
import { useRouter } from 'next/navigation';
import  DashboardLoading from './DashboardLoading'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    //  Clean the token hash from URL bar (after Google login)
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/'); // not logged in → go home
        return;
      }

      //  Fetch user profile from your public.users table
      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      setUser(profile || user);
      setLoading(false);
    };

    // ✅\ Handle Google OAuth hash redirect
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        getUser();
      }
    });

    getUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        {/* <p className="text-lg animate-pulse">Loading dashboard...</p> */}
        <DashboardLoading/>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold">
        Welcome, {user?.name || user?.email} 👋
      </h3>
      <p className="text-gray-500 mt-2">Go to the Create test</p>
              {/* <DashboardLoading/> */}

    </div>
  );
}