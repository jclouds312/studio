
// src/app/api/mercadopago/create-preference/route.ts
import { NextResponse } from 'next/server';

// En un escenario real, instalarías el SDK de Mercado Pago:
// import { MercadoPagoConfig, Preference } from 'mercadopago';

export async function POST(request: Request) {
  try {
    const { title, unit_price } = await request.json();

    if (!title || !unit_price) {
        return NextResponse.json({ error: 'Missing title or unit_price' }, { status: 400 });
    }

    // --- LOGICA REAL DE MERCADO PAGO (COMENTADA COMO EJEMPLO) ---
    /*
    // 1. Inicializar el cliente de Mercado Pago con tu Access Token
    const client = new MercadoPagoConfig({ 
        accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN! 
    });
    const preference = new Preference(client);

    // 2. Crear el objeto de preferencia
    const preferenceData = {
      body: {
        items: [
          {
            title: title,
            quantity: 1,
            unit_price: Number(unit_price),
            currency_id: 'ARS',
          },
        ],
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_BASE_URL}/success`, // URL a la que redirigir en caso de éxito
          failure: `${process.env.NEXT_PUBLIC_BASE_URL}/failure`, // URL a la que redirigir en caso de fallo
          pending: `${process.env.NEXT_PUBLIC_BASE_URL}/pending`, // URL para pagos pendientes
        },
        auto_return: 'approved', // Redirigir automáticamente en caso de aprobación
      },
    };

    // 3. Crear la preferencia en Mercado Pago
    const result = await preference.create(preferenceData);
    
    // 4. Devolver el ID de la preferencia al frontend
    return NextResponse.json({ id: result.id });
    */

    // --- RESPUESTA SIMULADA PARA PROTOTIPO ---
    // Simulamos que hemos creado la preferencia y devolvemos un ID falso.
    const simulatedPreferenceId = `pref_simulated_${Date.now()}`;
    console.log(`Simulating preference creation for "${title}" with price ${unit_price}. ID: ${simulatedPreferenceId}`);
    
    return NextResponse.json({ id: simulatedPreferenceId });

  } catch (error) {
    console.error('Error creating preference:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
