'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Divider() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); 
  }, []);

  if (!mounted) return null;
  const color = resolvedTheme === 'dark' ? '#292828' : '#ede8e8'

  return (
    <div
      className="w-full h-px transition-colors duration-300"
      style={{ backgroundColor: color }}
    />
  );
}
