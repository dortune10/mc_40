import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

interface ItineraryItem {
    id: string;
    day: string;
    title: string;
    time: string;
    description: string;
    dress_code: string;
    location: string;
    is_highlight: boolean;
}

// GET all events
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('itinerary')
            .select('*')
            .order('id', { ascending: true });

        if (error) throw error;

        // Map back to camelCase for the UI
        const mappedData = data.map((item: ItineraryItem) => ({
            ...item,
            dressCode: item.dress_code,
            isHighlight: item.is_highlight
        }));

        return NextResponse.json(mappedData);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error('Error fetching itinerary:', message);
        return NextResponse.json({ error: 'Failed to fetch events', details: message }, { status: 500 });
    }
}

// POST new event
export async function POST(request: NextRequest) {
    try {
        const newEvent = await request.json();

        // Map to snake_case for DB
        const dbEvent = {
            day: newEvent.day,
            title: newEvent.title,
            time: newEvent.time,
            description: newEvent.description,
            dress_code: newEvent.dressCode,
            location: newEvent.location,
            is_highlight: newEvent.isHighlight
        };

        const { data, error } = await supabase
            .from('itinerary')
            .insert([dbEvent])
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error('Error creating itinerary event:', message);
        return NextResponse.json({ error: 'Failed to create event', details: message }, { status: 500 });
    }
}

// PUT update event
export async function PUT(request: NextRequest) {
    try {
        const updatedEvent = await request.json();
        const { id } = updatedEvent;

        if (!id) {
            return NextResponse.json({ error: 'ID required' }, { status: 400 });
        }

        // Map to snake_case for DB
        const dbUpdate = {
            day: updatedEvent.day,
            title: updatedEvent.title,
            time: updatedEvent.time,
            description: updatedEvent.description,
            dress_code: updatedEvent.dressCode,
            location: updatedEvent.location,
            is_highlight: updatedEvent.isHighlight
        };

        const { data, error } = await supabase
            .from('itinerary')
            .update(dbUpdate)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json(data);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error('Error updating itinerary event:', message);
        return NextResponse.json({ error: 'Failed to update event', details: message }, { status: 500 });
    }
}


// DELETE event
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID required' }, { status: 400 });
        }

        const { error } = await supabase
            .from('itinerary')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting itinerary event:', error);
        return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
    }
}

