// "use client";
// import { AppSidebar } from "@/components/gui/app-sidebar"
// import { usePathname } from 'next/navigation';
// import { ReactNode } from "react";

// import { useAuth } from '@/app/context/AuthContext';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';


// interface AdminShellProps {
//     children: ReactNode;
// }

// export default function AdminShell({ children }: AdminShellProps) {

//     const { user, loading, isLoggedIn } = useAuth();
//     const router = useRouter();


//     const [ready, setReady] = useState(false);

//     const pathname = usePathname();
//     const hideOnRoutes = ['/dashboard/test','/dashboard/result/detail'];

//     const shouldHide = hideOnRoutes.some((path) => pathname.startsWith(path));
//     useEffect(() => {
//         if (!loading) {
//             if (!isLoggedIn || !user) {
//                 router.push("/");
//             } else {
//                 setReady(true);
//             }
//         }
//     }, [loading, isLoggedIn, user, router]);

//     if (shouldHide) return <>{children}</>;



//     if (ready && isLoggedIn)
//         return (
//             <div className="flex h-full">
//                 <AppSidebar />
//                 <main className="flex-1">{children}</main>
//             </div>

//         )


// }


"use client";
import { AppSidebar } from "@/components/gui/app-sidebar";
import { usePathname } from 'next/navigation';
import { ReactNode } from "react";
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DashboardLoading from '@/app/dashboard/DashboardLoading'

interface AdminShellProps {
  children: ReactNode;
}

export default function AdminShell({ children }: AdminShellProps) {
  const { user, loading, isLoggedIn } = useAuth();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const pathname = usePathname();

  const hideOnRoutes = ['/dashboard/test', '/dashboard/result/detail'];
  const shouldHide = hideOnRoutes.some((path) => pathname.startsWith(path));

  useEffect(() => {
    if (!loading) {
      if (!isLoggedIn || !user) {
        router.push('/');       
      } else {
        setReady(true);        
      }
    }
  }, [loading, isLoggedIn, user, router]);

  if (loading || !ready) {
    return (
      <DashboardLoading/>
    );
  }

  if (shouldHide) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-full">
      <AppSidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}