import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    
    // Gunakan password dari environment variable, atau default 'PRADOPO123' jika tidak diset
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'PRADOPO123';

    if (password === ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true, message: 'Login berhasil' });
      
      // Set cookie 'admin_token'
      response.cookies.set({
        name: 'admin_token',
        value: 'authenticated',
        httpOnly: true, // Secure dari XSS
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 minggu
        sameSite: 'strict',
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: 'Password salah' },
      { status: 401 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan sistem' },
      { status: 500 }
    );
  }
}
