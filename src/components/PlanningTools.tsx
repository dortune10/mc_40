'use client';

import { motion } from 'framer-motion';
import { Hotel, Plane, ExternalLink } from 'lucide-react';

const planningCards = [
    {
        icon: Hotel,
        title: 'Accommodations',
        description:
            'We have secured special rates at Sheraton Grand Panama and Aloft Panama. View pricing and booking details.',
        buttonText: 'View Hotel Options',
        link: '/hotel',
        color: 'fuchsia',
    },
    {
        icon: Plane,
        title: 'Travel Info',
        description:
            'Flying in? Tocumen International Airport (PTY) is less than 30 minutes to the hotel.',
        buttonText: 'Flight Tips',
        link: '#',
        color: 'purple',
    },
];

const colorClasses = {
    fuchsia: {
        icon: 'text-fuchsia-600',
        bg: 'bg-fuchsia-50',
        button: 'text-fuchsia-600 hover:text-fuchsia-700',
    },
    amber: {
        icon: 'text-amber-600',
        bg: 'bg-amber-50',
        button: 'text-amber-600 hover:text-amber-700',
    },
    purple: {
        icon: 'text-purple-600',
        bg: 'bg-purple-50',
        button: 'text-purple-600 hover:text-purple-700',
    },
    rose: {
        icon: 'text-rose-500',
        bg: 'bg-rose-50',
        button: 'text-rose-500 hover:text-rose-600',
    },
};

export default function PlanningTools() {
    return (
        <section id="planning" className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-purple-500 text-sm uppercase tracking-widest font-semibold"
                    >
                        Everything You Need
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-serif text-purple-900 mt-2"
                    >
                        Planning & Logistics
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-purple-600 mt-4 max-w-xl mx-auto"
                    >
                        We&apos;ve thought of everything so you can just relax and celebrate
                    </motion.p>
                </div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                    {planningCards.map((card, index) => {
                        const IconComponent = card.icon;
                        const colors = colorClasses[card.color as keyof typeof colorClasses];

                        return (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                className="soft-card p-8 hover:shadow-xl transition-all duration-300"
                            >
                                {/* Icon */}
                                <div
                                    className={`w-14 h-14 ${colors.bg} rounded-2xl flex items-center justify-center mb-6`}
                                >
                                    <IconComponent className={`w-7 h-7 ${colors.icon}`} />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-purple-900 mb-3">
                                    {card.title}
                                </h3>
                                <p className="text-purple-600/80 mb-6">{card.description}</p>

                                {/* Button */}
                                <a
                                    href={card.link}
                                    className={`inline-flex items-center gap-2 font-semibold ${colors.button} transition-colors`}
                                >
                                    {card.buttonText}
                                    <ExternalLink size={16} />
                                </a>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Additional Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <div className="glass-card inline-block px-8 py-4">
                        <p className="text-purple-700">
                            <span className="font-semibold">Questions?</span> Reach out to our
                            event coordinator at{' '}
                            <a
                                href="mailto:marien.coker@gmail.com"
                                className="text-fuchsia-600 hover:underline"
                            >
                                marien.coker@gmail.com
                            </a>
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
