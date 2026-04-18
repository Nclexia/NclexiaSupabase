'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function HtmlClassGuardian() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const html = document.documentElement.classList;
    html.remove('light');      
    if (resolvedTheme === 'dark') {
      html.add('dark');
    } else {
      html.remove('dark');
    }
  }, [resolvedTheme]);

  return null;
}
