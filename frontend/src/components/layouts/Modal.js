"use client";

import Image from 'next/image';
import { useState, useEffect } from "react";
import { useTheme } from 'next-themes';
import { createClient } from '@/app/utils/supabase/client';

const Modal = ({ onClose }) => {
  const [logIn, setLogIn] = useState(false);
  const [logging, setLogging] = useState(false);
  const [forgetPWD, setForgetPWD] = useState(false);
  const [userName, setUserName] = useState('');

  const supabase = createClient();

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const color = resolvedTheme === 'system' ? 'text-gray-800' : resolvedTheme === 'dark' ? '#292828' : '#ede8e8';

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    setLogging(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLogging(false);

    if (error) {
      alert(error.message);
      return;
    }

    window.location.href = '/dashboard';
  };

  // ---------------- REGISTER (FIXED ONLY LOGIC) ----------------
  const handleRegister = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!name || !email || !password) {
      alert('All fields are required');
      return;
    }

    setLogging(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });
    console.log(data, error)
    setLogging(false);

    if (error) {
      if (error.message.toLowerCase().includes('already')) {
        alert('Email already exists. Please login instead.');
        return;
      }

      alert(error.message);
      return;
    }

    // IMPORTANT: Supabase behavior
    if (data.session) {
      window.location.href = '/dashboard';
      return;
    }

    alert('Check your email to confirm your account');
  }

  // ---------------- GOOGLE LOGIN (FIXED DOMAIN) ----------------
  const signByGoogle = async () => {
    const origin = window.location.origin;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`, 
      },
    });

    if (error) {
      console.error(error);
      alert('Google sign in failed. Please try again.');
    }
  };
  // ---------------- FORGOT PASSWORD (FIXED SUPABASE WAY) ----------------
  const forgotPassword = async (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();

    if (!email) {
      alert('Email required');
      return;
    }

    setLogging(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setLogging(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert('Password reset link sent to email');
  };

  // ---------------- YOUR UI (UNCHANGED) ----------------
  return (
    <>
      <div
        id="authModal"
        className="fixed inset-0 flex items-center justify-center z-50 transition-colors "
        role="dialog"
        aria-labelledby="authModalLabel"
        style={{ backgroundColor: color }}
      >
        {/* Overlay */}
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
        ></div>

        {/* Modal Content */}
        <div
          className="relative z-50  rounded-lg shadow-lg w-full max-w-2xl p-6"
          style={{ backgroundColor: color }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2  text-gray-500 hover:text-gray-800 dark:hover:text-white"
          >
            ✕
          </button>

          {/* Header */}
          <div className="text-center space-y-2 border-b pb-4 mb-4">
            <img src="/images/icon1.png" alt="Logo" className="mx-auto h-12" />
            <h2 id="authModalLabel" className="text-2xl font-semibold">
              Sign in to NCLEXIA
            </h2>
            <p className="text-sm italic text-gray-500 dark:text-gray-400">
              Welcome back! Please sign in to continue
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-4">
            {!forgetPWD ? (
              <>
                <button
                  className={`px-4  py-2 mx-2 ${!logIn ? 'button-primary' : 'selection-button'}`}
                  onClick={() => setLogIn(false)}
                >
                  Sign In
                </button>
                <button
                  className={`px-4 py-2 mx-2 ${logIn ? 'button-primary' : 'selection-button'}`}
                  onClick={() => setLogIn(true)}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={() => {
                  setLogIn(true);
                  setForgetPWD(false);
                }}
              >
                Back to Sign In
              </button>
            )}
          </div>

          {/* ---------------- LOGIN FORM ---------------- */}
          {!forgetPWD && !logIn && (
            <>
              <form id="login-form" onSubmit={handleLogin} className="space-y-4">
                <p style={{ display: "none", color: "red" }} id='errorShow'>
                  Invalid credentials
                </p>

                <input
                  type="email"
                  name="email"
                  placeholder="email@address.com"
                  maxLength={50}
                  required
                  className="w-full px-3 py-2 my-3  rounded-md input-field "
                />

                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    placeholder="min. 8 characters"
                    minLength={8}
                    maxLength={12}
                    required
                    className="w-full px-3 py-2 rounded-md input-field "
                  />

                  <span
                    onClick={() => {
                      const p = document.querySelector('#login-form [name="password"]');
                      p.type = p.type === 'password' ? 'text' : 'password';
                    }}
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 dark:text-gray-400"
                  >
                    👁
                  </span>
                </div>

                <div className="flex justify-end">
                  <span
                    onClick={() => setForgetPWD(true)}
                    className="text-sm text-blue-600 dark:text-blue-400 cursor-pointer"
                  >
                    Forgot password?
                  </span>
                </div>

                <button type="submit" disabled={logging} className="w-full button-primary disabled:opacity-50">
                  Sign In
                </button>

                <div className="py-2 text-center">OR</div>
              </form>

              <button onClick={signByGoogle} className="w-full flex items-center justify-center py-2 gap-2 button-google ">
                <Image src="/images/svg/google-logo.svg" alt="" width={30} height={30} />
                Sign in Google
              </button>
            </>
          )}

          {/* ---------------- REGISTER FORM ---------------- */}
          {!forgetPWD && logIn && (
            <>
              <form id="register-form" onSubmit={handleRegister} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Full Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  className="w-full px-3 py-2 my-1 rounded-md input-field"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="email@address.com"
                  required
                  className="w-full px-3 py-2 my-1  rounded-md input-field"
                />

                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    placeholder="8+ characters"
                    minLength={8}
                    maxLength={15}
                    required
                    className="w-full px-3 py-2 my-1  rounded-md input-field"
                  />

                  <span
                    onClick={() => {
                      const p = document.querySelector('#register-form [name="password"]');
                      p.type = p.type === 'password' ? 'text' : 'password';
                    }}
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 dark:text-gray-400"
                  >
                    👁
                  </span>
                </div>

                <button type="submit" disabled={logging} className="w-full py-2 button-success ">
                  Sign Up
                </button>

                <div className="py-2 text-center">OR</div>
              </form>

              <button onClick={signByGoogle} className="w-full flex items-center justify-center py-2 gap-2 button-google ">
                <Image src="/images/svg/google-logo.svg" alt="" width={30} height={30} />
                Sign in Google
              </button>
            </>
          )}

          {/* ---------------- FORGOT PASSWORD ---------------- */}
          {forgetPWD && (
            <form onSubmit={forgotPassword} className="space-y-4">
              <p className="text-center text-sm">
                Enter your email, and we'll send you a reset link.
              </p>

              <input
                type="email"
                name="email"
                placeholder="email@address.com"
                required
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-800"
              />

              <button type="submit" disabled={logging} className="w-full py-2 my-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50">
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;