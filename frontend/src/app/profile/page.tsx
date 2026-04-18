'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/app/context/AuthContext'
import { createClient } from '@/app/utils/supabase/client'


export default function Profile() {

    const { user } = useAuth()
    const supabase = createClient();
    const [isGoogleUser, setIsGoogleUser] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user?.app_metadata?.provider === 'google') {
            setIsGoogleUser(true)
        }
    }, [user])

    const updatePassword = async (e: any) => {
        e.preventDefault()
        setLoading(true)

        const new_password = e.target.new_password.value.trim()
        const confirm_password = e.target.new_password_confirm.value.trim()

        if (!new_password || !confirm_password) {
            setLoading(false)
            return alert('Please fill in all fields.')
        }

        if (new_password !== confirm_password) {
            setLoading(false)
            return alert('Passwords do not match.')
        }

        const { error } = await supabase.auth.updateUser({ password: new_password })
        setLoading(false)
        if (error) return alert(error.message)

        alert(isGoogleUser ? 'Password set successfully! You can now login with email/password.' : 'Password updated successfully!')

        e.target.reset()
    }

    return (
        <>
            <section className='about-us clearfix mt-5'>
                <div className='container hero-bnr py-4'>
                    <div className='row text-center'>
                        <div className='col-10 mx-auto'>
                            <div className="section-header">
                                <h1 className='h2'>Profile</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='container p-0'>
                <div className="row">

                    {/* ✅ LEFT SIDE */}
                    <div className="col-md-6">
                        <h3>Account Details</h3>

                        <div className="mb-3">
                            <label>Email</label>
                            <div className="form-control">
                                {user?.email}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label>Full Name</label>
                            <div className="form-control">
                                {user?.name || 'No name set'}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label>Login Type</label>
                            <div className="form-control">
                                {isGoogleUser ? 'Google Login' : 'Email & Password'}
                            </div>
                        </div>
                    </div>

                    {/* ✅ RIGHT SIDE */}
                    <div className="col-md-6">
                        <h3>
                            {isGoogleUser ? 'Set Password' : 'Change Password'}
                        </h3>

                        <form onSubmit={updatePassword}>

                            <div className="mb-3">
                                <label>New Password</label>
                                <input
                                    name="new_password"
                                    type="password"
                                    className="form-control"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label>Confirm Password</label>
                                <input
                                    name="new_password_confirm"
                                    type="password"
                                    className="form-control"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className='button-primary'
                                disabled={loading}
                            >
                                {loading
                                    ? 'Processing...'
                                    : isGoogleUser
                                        ? 'Set Password'
                                        : 'Update Password'}
                            </button>
                        </form>

                        {isGoogleUser && (
                            <p className="mt-2 text-muted">
                                You signed in using Google. Setting a password lets you also login using email/password.
                            </p>
                        )}
                    </div>

                </div>
            </section>
        </>
    )
}