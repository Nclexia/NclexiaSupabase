
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useState, useEffect } from 'react';
import Divider from '../gui/Divider'
import dynamic from "next/dynamic";
import { useAuth } from '@/app/context/AuthContext';

const links = [
  // { href: '/docs', label: 'Docs' },
  // { href: '/learn', label: 'Learn' },
  { href: '/practice', label: 'Practice' },
];

export default function Navbar() {
  const { isLoggedIn, logout, user } = useAuth();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const Modal = dynamic(() => import('./Modal'), {
    ssr: false
  });

  useEffect(() => setMounted(true), []);

  useEffect(() => { }, [showModal]);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  return (<>
    <>
      <header className="header">


        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <Link href="/" className=" font-semibold text-lg">
            ▲ NCLEXIA
          </Link>
       
          {/* Nav Links */}
          <nav className="hidden md:flex gap-8">
            {links.map(({ href, label }) => (
              <Link key={href} href={href} className="group relative text-sm text-neutral-300 hover:text-white transition-colors">
                {label}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] w-full bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${pathname === href ? 'scale-x-100' : ''
                    }`}
                />
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4">


            {mounted && (
              <button
                onClick={toggleTheme}
                className={`p-1 rounded transition-colors ${theme === 'system'
                  ? 'bg-gray-700 text-white hover:bg-gray-800 dark:bg-neutral-500 dark:text-white hover:bg-gray-200 dark:hover:bg-neutral-800'
                  : theme === 'dark'
                    ? ' bg-neutral-500 text-white hover:bg-neutral-600'
                    : 'bg-gray-700 text-white hover:bg-gray-800'
                  }`}
                aria-label="Toggle theme"
              >
                {theme === 'light' && <Moon size={18} />}
                {theme === 'dark' && <Sun size={18} />}
                {theme === 'system' && <Monitor size={18} />}
              </button>
            )}

          </div>


          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                {/* Avatar and Dropdown Wrapper */}
                <div
                  className="relative"
                  onMouseEnter={() => { setIsHovered(true) }}
                  onMouseLeave={() => { setIsHovered(false); }}
                >
                  {/* Avatar Circle */}
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 cursor-pointer bg-white">
                    {user.avatar_url ? (
                      <img
                        src={user.avatar_url}
                        alt={user.name}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.nextElementSibling;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : null}

                    {/* Fallback Initial (shows if avatar_url is missing or failed) */}
                    <div
                      className="w-full h-full flex items-center justify-center text-black font-bold uppercase"
                      style={{ display: user.avatar_url ? 'none' : 'flex' }}
                    >
                      {user.name?.[0]}
                    </div>
                  </div>

                  {/* Dropdown Menu */}
                  {isHovered && (
                    <div className="absolute top-10 right-0  rounded  z-50 isHover">
                      <ul className="py-2 text-sm ">
                        <li>
                          <Link href="/profile" className="block px-4 py-2 dropDownLink ">
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link href="/dashboard" className="block px-4 py-2 dropDownLink ">
                            Dashboard
                          </Link>
                        </li>
                        {user.role == 'admin' && (
                          <li>
                            <Link href="/admin" className="block px-4 py-2 dropDownLink ">
                              Admin
                            </Link>
                          </li>
                        )}
                        <li className='dropDownLink'>
                          <button
                            onClick={logout}
                            className="block px-4 py-2 dropDownLink"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>



              </>
            ) : (
              <button
                className="button-primary"
                onClick={() => setShowModal(true)}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
        <Divider />
      </header >
      {showModal && <Modal onClose={() => setShowModal(false)} theme="system" />}
    </>

  </>
  );
}
