'use client';

import { motion } from 'framer-motion';
import { Clock, MapPin, Shirt, Gift, Sparkles } from 'lucide-react';

interface ItineraryItem {
    id: string;
    day: string;
    title: string;
    time: string;
    description: string;
    dressCode: string;
    location: string;
    isHighlight: boolean;
}

interface ItineraryProps {
    events: ItineraryItem[];
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
    },
};

export default function Itinerary({ events }: ItineraryProps) {
    return (
        <section
            id="itinerary"
            className="py-20 bg-white/40 backdrop-blur-lg border-y border-white/50"
        >
            <div className="max-w-4xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-amber-500 text-sm uppercase tracking-widest font-semibold"
                    >
                        July 23 - 26, 2026
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-serif text-purple-900 mt-2"
                    >
                        The Celebration Week
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-purple-600 mt-4 max-w-xl mx-auto"
                    >
                        Four days of joy, laughter, and memories to last a lifetime
                    </motion.p>
                </div>

                {/* Events List */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    className="space-y-6"
                >
                    {events.map((event) => (
                        <motion.div
                            key={event.id}
                            variants={itemVariants}
                            whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                            className={`p-6 md:p-8 rounded-3xl border transition-all relative overflow-hidden
                ${event.isHighlight
                                    ? 'bg-gradient-to-r from-purple-900 via-purple-800 to-fuchsia-900 text-white border-transparent shadow-2xl ring-4 ring-amber-400/40'
                                    : 'bg-white/70 border-white text-purple-900 hover:shadow-lg'
                                }`}
                        >
                            {/* Highlight Decoration */}
                            {event.isHighlight && (
                                <>
                                    <div className="absolute top-0 right-0 p-6 opacity-10">
                                        <Gift size={120} />
                                    </div>
                                    <div className="absolute top-4 left-4">
                                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full uppercase tracking-wider">
                                            <Sparkles size={12} /> Main Event
                                        </span>
                                    </div>
                                </>
                            )}

                            {/* Content */}
                            <div className={event.isHighlight ? 'pt-8' : ''}>
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                                    <h3 className="text-2xl md:text-3xl font-bold font-serif">
                                        {event.title}
                                    </h3>
                                    <div
                                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap
                    ${event.isHighlight
                                                ? 'bg-amber-500/90 text-black'
                                                : 'bg-purple-100 text-purple-700'
                                            }`}
                                    >
                                        <Clock size={14} />
                                        {event.day} • {event.time}
                                    </div>
                                </div>

                                <p
                                    className={`text-lg mb-4 whitespace-pre-wrap ${event.isHighlight ? 'text-purple-100' : 'text-purple-700/80'
                                        }`}
                                >
                                    {event.description}
                                </p>

                                {/* Meta Info */}
                                <div className="flex flex-wrap gap-4 text-sm">
                                    <div
                                        className={`flex items-center gap-2 ${event.isHighlight ? 'text-purple-200' : 'text-purple-500'
                                            }`}
                                    >
                                        <MapPin size={16} />
                                        {event.location}
                                    </div>
                                    <div
                                        className={`flex items-center gap-2 ${event.isHighlight ? 'text-purple-200' : 'text-purple-500'
                                            }`}
                                    >
                                        <Shirt size={16} />
                                        {event.dressCode}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
