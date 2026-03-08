'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Heart } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer id="contact" className="bg-purple-950 text-purple-200 py-16 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-serif text-white mb-4 gradient-text">
                            Marien&apos;s 40th
                        </h3>
                        <p className="text-purple-300 mb-6 leading-relaxed">
                            Celebrating four decades of love, laughter, and living life to the fullest.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="w-10 h-10 bg-purple-800 hover:bg-fuchsia-600 rounded-full flex items-center justify-center transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#gallery" className="hover:text-fuchsia-400 transition-colors">
                                    Gallery
                                </a>
                            </li>
                            <li>
                                <a href="#itinerary" className="hover:text-fuchsia-400 transition-colors">
                                    Itinerary
                                </a>
                            </li>
                            <li>
                                <a href="#planning" className="hover:text-fuchsia-400 transition-colors">
                                    Planning & Logistics
                                </a>
                            </li>
                            <li>
                                <a href="#rsvp" className="hover:text-fuchsia-400 transition-colors">
                                    RSVP
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-amber-400" />
                                <a
                                    href="mailto:marien.coker@gmail.com"
                                    className="hover:text-amber-400 transition-colors"
                                >
                                    marien.coker@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-amber-400" />
                                <span>+1 203 727 8653</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-purple-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-purple-400 text-sm">
                            © 2026 Marien&apos;s 40th Celebration. Made with love. Built by{' '}
                            <a href="https://www.entracto.com" target="_blank" rel="noopener noreferrer" className="hover:text-fuchsia-400 transition-colors">
                                Entracto
                            </a>{' '}
                            (link -{' '}
                            <a href="https://www.entracto.com" target="_blank" rel="noopener noreferrer" className="hover:text-fuchsia-400 transition-colors">
                                www.entracto.com
                            </a>) for Marien.
                        </p>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2 text-sm text-purple-400"
                        >
                            <Heart size={14} className="text-fuchsia-400 fill-fuchsia-400" />
                            Here&apos;s to 40 more years of magnificence
                        </motion.p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
