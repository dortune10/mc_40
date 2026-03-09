import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery';
import Itinerary from '@/components/Itinerary';
import PlanningTools from '@/components/PlanningTools';
import RSVPForm from '@/components/RSVPForm';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';

export const revalidate = 0; // Disable caching for real-time-like feel on reload

export default async function Home() {
    const { data: itineraryData } = await supabase
        .from('itinerary')
        .select('*')
        .order('id', { ascending: true });

    // Map DB fields and sort chronologically
    const events = (itineraryData || []).map((item: {
        id: string;
        day: string;
        title: string;
        time: string;
        description: string;
        dress_code: string;
        location: string;
        is_highlight: boolean;
    }) => ({
        id: item.id,
        day: item.day,
        title: item.title,
        time: item.time,
        description: item.description,
        location: item.location,
        dressCode: item.dress_code,
        isHighlight: item.is_highlight
    })).sort((a, b) => {
        // Day Sort Weight
        const dayWeights: Record<string, number> = { 'Wednesday': 0, 'Thursday': 1, 'Friday': 2, 'Saturday': 3, 'Sunday': 4 };
        const getDayWeight = (dayStr: string) => {
            const found = Object.keys(dayWeights).find(d => dayStr.includes(d));
            return found ? dayWeights[found] : 99;
        };

        const weightA = getDayWeight(a.day);
        const weightB = getDayWeight(b.day);
        if (weightA !== weightB) return weightA - weightB;

        // Time Sort
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
    });

    return (
        <main className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-rose-100 overflow-x-hidden">
            <Navigation />
            <Hero />
            <Gallery />
            <Itinerary events={events} />
            <PlanningTools />
            <RSVPForm />
            <Footer />
        </main>
    );
}
