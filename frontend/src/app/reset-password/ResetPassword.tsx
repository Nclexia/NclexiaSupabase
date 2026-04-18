// import { Suspense } from 'react'
// import ResetPasswordForm from './ResetPassword';

// export default function ResetPasswordPage() {
// <Suspense fallback={<p>Loading...</p>}>
//     <ResetPasswordForm />
// </Suspense>
// }

'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/app/utils/supabase/client'

export default function ResetPasswordClient() {
  const router = useRouter();
  const params = useSearchParams();
  const supabase = createClient();

  useEffect(() => {
    const handleErrors = async () => {
      const error = params.get('error');
      const error_code = params.get('error_code');
      if (error || error_code === 'otp_expired') {
        await supabase.auth.signOut();
        alert('Reset link expired or invalid. Please request a new one.');
        router.push('/');
      }
    };
    handleErrors();
  }, []);

  const updatePassword = async (e: any) => {
    e.preventDefault();
    const password = e.target.new_password.value.trim();
    const confirm = e.target.new_password_confirm.value.trim();
    if (!password || !confirm) return alert('Please fill all fields');
    if (password !== confirm) return alert('Passwords do not match');

    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      alert('Session expired. Please request reset again.');
      router.push('/');
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });
    if (error) return alert(error.message);

    alert('Password updated successfully');
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <section className="p-6">
      <h2>Reset Password</h2>
      <form onSubmit={updatePassword} className="space-y-4">
        <input name="new_password" type="password" placeholder="New Password" minLength={8} required className="input" />
        <input name="new_password_confirm" type="password" placeholder="Confirm Password" minLength={8} required className="input" />
        <button type="submit" className="button-primary">Update Password</button>
      </form>
    </section>
  );
}