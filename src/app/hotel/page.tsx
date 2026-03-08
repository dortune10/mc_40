'use client';

import { motion } from 'framer-motion';
import { Hotel, Mail, Users, Baby, Coffee, CreditCard, ArrowLeft, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const hotels = [
    {
        name: 'Sheraton Grand Panama',
        roomType: 'Deluxe Room',
        guests: 2,
        singlePrice: 115,
        doublePrice: 115,
        additionalGuest: 30,
        email: 'reservas@sheratongrandpanama.com',
        color: 'purple',
    },
    {
        name: 'Aloft Panama',
        roomType: 'Aloft Room',
        guests: 2,
        singlePrice: 95,
        doublePrice: 95,
        additionalGuest: 25,
        email: 'reservas@aloftpanama.com',
        color: 'fuchsia',
    },
];

const subjectLine = 'Fiesta Marien Coker – July 25, 2026';

export default function HotelPage() {
    const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
    const [copiedSubject, setCopiedSubject] = useState(false);

    const copyToClipboard = (text: string, type: 'email' | 'subject') => {
        navigator.clipboard.writeText(text);
        if (type === 'email') {
            setCopiedEmail(text);
            setTimeout(() => setCopiedEmail(null), 2000);
        } else {
            setCopiedSubject(true);
            setTimeout(() => setCopiedSubject(false), 2000);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-rose-100">
            {/* Header */}
            <header className="pt-8 pb-4 px-6">
                <div className="max-w-4xl mx-auto">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-purple-600 hover:text-fuchsia-600 transition-colors mb-6"
                    >
                        <ArrowLeft size={20} />
                        <span className="font-medium">Back to Home</span>
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <section className="px-6 pb-12">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Hotel className="w-16 h-16 mx-auto text-amber-500 mb-6" />
                        <h1 className="text-4xl md:text-5xl font-serif text-purple-900 mb-4">
                            Hotel Reservations
                        </h1>
                        <p className="text-lg text-purple-600 max-w-2xl mx-auto">
                            We&apos;ve secured special rates at two beautiful hotels in Panama City for Marien&apos;s celebration.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Hotel Cards */}
            <section className="px-6 pb-12">
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
                    {hotels.map((hotel, index) => (
                        <motion.div
                            key={hotel.name}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15, duration: 0.5 }}
                            className={`soft-card p-8 relative overflow-hidden ${hotel.color === 'purple'
                                    ? 'hover:ring-2 hover:ring-purple-300'
                                    : 'hover:ring-2 hover:ring-fuchsia-300'
                                } transition-all`}
                        >
                            {/* Hotel Header */}
                            <div className="mb-6">
                                <h2 className={`text-2xl font-serif font-bold ${hotel.color === 'purple' ? 'text-purple-900' : 'text-fuchsia-800'
                                    }`}>
                                    {hotel.name.split(' ')[0]}
                                </h2>
                                <p className="text-purple-600">{hotel.name}</p>
                            </div>

                            {/* Room Type */}
                            <div className="mb-6">
                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${hotel.color === 'purple'
                                        ? 'bg-purple-100 text-purple-700'
                                        : 'bg-fuchsia-100 text-fuchsia-700'
                                    }`}>
                                    <Users size={16} />
                                    {hotel.roomType} ({hotel.guests} guests)
                                </div>
                            </div>

                            {/* Pricing */}
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-purple-700">Single Occupancy</span>
                                    <span className="font-bold text-purple-900">${hotel.singlePrice} <span className="text-sm font-normal text-purple-500">+ taxes</span></span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-purple-700">Double Occupancy</span>
                                    <span className="font-bold text-purple-900">${hotel.doublePrice} <span className="text-sm font-normal text-purple-500">+ taxes</span></span>
                                </div>
                                <div className="border-t border-purple-100 pt-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-purple-600">Additional Guest (13+)</span>
                                        <span className="font-semibold text-purple-800">${hotel.additionalGuest}/night</span>
                                    </div>
                                </div>
                            </div>

                            {/* Email Button */}
                            <button
                                onClick={() => copyToClipboard(hotel.email, 'email')}
                                className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${hotel.color === 'purple'
                                        ? 'bg-purple-900 hover:bg-purple-800 text-white'
                                        : 'bg-fuchsia-700 hover:bg-fuchsia-600 text-white'
                                    }`}
                            >
                                {copiedEmail === hotel.email ? (
                                    <>
                                        <Check size={18} />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Mail size={18} />
                                        {hotel.email}
                                    </>
                                )}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Includes Section */}
            <section className="px-6 pb-12">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="glass-card p-8 text-center">
                        <Coffee className="w-10 h-10 mx-auto text-amber-500 mb-4" />
                        <h3 className="text-xl font-bold text-purple-900 mb-2">Breakfast Included</h3>
                        <p className="text-purple-600">All rates include breakfast for 2 guests</p>
                    </div>
                </motion.div>
            </section>

            {/* Children Policy */}
            <section className="px-6 pb-12">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="soft-card p-8"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Baby className="w-6 h-6 text-rose-500" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-purple-900 mb-3">Children Policy</h3>
                                <ul className="space-y-2 text-purple-700">
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-fuchsia-400 rounded-full" />
                                        Ages 0-5: 50% breakfast charge
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-fuchsia-400 rounded-full" />
                                        Ages 6 and up: breakfast + taxes
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Booking Instructions */}
            <section className="px-6 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="bg-gradient-to-r from-purple-900 to-fuchsia-900 rounded-3xl p-8 text-white">
                        <CreditCard className="w-10 h-10 text-amber-400 mb-4" />
                        <h3 className="text-2xl font-serif font-bold mb-4">How to Book</h3>
                        <p className="text-purple-200 mb-6">
                            Email your preferred hotel directly and include the following subject line:
                        </p>

                        <div className="bg-white/10 backdrop-blur rounded-xl p-4 mb-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-purple-300 mb-1">Email Subject Line:</p>
                                    <p className="font-semibold text-lg text-amber-300">{subjectLine}</p>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(subjectLine, 'subject')}
                                    className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                                    aria-label="Copy subject line"
                                >
                                    {copiedSubject ? <Check size={20} /> : <Copy size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <a
                                href={`mailto:reservas@sheratongrandpanama.com?subject=${encodeURIComponent(subjectLine)}`}
                                className="block py-3 px-6 bg-white/20 hover:bg-white/30 rounded-xl text-center font-semibold transition-colors"
                            >
                                Email Sheraton
                            </a>
                            <a
                                href={`mailto:reservas@aloftpanama.com?subject=${encodeURIComponent(subjectLine)}`}
                                className="block py-3 px-6 bg-amber-500 hover:bg-amber-400 text-black rounded-xl text-center font-semibold transition-colors"
                            >
                                Email Aloft
                            </a>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
