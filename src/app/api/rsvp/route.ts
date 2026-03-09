import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        const rsvpData = await request.json();

        // Validate required fields
        if (!rsvpData.firstName || !rsvpData.lastName || !rsvpData.email) {
            return NextResponse.json(
                { error: 'First name, last name, and email are required' },
                { status: 400 }
            );
        }

        // Map to snake_case
        const dbRSVP = {
            first_name: rsvpData.firstName,
            last_name: rsvpData.lastName,
            email: rsvpData.email,
            // Map specific events back to their original columns for backward compatibility if found
            attending_gala: rsvpData.attendingEvents?.['The 40th Gala'] || false,
            attending_brunch: rsvpData.attendingEvents?.['Farewell Brunch'] || false,
            // Re-purpose dietary_notes to store all event selections as a JSON string
            dietary_notes: rsvpData.attendingEvents ? JSON.stringify(rsvpData.attendingEvents) : null,
            adult_count: rsvpData.adultCount || 1,
            child_count: rsvpData.childCount || 0,
            adult_names: rsvpData.adultNames ? JSON.stringify(rsvpData.adultNames) : null,
            child_names: rsvpData.childNames ? JSON.stringify(rsvpData.childNames) : null,
            message: rsvpData.message,
            submitted_at: new Date().toISOString()
        };

        // Check for existing RSVP by name
        const { data: existingRSVP } = await supabase
            .from('rsvps')
            .select('id')
            .eq('first_name', rsvpData.firstName)
            .eq('last_name', rsvpData.lastName)
            .maybeSingle();

        let response;
        if (existingRSVP) {
            response = await supabase
                .from('rsvps')
                .update(dbRSVP)
                .eq('id', existingRSVP.id)
                .select()
                .single();
        } else {
            response = await supabase
                .from('rsvps')
                .insert([dbRSVP])
                .select()
                .single();
        }

        const { data, error } = response;
        if (error) throw error;

        // --- Send Confirmation Email via Resend ---
        if (process.env.RESEND_API_KEY) {
            try {
                const totalGuests = (rsvpData.adultCount || 0) + (rsvpData.childCount || 0);

                await resend.emails.send({
                    from: "Marien's 40th <onboarding@resend.dev>", // Once you verify a domain, use info@yourdomain.com
                    to: rsvpData.email,
                    subject: `RSVP Received: Marien's 40th Celebration! 🥂`,
                    html: `
                        <div style="font-family: 'serif', 'Georgia', serif; color: #4A1D5B; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #F5E6F7; border-radius: 16px;">
                            <h1 style="text-align: center; color: #701A75;">Thank You for your RSVP!</h1>
                            <p style="font-size: 18px; text-align: center;">We've received your registration for Marien's 40th Birthday Celebration in Panama City.</p>
                            
                            <div style="background-color: #FDF4FF; padding: 20px; border-radius: 12px; margin: 25px 0;">
                                <h3 style="margin-top: 0; color: #701A75;">Reservation Details:</h3>
                                <ul style="list-style: none; padding: 0;">
                                    <li><strong>Guests:</strong> ${totalGuests} (${rsvpData.adultCount} adults, ${rsvpData.childCount} children)</li>
                                    <li><strong>Attending:</strong> ${Object.entries(rsvpData.attendingEvents || {})
                            .filter(([_, checked]) => checked)
                            .map(([title]) => title)
                            .join(', ') || 'None'}</li>
                                </ul>
                            </div>

                            <p style="text-align: center; font-style: italic;">"Wait until you see what we have planned for Panama..."</p>
                            
                            <hr style="border: none; border-top: 1px solid #F5E6F7; margin: 30px 0;" />
                            
                            <p style="font-size: 12px; color: #9D4EDD; text-align: center;">
                                📍 Panama City, Panama | July 2026
                            </p>
                        </div>
                    `
                });
            } catch (emailError) {
                console.error('Email sending failed:', emailError);
                // We don't fail the whole request if just the email fails
            }
        }

        return NextResponse.json(
            { success: true, message: existingRSVP ? 'RSVP updated successfully' : 'RSVP submitted successfully', data },
            { status: 201 }
        );
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error('Error submitting/updating RSVP:', message);
        return NextResponse.json(
            { error: 'Failed to process RSVP', details: message },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const firstName = searchParams.get('firstName');
        const lastName = searchParams.get('lastName');

        const query = supabase.from('rsvps').select('*');

        if (firstName && lastName) {
            const { data, error } = await query
                .eq('first_name', firstName)
                .eq('last_name', lastName)
                .maybeSingle();

            if (error) throw error;
            if (!data) return NextResponse.json({ error: 'Reservation not found' }, { status: 404 });

            return NextResponse.json({
                ...data,
                firstName: data.first_name,
                lastName: data.last_name,
                attendingEvents: data.dietary_notes ? JSON.parse(data.dietary_notes) : {},
                adultCount: data.adult_count,
                childCount: data.child_count,
                adultNames: data.adult_names ? JSON.parse(data.adult_names) : [data.first_name + ' ' + data.last_name],
                childNames: data.child_names ? JSON.parse(data.child_names) : [],
                submittedAt: data.submitted_at
            });
        }

        const { data, error } = await query.order('submitted_at', { ascending: false });
        if (error) throw error;

        // Map back to camelCase for the UI
        const mappedData = data.map((item: {
            first_name: string;
            last_name: string;
            attending_gala: boolean;
            attending_brunch: boolean;
            dietary_notes: string;
            adult_count: number;
            child_count: number;
            adult_names: string;
            child_names: string;
            submitted_at: string;
        }) => ({
            ...item,
            firstName: item.first_name,
            lastName: item.last_name,
            attendingEvents: item.dietary_notes ? JSON.parse(item.dietary_notes) : {},
            adultCount: item.adult_count,
            childCount: item.child_count,
            adultNames: item.adult_names ? JSON.parse(item.adult_names) : [],
            childNames: item.child_names ? JSON.parse(item.child_names) : [],
            submittedAt: item.submitted_at
        }));

        return NextResponse.json(mappedData);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error('Error fetching RSVPs:', message);
        return NextResponse.json({ error: 'Failed to fetch RSVPs', details: message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const { error } = await supabase
            .from('rsvps')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ success: true, message: 'Reservation deleted successfully' });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error('Error deleting RSVP:', message);
        return NextResponse.json({ error: 'Failed to delete reservation', details: message }, { status: 500 });
    }
}


