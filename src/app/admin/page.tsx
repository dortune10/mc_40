'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Plus,
    Pencil,
    Trash2,
    Save,
    X,
    ArrowLeft,
    Calendar,
    Clock,
    MapPin,
    Shirt,
    Star,
    Users,
    ArrowUpDown,
    RefreshCcw,
    LogOut
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Event {
    id: string;
    day: string;
    title: string;
    time: string;
    description: string;
    dressCode: string;
    location: string;
    isHighlight: boolean;
}

interface RSVP {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    attendingEvents: Record<string, boolean>;
    adultCount: number;
    childCount: number;
    adultNames: string[];
    childNames: string[];
    message: string;
    submittedAt: string;
}

interface GuestItem {
    name: string;
    type: string;
    attendingCount: number;
    primary: string;
    [key: string]: string | number;
}

const emptyEvent: Omit<Event, 'id'> = {
    day: '',
    title: '',
    time: '',
    description: '',
    dressCode: '',
    location: '',
    isHighlight: false,
};

export default function AdminPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [rsvps, setRsvps] = useState<RSVP[]>([]);
    const [activeTab, setActiveTab] = useState<'events' | 'rsvps' | 'guests'>('events');
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>(emptyEvent);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>({ key: 'name', direction: 'asc' });
    const router = useRouter();

    const handleSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    useEffect(() => {
        const isAuth = document.cookie.split('; ').some(row => row.startsWith('admin_session=true'));
        if (!isAuth) {
            router.push('/admin/login');
        } else {
            setIsAuthenticated(true);
            fetchData();
        }
    }, [router]);

    // Set up real-time subscription
    useEffect(() => {
        if (!isAuthenticated) return;

        const channel = supabase
            .channel('admin-dashboard')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'rsvps' },
                () => {
                    console.log('Real-time RSVP update');
                    fetchData();
                }
            )
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'itinerary' },
                () => {
                    console.log('Real-time Itinerary update');
                    fetchData();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [isAuthenticated]);

    const handleLogout = () => {
        document.cookie = 'admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        router.push('/admin/login');
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const [eventsRes, rsvpsRes] = await Promise.all([
                fetch('/api/itinerary'),
                fetch('/api/rsvp'),
            ]);
            const eventsData = await eventsRes.json();
            const rsvpsData = await rsvpsRes.json();
            setEvents(Array.isArray(eventsData) ? eventsData : []);
            setRsvps(Array.isArray(rsvpsData) ? rsvpsData : []);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };

    const handleCreate = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/itinerary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newEvent),
            });
            if (res.ok) {
                setIsCreating(false);
                setNewEvent(emptyEvent);
                await fetchData();
            }
        } catch (error) {
            console.error('Error creating event:', error);
        }
        setSaving(false);
    };

    const handleUpdate = async () => {
        if (!editingEvent) return;
        setSaving(true);
        try {
            const res = await fetch('/api/itinerary', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingEvent),
            });
            if (res.ok) {
                setEditingEvent(null);
                await fetchData();
            }
        } catch (error) {
            console.error('Error updating event:', error);
        }
        setSaving(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this event?')) return;
        try {
            await fetch(`/api/itinerary?id=${id}`, { method: 'DELETE' });
            await fetchData();
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const handleDeleteRSVP = async (id: string) => {
        if (!confirm('Are you sure you want to cancel/delete this reservation? This cannot be undone.')) return;
        try {
            const res = await fetch(`/api/rsvp?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                await fetchData();
            }
        } catch {
            console.error('Error deleting RSVP');
        }
    };

    const sortedGuests = useMemo(() => {
        if (!Array.isArray(rsvps)) return [];
        const guests: GuestItem[] = rsvps.flatMap(rsvp => {
            const items: GuestItem[] = [];
            const attendingCount = Object.values(rsvp.attendingEvents || {}).filter(Boolean).length;

            rsvp.adultNames.forEach(name => {
                if (name.trim()) items.push({ name: name.trim(), type: 'Adult', attendingCount, primary: rsvp.firstName + ' ' + rsvp.lastName });
            });
            rsvp.childNames.forEach(name => {
                if (name.trim()) items.push({ name: name.trim(), type: 'Child', attendingCount, primary: rsvp.firstName + ' ' + rsvp.lastName });
            });
            if (items.length === 0) {
                items.push({ name: rsvp.firstName + ' ' + rsvp.lastName, type: 'Adult', attendingCount, primary: rsvp.firstName + ' ' + rsvp.lastName });
            }
            return items;
        });

        if (sortConfig) {
            guests.sort((a, b) => {
                const aValue = (a[sortConfig.key] || '').toString().toLowerCase();
                const bValue = (b[sortConfig.key] || '').toString().toLowerCase();
                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return guests;
    }, [rsvps, sortConfig]);

    const EventForm = ({
        event,
        onChange,
        onSave,
        onCancel
    }: {
        event: Omit<Event, 'id'>;
        onChange: (e: Omit<Event, 'id'>) => void;
        onSave: () => void;
        onCancel: () => void;
    }) => (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-purple-700 mb-1">Event Title</label>
                    <input
                        type="text"
                        value={event.title}
                        onChange={(e) => onChange({ ...event, title: e.target.value })}
                        className="input-field"
                        placeholder="The 40th Gala"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-purple-700 mb-1">Day</label>
                    <input
                        type="text"
                        value={event.day}
                        onChange={(e) => onChange({ ...event, day: e.target.value })}
                        className="input-field"
                        placeholder="Saturday, July 25"
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-purple-700 mb-1">Time</label>
                    <input
                        type="text"
                        value={event.time}
                        onChange={(e) => onChange({ ...event, time: e.target.value })}
                        className="input-field"
                        placeholder="7:00 PM"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-purple-700 mb-1">Location</label>
                    <input
                        type="text"
                        value={event.location}
                        onChange={(e) => onChange({ ...event, location: e.target.value })}
                        className="input-field"
                        placeholder="Grand Ballroom"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-purple-700 mb-1">Dress Code</label>
                    <input
                        type="text"
                        value={event.dressCode}
                        onChange={(e) => onChange({ ...event, dressCode: e.target.value })}
                        className="input-field"
                        placeholder="Black Tie Optional"
                    />
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-purple-700 mb-1">
                    Event Description
                </label>
                <textarea
                    value={event.description}
                    onChange={(e) => onChange({ ...event, description: e.target.value })}
                    rows={5}
                    className="input-field min-h-[120px]"
                    placeholder="Describe the atmosphere, special instructions, or what guests can look forward to..."
                />
                <p className="mt-2 text-xs text-purple-400">
                    Pro tip: Use line breaks to separate paragraphs. They will now show up correctly on the event page.
                </p>
            </div>

            <div className="flex items-center gap-4 mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={event.isHighlight}
                        onChange={(e) => onChange({ ...event, isHighlight: e.target.checked })}
                        className="w-5 h-5 rounded accent-amber-500"
                    />
                    <span className="text-purple-700 font-medium">Main Event (Gold Styling)</span>
                    <Star size={16} className="text-amber-500" />
                </label>
            </div>

            <div className="flex justify-end gap-3">
                <button
                    onClick={onCancel}
                    className="px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors flex items-center gap-2"
                >
                    <X size={18} />
                    Cancel
                </button>
                <button
                    onClick={onSave}
                    disabled={saving}
                    className="btn-primary flex items-center gap-2"
                >
                    <Save size={18} />
                    {saving ? 'Saving...' : 'Save Event'}
                </button>
            </div>
        </div>
    );

    if (!isAuthenticated) return <div className="min-h-screen bg-rose-50 flex items-center justify-center text-purple-900 font-serif text-xl">Verifying Authorization...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-rose-100 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 hover:bg-white/60 rounded-lg transition-colors">
                            <ArrowLeft className="text-purple-700" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-serif font-bold text-purple-900">Admin Dashboard</h1>
                            <div className="flex items-center gap-2">
                                <p className="text-purple-600">Manage celebration details</p>
                                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-100 text-[10px] font-bold text-green-700 uppercase tracking-wider animate-pulse">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                    Live Sync
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={fetchData}
                            disabled={loading}
                            className="p-3 bg-white/80 hover:bg-white text-purple-700 rounded-xl shadow-sm transition-all flex items-center gap-2 font-medium border border-purple-100"
                        >
                            <RefreshCcw size={18} className={loading ? 'animate-spin' : ''} />
                            <span className="hidden md:inline">Manual Sync</span>
                        </button>

                        <button
                            onClick={handleLogout}
                            className="p-3 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-xl shadow-sm transition-all flex items-center gap-2 font-medium border border-rose-200"
                        >
                            <LogOut size={18} />
                            <span className="hidden md:inline">Logout</span>
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 flex-wrap">
                    <button
                        onClick={() => setActiveTab('events')}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2
              ${activeTab === 'events' ? 'bg-purple-900 text-white shadow-lg' : 'bg-white/60 text-purple-700 hover:bg-white'}`}
                    >
                        <Calendar size={18} />
                        Events ({events.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('rsvps')}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2
              ${activeTab === 'rsvps' ? 'bg-purple-900 text-white shadow-lg' : 'bg-white/60 text-purple-700 hover:bg-white'}`}
                    >
                        <Users size={18} />
                        Reservations ({rsvps.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('guests')}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2
              ${activeTab === 'guests' ? 'bg-purple-900 text-white shadow-lg' : 'bg-white/60 text-purple-700 hover:bg-white'}`}
                    >
                        <Star size={18} />
                        Guest List ({sortedGuests.length})
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-12 text-purple-600">Loading...</div>
                ) : activeTab === 'events' ? (
                    <div className="space-y-6">
                        {!isCreating && (
                            <button
                                onClick={() => setIsCreating(true)}
                                className="w-full py-5 bg-purple-900/5 border-2 border-dashed border-purple-300 rounded-2xl text-purple-700 hover:border-fuchsia-400 hover:bg-white hover:text-fuchsia-600 transition-all flex items-center justify-center gap-2 font-bold group shadow-sm"
                            >
                                <div className="p-2 bg-purple-100 rounded-full group-hover:bg-fuchsia-100 transition-colors">
                                    <Plus size={24} />
                                </div>
                                <span className="text-lg">Create New Itinerary Event</span>
                            </button>
                        )}

                        {isCreating && (
                            <EventForm
                                event={newEvent}
                                onChange={setNewEvent}
                                onSave={handleCreate}
                                onCancel={() => {
                                    setIsCreating(false);
                                    setNewEvent(emptyEvent);
                                }}
                            />
                        )}

                        {events.sort((a, b) => {
                            const dayWeights: Record<string, number> = { 'Thursday': 1, 'Friday': 2, 'Saturday': 3, 'Sunday': 4 };
                            const getDayWeight = (dayStr: string) => {
                                const found = Object.keys(dayWeights).find(d => dayStr.includes(d));
                                return found ? dayWeights[found] : 99;
                            };
                            const weightA = getDayWeight(a.day);
                            const weightB = getDayWeight(b.day);
                            if (weightA !== weightB) return weightA - weightB;

                            const parseTime = (timeStr: string) => {
                                const m = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
                                if (!m) return 0;
                                let h = parseInt(m[1]);
                                const mins = parseInt(m[2]);
                                const period = m[3].toUpperCase();
                                if (period === 'PM' && h < 12) h += 12;
                                if (period === 'AM' && h === 12) h = 0;
                                return h * 60 + mins;
                            };
                            return parseTime(a.time) - parseTime(b.time);
                        }).map((event) => (
                            editingEvent?.id === event.id ? (
                                <EventForm
                                    key={event.id}
                                    event={editingEvent}
                                    onChange={(e) => setEditingEvent({ ...e, id: event.id })}
                                    onSave={handleUpdate}
                                    onCancel={() => setEditingEvent(null)}
                                />
                            ) : (
                                <div
                                    key={event.id}
                                    className={`rounded-2xl p-6 transition-all
                    ${event.isHighlight ? 'bg-gradient-to-r from-purple-800 to-fuchsia-800 text-white ring-4 ring-amber-400/30' : 'bg-white/80 text-purple-900 hover:shadow-md'}`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-bold font-serif">{event.title}</h3>
                                                {event.isHighlight && (
                                                    <span className="px-2 py-1 bg-amber-500 text-black text-xs font-bold rounded-full">
                                                        MAIN EVENT
                                                    </span>
                                                )}
                                            </div>
                                            <p className={event.isHighlight ? 'text-purple-200' : 'text-purple-600'}>
                                                {event.description}
                                            </p>
                                            <div className="flex flex-wrap gap-4 mt-4 text-sm">
                                                <span className="flex items-center gap-1"><Calendar size={14} /> {event.day}</span>
                                                <span className="flex items-center gap-1"><Clock size={14} /> {event.time}</span>
                                                <span className="flex items-center gap-1"><MapPin size={14} /> {event.location}</span>
                                                <span className="flex items-center gap-1"><Shirt size={14} /> {event.dressCode}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 ml-4">
                                            <button onClick={() => setEditingEvent(event)} className={`p-2 rounded-lg transition-colors ${event.isHighlight ? 'hover:bg-white/20' : 'hover:bg-purple-100'}`}><Pencil size={18} /></button>
                                            <button onClick={() => handleDelete(event.id)} className={`p-2 rounded-lg transition-colors ${event.isHighlight ? 'hover:bg-red-500/30 text-red-200' : 'hover:bg-red-100 text-red-500'}`}><Trash2 size={18} /></button>
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                ) : activeTab === 'rsvps' ? (
                    <div className="space-y-4">
                        {rsvps.length === 0 ? (
                            <div className="text-center py-12 text-purple-400">No Reservations yet.</div>
                        ) : (
                            rsvps.map((rsvp) => (
                                <div key={rsvp.id} className="bg-white/80 rounded-2xl p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-purple-900">{rsvp.firstName} {rsvp.lastName}</h3>
                                            <p className="text-fuchsia-600 text-sm">{rsvp.email}</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <span className="text-xs text-purple-400">{new Date(rsvp.submittedAt).toLocaleDateString()}</span>
                                            <button
                                                onClick={() => handleDeleteRSVP(rsvp.id)}
                                                className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                                                title="Delete Reservation"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <div className="bg-purple-50 px-4 py-2 rounded-lg text-center flex-1">
                                            <p className="text-[10px] text-purple-400 uppercase font-bold">Adults</p>
                                            <p className="text-lg font-bold text-purple-900">{rsvp.adultCount}</p>
                                        </div>
                                        <div className="bg-purple-50 px-4 py-2 rounded-lg text-center flex-1">
                                            <p className="text-[10px] text-purple-400 uppercase font-bold">Kids</p>
                                            <p className="text-lg font-bold text-purple-900">{rsvp.childCount}</p>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <p className="text-[10px] text-purple-400 uppercase font-bold mb-2">Event Attendance</p>
                                        <div className="flex flex-wrap gap-2">
                                            {Object.entries(rsvp.attendingEvents || {}).filter(([, attending]) => attending).length > 0 ? (
                                                Object.entries(rsvp.attendingEvents || {})
                                                    .filter(([, attending]) => attending)
                                                    .map(([event]) => (
                                                        <span key={event} className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-lg border border-amber-200">
                                                            {event}
                                                        </span>
                                                    ))
                                            ) : (
                                                <span className="text-xs text-gray-400 italic">No events selected</span>
                                            )}
                                        </div>
                                    </div>
                                    {rsvp.adultNames.length > 0 && (
                                        <p className="text-sm text-purple-700 mb-1">
                                            <span className="font-bold">Adults:</span> {rsvp.adultNames.filter(n => n).join(', ')}
                                        </p>
                                    )}
                                    {rsvp.childNames.length > 0 && (
                                        <p className="text-sm text-purple-700 mb-1">
                                            <span className="font-bold">Kids:</span> {rsvp.childNames.filter(n => n).join(', ')}
                                        </p>
                                    )}
                                    {rsvp.message && <p className="text-sm italic text-purple-400 mt-2 border-l-2 border-purple-200 pl-3">&quot;{rsvp.message}&quot;</p>}
                                </div>
                            ))
                        )}
                    </div>
                ) : (
                    /* Detailed Guest List */
                    <div className="bg-white/80 rounded-3xl overflow-hidden shadow-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-purple-900 text-purple-100">
                                    <tr>
                                        {[
                                            { label: 'Guest Name', key: 'name' },
                                            { label: 'Type', key: 'type' },
                                            { label: 'Events', key: 'attendingCount' },
                                            { label: 'Reserved By', key: 'primary' }
                                        ].map((col) => (
                                            <th
                                                key={col.key}
                                                className="px-6 py-4 font-semibold cursor-pointer hover:bg-purple-800 transition-colors"
                                                onClick={() => handleSort(col.key)}
                                            >
                                                <div className="flex items-center gap-2">
                                                    {col.label}
                                                    <ArrowUpDown size={14} className={sortConfig?.key === col.key ? 'text-amber-400' : 'text-purple-400 opacity-50'} />
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-purple-100">
                                    {sortedGuests.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-12 text-center text-purple-400">No guests found.</td>
                                        </tr>
                                    ) : (
                                        sortedGuests.map((guest, idx) => (
                                            <tr key={idx} className="hover:bg-white transition-colors">
                                                <td className="px-6 py-4 font-bold text-purple-900">{guest.name}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded text-xs font-bold ${guest.type === 'Adult' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                                                        {(guest.type || 'ADULT').toUpperCase()}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-purple-600 font-bold">
                                                        {guest.attendingCount} selected
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-purple-400 italic">
                                                    {guest.primary}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
