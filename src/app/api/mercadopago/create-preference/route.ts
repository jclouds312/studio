
// src/app/api/mercadopago/create-preference/route.ts
import { NextResponse } from 'next/server';

// En un escenario real, instalarías el SDK de Mercado Pago:
// import { MercadoPagoConfig, Preference } from 'mercadopago';

export async function POST(request: Request) {
  try {
    const { title, unit_price, accessToken } = await request.json();

    if (!title || !unit_price) {
        return NextResponse.json({ error: 'Faltan el título o el precio.' }, { status: 400 });
    }
    
    // Para el prototipo, verificamos si se envió un accessToken.
    // En una app real, la validación del token sería mucho más robusta.
    if (!accessToken) {
        return NextResponse.json({ error: 'Falta el Access Token de Mercado Pago. El administrador debe conectar su cuenta.' }, { status: 401 });
    }


    // --- LOGICA REAL DE MERCADO PAGO (COMENTADA COMO EJEMPLO) ---
    /*
    // 1. Inicializar el cliente de Mercado Pago con el Access Token del admin
    const client = new MercadoPagoConfig({ 
        accessToken: accessToken
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
    console.log(`Simulando preferencia de pago con el token del admin para "${title}" con precio ${unit_price}. ID: ${simulatedPreferenceId}`);
    
    return NextResponse.json({ id: simulatedPreferenceId });

  } catch (error) {
    console.error('Error creando la preferencia de pago:', error);
    const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error desconocido';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
