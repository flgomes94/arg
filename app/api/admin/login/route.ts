import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    
    // Get the admin password from environment variables
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    // Check if admin password is set
    if (!adminPassword) {
      return NextResponse.json(
        { message: 'Configuração de autenticação não encontrada.' },
        { status: 500 }
      );
    }
    
    // Check if the password matches
    if (password === adminPassword) {
      // Password is correct, create response
      const response = NextResponse.json(
        { message: 'Autenticado com sucesso.' },
        { status: 200 }
      );
      
      // Set the HTTP-only cookie in the response (7 days expiration)
      response.cookies.set({
        name: 'adminAuth',
        value: 'true',
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: 'strict',
      });
      
      return response;
    } else {
      // Password is incorrect
      return NextResponse.json(
        { message: 'Senha incorreta.' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Erro no processamento do login:', error);
    return NextResponse.json(
      { message: 'Erro no processamento da solicitação.' },
      { status: 500 }
    );
  }
} 