'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Check, Loader2, Users, Search, Plus, Minus, UserPlus } from 'lucide-react';

export default function RSVPForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        attendingGala: false,
        attendingBrunch: false,
        dietaryNotes: '',
        message: '',
        adultCount: 1,
        childCount: 0,
        adultNames: [''],
        childNames: [] as string[],
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'searching'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleArrayChange = (type: 'adultNames' | 'childNames', index: number, value: string) => {
        const newArray = [...formData[type]];
        newArray[index] = value;
        setFormData(prev => ({ ...prev, [type]: newArray }));
    };

    const adjustCount = (type: 'adultCount' | 'childCount', delta: number) => {
        setFormData(prev => {
            const currentCount = prev[type];
            const newCount = Math.max(type === 'adultCount' ? 1 : 0, currentCount + delta);

            // Adjust names array length
            const nameKey = type === 'adultCount' ? 'adultNames' : 'childNames';
            let newNames = [...prev[nameKey]];
            if (newCount > currentCount) {
                newNames = [...newNames, ...Array(newCount - currentCount).fill('')];
            } else {
                newNames = newNames.slice(0, newCount);
            }

            return { ...prev, [type]: newCount, [nameKey]: newNames };
        });
    };

    const findReservation = async () => {
        if (!formData.firstName || !formData.lastName) {
            setErrorMessage('Please enter first and last name to search.');
            return;
        }
        setStatus('searching');
        setErrorMessage('');
        try {
            const res = await fetch(`/api/rsvp?firstName=${formData.firstName}&lastName=${formData.lastName}`);
            if (res.ok) {
                const data = await res.json();
                setFormData({
                    ...data,
                    adultNames: data.adultNames.length > 0 ? data.adultNames : [data.firstName + ' ' + data.lastName],
                    childNames: data.childNames || [],
                });
                setIsEditing(true);
                setStatus('idle');
            } else {
                setErrorMessage('No reservation found with that name. You can start a new one!');
                setStatus('idle');
            }
        } catch {
            setErrorMessage('Search failed. Please try again.');
            setStatus('idle');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch('/api/rsvp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit RSVP');
            }

            setStatus('success');
            setTimeout(() => {
                setStatus('idle');
                setIsEditing(false);
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    attendingGala: false,
                    attendingBrunch: false,
                    dietaryNotes: '',
                    message: '',
                    adultCount: 1,
                    childCount: 0,
                    adultNames: [''],
                    childNames: [],
                });
            }, 5000);
        } catch {
            setStatus('error');
            setErrorMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <section
            id="rsvp"
            className="py-20 px-6 bg-gradient-to-b from-purple-900 via-purple-800 to-fuchsia-900 text-rose-50 rounded-t-[3rem] mt-10 relative overflow-hidden"
        >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
            </div>

            <div className="max-w-2xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <Heart className="w-12 h-12 mx-auto mb-6 text-amber-400 fill-amber-400" />
                    <h2 className="text-4xl md:text-5xl font-serif mb-4">
                        {isEditing ? 'Modify RSVP' : 'Kindly Reply'}
                    </h2>
                    <p className="text-purple-200 text-lg">
                        Please RSVP by <span className="text-amber-400 font-semibold">June 1, 2026</span>
                    </p>
                </motion.div>

                {status === 'success' ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                    >
                        <div className="w-20 h-20 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check className="w-10 h-10 text-purple-900" />
                        </div>
                        <h3 className="text-3xl font-serif mb-4">Confirmed!</h3>
                        <p className="text-purple-200 text-lg">
                            {isEditing ? 'Your reservation has been updated.' : 'We can\'t wait to celebrate with you!'}
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        {/* Name Search Section */}
                        <div className="glass-dark p-6 rounded-3xl border border-white/5 space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="label-text">First Name *</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="input-dark"
                                        placeholder="Marien"
                                    />
                                </div>
                                <div>
                                    <label className="label-text">Last Name *</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="input-dark"
                                        placeholder="Coker"
                                    />
                                </div>
                            </div>

                            {!isEditing && (
                                <button
                                    onClick={findReservation}
                                    disabled={status === 'searching'}
                                    className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center gap-2 transition-all"
                                >
                                    {status === 'searching' ? <Loader2 className="animate-spin" /> : <Search size={18} />}
                                    Find existing reservation to modify
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <AnimatePresence>
                                {(isEditing || (formData.firstName && formData.lastName)) && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="space-y-6"
                                    >
                                        {/* Contact */}
                                        <div>
                                            <label className="label-text">Email Address *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="input-dark"
                                                placeholder="marien@example.com"
                                            />
                                        </div>

                                        {/* Guests Count */}
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="glass-dark p-4 rounded-3xl flex items-center justify-between">
                                                <span className="font-medium">Adults</span>
                                                <div className="flex items-center gap-4">
                                                    <button type="button" onClick={() => adjustCount('adultCount', -1)} className="p-1 hover:bg-white/10 rounded-lg"><Minus size={16} /></button>
                                                    <span className="w-4 text-center text-amber-400 font-bold">{formData.adultCount}</span>
                                                    <button type="button" onClick={() => adjustCount('adultCount', 1)} className="p-1 hover:bg-white/10 rounded-lg"><Plus size={16} /></button>
                                                </div>
                                            </div>
                                            <div className="glass-dark p-4 rounded-3xl flex items-center justify-between">
                                                <span className="font-medium">Kids</span>
                                                <div className="flex items-center gap-4">
                                                    <button type="button" onClick={() => adjustCount('childCount', -1)} className="p-1 hover:bg-white/10 rounded-lg"><Minus size={16} /></button>
                                                    <span className="w-4 text-center text-amber-400 font-bold">{formData.childCount}</span>
                                                    <button type="button" onClick={() => adjustCount('childCount', 1)} className="p-1 hover:bg-white/10 rounded-lg"><Plus size={16} /></button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Guest Names */}
                                        <div className="space-y-4">
                                            {formData.adultCount > 0 && (
                                                <div className="space-y-3">
                                                    <p className="text-sm font-semibold text-purple-300 flex items-center gap-2"><Users size={14} /> Adult Names</p>
                                                    {formData.adultNames.map((name, i) => (
                                                        <input
                                                            key={`adult-${i}`}
                                                            type="text"
                                                            value={name}
                                                            onChange={(e) => handleArrayChange('adultNames', i, e.target.value)}
                                                            className="input-dark"
                                                            placeholder={`Adult ${i + 1} Name`}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                            {formData.childCount > 0 && (
                                                <div className="space-y-3">
                                                    <p className="text-sm font-semibold text-purple-300 flex items-center gap-2"><UserPlus size={14} /> Kids Names</p>
                                                    {formData.childNames.map((name, i) => (
                                                        <input
                                                            key={`child-${i}`}
                                                            type="text"
                                                            value={name}
                                                            onChange={(e) => handleArrayChange('childNames', i, e.target.value)}
                                                            className="input-dark"
                                                            placeholder={`Child ${i + 1} Name`}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Events */}
                                        <div className="space-y-3">
                                            <p className="text-purple-200 font-medium">Attending:</p>
                                            <div className="grid sm:grid-cols-2 gap-3">
                                                <label className="flex items-center gap-3 glass-dark p-4 rounded-2xl cursor-pointer group">
                                                    <input type="checkbox" name="attendingGala" checked={formData.attendingGala} onChange={handleChange} className="checkbox-custom" />
                                                    <span className="text-sm">The 40th Gala</span>
                                                </label>
                                                <label className="flex items-center gap-3 glass-dark p-4 rounded-2xl cursor-pointer group">
                                                    <input type="checkbox" name="attendingBrunch" checked={formData.attendingBrunch} onChange={handleChange} className="checkbox-custom" />
                                                    <span className="text-sm">Farewell Brunch</span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Dietary & Message */}
                                        <div>
                                            <label className="label-text">Dietary Restrictions</label>
                                            <input type="text" name="dietaryNotes" value={formData.dietaryNotes} onChange={handleChange} className="input-dark" placeholder="None, Vegan, Allergies..." />
                                        </div>
                                        <div>
                                            <label className="label-text">Message for Marien</label>
                                            <textarea name="message" value={formData.message} onChange={handleChange} rows={3} className="input-dark resize-none" placeholder="Share a wish..." />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="w-full py-4 btn-gold text-lg flex items-center justify-center gap-2"
                                        >
                                            {status === 'loading' ? <Loader2 className="animate-spin" /> : (isEditing ? 'Update Reservation' : 'Confirm Attendance')}
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                        {errorMessage && <p className="text-rose-300 text-center text-sm">{errorMessage}</p>}
                    </motion.div>
                )}
            </div>

            <style jsx>{`
                .label-text { @apply block text-sm font-medium text-purple-200 mb-2; }
                .checkbox-custom { @apply w-5 h-5 rounded accent-amber-500 cursor-pointer; }
            `}</style>
        </section>
    );
}

