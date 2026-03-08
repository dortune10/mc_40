'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const targetDate = new Date('2026-07-25T19:00:00'); // Marien's Gala Start

export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    } | null>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else {
                setTimeLeft(null);
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!timeLeft) return null;

    const units = [
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds },
    ];

    return (
        <div className="flex flex-wrap justify-center gap-4 py-8">
            {units.map((unit, index) => (
                <motion.div
                    key={unit.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center"
                >
                    <div className="w-20 h-24 sm:w-24 sm:h-32 bg-white/40 backdrop-blur shadow-sm rounded-3xl border border-white/50 flex items-center justify-center mb-2">
                        <span className="text-3xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-800 to-fuchsia-800 leading-none">
                            {String(unit.value).padStart(2, '0')}
                        </span>
                    </div>
                    <span className="text-xs sm:text-sm uppercase tracking-widest font-bold text-purple-600/60">
                        {unit.label}
                    </span>
                </motion.div>
            ))}
        </div>
    );
}
