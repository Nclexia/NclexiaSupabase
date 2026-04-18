'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';

export  function ConditionalHeader() {
  const pathname = usePathname();
  const hideOnRoutes = ['/dashboard', '/admin','/test'];

  const shouldHide = hideOnRoutes.some((path) => pathname.startsWith(path));

  return shouldHide ? null : <Header />;
}


export  function ConditionalFooter() {
    const pathname = usePathname();
    const hideOnRoutes = ['/dashboard', '/admin','/test'];
  
    const shouldHide = hideOnRoutes.some((path) => pathname.startsWith(path));
  
    return shouldHide ? null : <Footer />;
  }