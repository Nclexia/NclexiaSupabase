'use client';

import { useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import RingLoaderSpin from '../../../components/gui/spinner';
import { AppSidebar } from "@/components/gui/admin-sidebar"



const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait until user is loaded
    if (!loading && user && user.role !== 'admin') router.push('/');

  }, [user, loading]);

  
  return (
    <div className="flex h-full">
      <AppSidebar />
      <main className="flex-1">{children}</main>
    </div>

  )
};

export default AdminGuard;
