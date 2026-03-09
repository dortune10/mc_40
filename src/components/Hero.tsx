'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Sparkles } from 'lucide-react';
import Countdown from './Countdown';

export default function Hero() {
    return (
        <header className="relative pt-32 md:pt-40 pb-20 px-6 text-center overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-64 h-64 bg-fuchsia-200/30 rounded-full blur-3xl" />
                <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-amber-100/40 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative max-w-4xl mx-auto"
            >
                {/* Established Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="inline-flex items-center gap-2 mb-6"
                >
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span className="uppercase tracking-[0.3em] text-amber-600 text-xs md:text-sm font-bold">
                        Est. 1986
                    </span>
                    <Sparkles className="w-4 h-4 text-amber-500" />
                </motion.div>

                {/* Main Heading */}
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif mb-6 text-purple-900 leading-tight">
                    Forty Years of
                    <br />
                    <span className="gradient-text">Magnificence</span>
                </h1>

                {/* Countdown Timer */}
                <Countdown />

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-lg md:text-xl lg:text-2xl text-purple-800/80 mb-10 font-light max-w-2xl mx-auto"
                >
                    Join us in Panama City for a weekend of celebration, love, and unforgettable memories.
                </motion.p>

                {/* Date & Location Pills */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="flex flex-col sm:flex-row justify-center gap-4 items-center"
                >
                    <div className="flex items-center gap-3 px-6 py-3 glass-card">
                        <Calendar className="w-5 h-5 text-fuchsia-600" />
                        <span className="font-medium text-purple-900">July 22 - 26, 2026</span>
                    </div>
                    <div className="flex items-center gap-3 px-6 py-3 glass-card">
                        <MapPin className="w-5 h-5 text-amber-500" />
                        <span className="font-medium text-purple-900">Panama City, Panama</span>
                    </div>
                </motion.div>


                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="mt-16"
                >
                    <a
                        href="#gallery"
                        className="inline-flex flex-col items-center text-purple-400 hover:text-fuchsia-500 transition-colors"
                    >
                        <span className="text-xs uppercase tracking-widest mb-2">Explore</span>
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                />
                            </svg>
                        </motion.div>
                    </a>
                </motion.div>
            </motion.div>
        </header>
    );
}
