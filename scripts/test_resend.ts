import { Resend } from 'resend';

// Hardcoded for a quick diagnostic test
const resend = new Resend('re_buXtTq1Y_Ayb5MReXkSqQeWysX2aUrLpZ');

async function testEmail() {
    console.log('--- Resend Diagnostic ---');
    try {
        const result = await resend.emails.send({
            from: "Marien's 40th <onboarding@resend.dev>",
            to: "dtuncoks@gmail.com",
            subject: 'Diagnostic Test RSVP Confirmation',
            html: '<h3>Test Successful</h3><p>Your Resend integration is properly connected.</p>'
        });

        if (result.error) {
            console.error('API Error details:', result.error);
            if (result.error.name === 'validation_error' || result.error.message.includes('authorized')) {
                console.log('\n--- IMPORTANT ---');
                console.log('The Resend Sandbox restricted mode prevents sending to addresses not linked to your account.')
                console.log('Try sending to the email you used to register on Resend.com.');
            }
        } else {
            console.log('Success! Email ID:', result.data.id);
        }
    } catch (e) {
        console.error('Connection Exception:', e);
    }
}

testEmail();
