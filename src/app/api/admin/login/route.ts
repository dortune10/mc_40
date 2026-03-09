import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { password } = await request.json();
        const adminPassword = process.env.ADMIN_PASSWORD || 'marien40';

        if (password === adminPassword) {
            const response = NextResponse.json({ success: true });
            // Set a cookie that's somewhat secure (though for a quick demo this matches the current client-side logic)
            response.cookies.set('admin_session', 'true', {
                path: '/',
                maxAge: 86400,
                httpOnly: false, // Keeping it accessible to current client check, or better yet, make it true and update dashboard
                sameSite: 'lax',
            });
            return response;
        } else {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }
    } catch {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
