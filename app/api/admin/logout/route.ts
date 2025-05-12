import { NextResponse } from 'next/server';

export async function POST() {
  // Create response
  const response = NextResponse.json(
    { message: 'Desconectado com sucesso.' },
    { status: 200 }
  );
  
  // Clear the authentication cookie
  response.cookies.set({
    name: 'adminAuth',
    value: '',
    path: '/',
    expires: new Date(0), // Expires immediately
    maxAge: 0,
  });
  
  return response;
} 