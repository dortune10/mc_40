'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const galleryItems = [
    {
        span: 'col-span-1',
        height: 'h-[400px]',
        image: '/gallery/marien_baby.jpg',
        label: 'A Star is Born',
        alt: 'Sweet baby photo of Marien in a white dress and hat',
    },
    {
        span: 'col-span-1 md:col-span-2',
        height: 'h-[400px]',
        image: '/gallery/marien_family.png',
        label: 'A Mother\'s Love',
        alt: 'Marien with her children in a beautiful field at sunset',
    },
    {
        span: 'col-span-1',
        height: 'h-[450px]',
        image: '/gallery/marien_red_dress.jpg',
        label: 'Bolder than Ever',
        alt: 'Marien in a stunning red dress at a dinner celebration',
    },
    {
        span: 'col-span-1',
        height: 'h-[450px]',
        image: '/gallery/marien_hats.jpg',
        label: 'Explorer of Hearts',
        alt: 'Marien walking through a vibrant street with hanging hats',
    },
    {
        span: 'col-span-1',
        height: 'h-[450px]',
        image: '/gallery/marien_yellow_dress.jpg',
        label: 'Radiant Grace',
        alt: 'Marien in a beautiful yellow leaf-print dress',
    },
    {
        span: 'col-span-1',
        height: 'h-[400px]',
        image: '/gallery/marien_family_white.jpg',
        label: 'The Heart of the Home',
        alt: 'Marien and her daughters in elegant white dresses surrounded by flowers',
    },
    {
        span: 'col-span-1 md:col-span-2',
        height: 'h-[400px]',
        image: '/gallery/marien_pregnancy.jpg',
        label: 'A New Beginning',
        alt: 'Elegant pregnancy portrait of Marien in a pink gown',
    },
    {
        span: 'col-span-1 md:col-span-3',
        height: 'h-[400px] md:h-[600px]',
        image: '/gallery/marien_celebration.jpg',
        label: 'Pure Joy',
        alt: 'Vibrant celebration with Marien dancing in traditional purple attire',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
};

export default function Gallery() {
    return (
        <section id="gallery" className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
                    <div>
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-fuchsia-500 text-sm uppercase tracking-widest font-semibold"
                        >
                            A Life in Pictures
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-serif text-purple-900 mt-2"
                        >
                            The Muse
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-purple-600 italic mt-4 md:mt-0"
                    >
                        Capturing 40 years of beautiful moments
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {galleryItems.map((item, index) => {
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
                                className={`${item.span} ${item.height} rounded-3xl shadow-soft group relative overflow-hidden bg-purple-50`}
                            >
                                {/* Actual Photo */}
                                <Image
                                    src={item.image}
                                    alt={item.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />

                                {/* Glass Overlay on Hover */}
                                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-purple-900/80 via-purple-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <h4 className="text-white font-serif text-2xl mb-1">{item.label}</h4>
                                    <div className="flex items-center gap-2 text-rose-200">
                                        <Heart size={16} fill="currentColor" />
                                        <span className="text-sm font-medium">Memory Captured</span>
                                    </div>
                                </div>

                                {/* Subtle Border on Hover */}
                                <div className="absolute inset-0 border-0 group-hover:border-8 border-white/10 transition-all duration-500 rounded-3xl" />
                            </motion.div>
                        );
                    })}
                </motion.div>

            </div>
        </section>
    );
}
