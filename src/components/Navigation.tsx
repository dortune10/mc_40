'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { href: '#gallery', label: 'Gallery' },
        { href: '#itinerary', label: 'Itinerary' },
        { href: '/hotel', label: 'Hotel' },
        { href: '#planning', label: 'Planning' },
        { href: '#contact', label: 'Contact' },
    ];

    return (
        <nav className="fixed w-full z-50 top-0 left-0 px-4 md:px-6 py-4">
            <div className="max-w-6xl mx-auto glass-card flex justify-between items-center px-6 py-3">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/logo.png"
                        alt="MC Logo"
                        width={40}
                        height={40}
                        className="w-10 h-10"
                    />
                    <span className="text-xl md:text-2xl font-serif font-bold gradient-text">
                        Marien&apos;s 40th
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm font-semibold tracking-wide text-purple-800 hover:text-fuchsia-600 transition-colors duration-300"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="#rsvp"
                        className="btn-primary text-sm"
                    >
                        RSVP Now
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-purple-800 hover:text-fuchsia-600 transition-colors"
                    onClick={() => setMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden mt-2 mx-4">
                    <div className="glass-card py-4 px-6 space-y-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="block text-purple-800 font-semibold hover:text-fuchsia-600 transition-colors py-2"
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="#rsvp"
                            className="block btn-primary text-center mt-4"
                            onClick={() => setMenuOpen(false)}
                        >
                            RSVP Now
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}
