
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { jobTitle, companyName, companyEmail, userName, userEmail } = await request.json();

    if (!jobTitle || !companyName || !companyEmail || !userName || !userEmail) {
        return NextResponse.json({ error: 'Faltan datos para enviar el correo de postulación.' }, { status: 400 });
    }

    // --- LÓGICA DE ENVÍO DE CORREO (SIMULADA) ---
    // En una aplicación real, aquí usarías un servicio como SendGrid, Resend, o Nodemailer.
    
    console.log('--- SIMULANDO ENVÍO DE CORREO ---');
    console.log(`Destinatario (Empresa): ${companyEmail}`);
    console.log(`Remitente (Candidato): ${userEmail}`);
    console.log(`Asunto: Nueva postulación para la oferta de "${jobTitle}"`);
    console.log(`Cuerpo del correo:`);
    console.log(`Hola ${companyName},`);
    console.log(`El candidato ${userName} (${userEmail}) se ha postulado a tu oferta de empleo: "${jobTitle}".`);
    console.log('Te recomendamos revisar su perfil en la plataforma.');
    console.log('---------------------------------');

    // Se responde con éxito para simular que el correo fue enviado.
    return NextResponse.json({ message: 'Correo de postulación enviado (simulado) exitosamente.' });

  } catch (error) {
    console.error('Error al simular envío de correo:', error);
    const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error desconocido.';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
