'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                // The API now sets the cookie automatically
                router.push('/admin');
            } else {
                setError(true);
                setTimeout(() => setError(false), 2000);
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(true);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-rose-100 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-white/80 backdrop-blur rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-sm">
                        <Lock className="text-purple-600" size={28} />
                    </div>
                    <h1 className="text-3xl font-serif font-bold text-purple-900">Admin Access</h1>
                    <p className="text-purple-600 mt-2 font-medium">Please enter your password to continue</p>
                </div>

                <div className="soft-card p-8 backdrop-blur-md">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-purple-700 mb-2">Password</label>
                            <div className="relative group">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`w-full px-5 py-4 bg-white/70 border-2 rounded-2xl outline-none transition-all duration-300
                                        ${error ? 'border-red-300 ring-2 ring-red-100' : 'border-purple-100 group-hover:border-purple-300 focus:border-purple-600 focus:ring-4 focus:ring-purple-100'}
                                    `}
                                    placeholder="••••••••"
                                    autoFocus
                                />
                                <Lock className="absolute right-5 top-1/2 -translate-y-1/2 text-purple-300" size={20} />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-gradient-to-r from-purple-700 to-fuchsia-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:from-purple-800 hover:to-fuchsia-800 transition-all active:scale-[0.98]"
                        >
                            Log In
                            <ArrowRight size={20} />
                        </button>
                    </form>

                    {error && (
                        <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="text-red-500 text-center mt-4 text-sm font-semibold"
                        >
                            Invalid password. Please try again.
                        </motion.p>
                    )}
                </div>

                <div className="mt-8 text-center text-sm text-purple-500 flex items-center justify-center gap-2">
                    <Sparkles size={14} />
                    Milestone 40th Admin Panel
                    <Sparkles size={14} />
                    <br />
                    <Link href="/" className="hover:underline font-medium decoration-purple-300 underline-offset-4">Return Home</Link>
                </div>
            </motion.div>
        </div>
    );
}
