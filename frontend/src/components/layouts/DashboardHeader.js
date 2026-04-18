
'use client';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Moon, Sun, Monitor, LogOut } from 'lucide-react';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';

export default function DashboardHeader() {
    const {  logout, user } = useAuth();


    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else if (theme === 'dark') {
            setTheme('system');
        } else {
            setTheme('light');
        }
    };

    return (
        <>
            <header className="
            header border-b  flex  justify-between  items-center  p-4 ">
                {/* Left: Logo */}
                <div>
                    <Link href="/" className="text-lg font-semibold text-gray-900 dark:text-white">
                        ▲ NCLEXIA
                    </Link>
                </div>

                {/* Right: Icons / Profile / Logout */}
                <div className="flex items-center gap-4">
                    {mounted && (
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            className={`p-2 rounded transition-colors ${theme === 'system'
                                ? 'bg-gray-700 text-white hover:bg-gray-800 dark:bg-neutral-500 dark:hover:bg-neutral-800'
                                : theme === 'dark'
                                    ? 'bg-neutral-500 text-white hover:bg-neutral-600'
                                    : 'bg-gray-700 text-white hover:bg-gray-800'
                                }`}
                        >
                            {theme === 'light' && <Moon size={18} />}
                            {theme === 'dark' && <Sun size={18} />}
                            {theme === 'system' && <Monitor size={18} />}
                        </button>
                    )}

                    <Link href="/profile" className="text-sm text-gray-800 dark:text-gray-200 hover:underline">
                        Profile
                    </Link>

                    <button
                        onClick={logout}
                        className="text-sm text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </header>




        </>
    );
}
