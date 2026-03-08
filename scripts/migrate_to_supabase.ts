import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load env vars from root
dotenv.config({ path: path.join(process.cwd(), '.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''; // Using anon key for simple migration if RLS allows

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
    console.log('🚀 Starting Migration...');

    // 1. Migrate Itinerary
    const itineraryPath = path.join(process.cwd(), 'src/data/itinerary.json');
    if (fs.existsSync(itineraryPath)) {
        const itineraryData = JSON.parse(fs.readFileSync(itineraryPath, 'utf-8'));
        console.log(`Found ${itineraryData.length} itinerary items.`);

        // Map to snake_case for DB
        const cleanItinerary = itineraryData.map(({ id, ...item }: any) => ({
            day: item.day,
            title: item.title,
            time: item.time,
            description: item.description,
            dress_code: item.dressCode,
            location: item.location,
            is_highlight: item.isHighlight
        }));

        const { error } = await supabase.from('itinerary').insert(cleanItinerary);
        if (error) console.error('❌ Error migrating itinerary:', error.message);
        else console.log('✅ Itinerary migrated successfully.');
    }

    // 2. Migrate RSVPs
    const rsvpsPath = path.join(process.cwd(), 'src/data/rsvps.json');
    if (fs.existsSync(rsvpsPath)) {
        const rsvpData = JSON.parse(fs.readFileSync(rsvpsPath, 'utf-8'));
        console.log(`Found ${rsvpData.length} RSVPs.`);

        // Map to snake_case for DB
        const cleanRSVPs = rsvpData.map(({ id, ...item }: any) => ({
            first_name: item.firstName,
            last_name: item.lastName,
            email: item.email,
            attending_gala: item.attendingGala,
            attending_brunch: item.attendingBrunch,
            dietary_notes: item.dietaryNotes,
            message: item.message,
            submitted_at: item.submittedAt
        }));

        const { error } = await supabase.from('rsvps').insert(cleanRSVPs);
        if (error) console.error('❌ Error migrating RSVPs:', error.message);
        else console.log('✅ RSVPs migrated successfully.');
    }


    console.log('🏁 Migration process finished.');
}

migrate();
