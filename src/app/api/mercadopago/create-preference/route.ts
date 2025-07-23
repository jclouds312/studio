
import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

export async function POST(request: Request) {
  try {
    const { title, unit_price, accessToken } = await request.json();

    if (!title || !unit_price) {
      return NextResponse.json({ error: 'Faltan el título o el precio.' }, { status: 400 });
    }
    
    // Ahora, el token viene desde el frontend, permitiendo que cada empresa use su propia cuenta.
    if (!accessToken || !accessToken.startsWith('APP_USR-')) {
      return NextResponse.json({ error: 'Falta el Access Token de Mercado Pago o es inválido. La empresa debe conectar su cuenta.' }, { status: 401 });
    }

    // 1. Inicializar el cliente de Mercado Pago con el Access Token de la empresa
    const client = new MercadoPagoConfig({ 
        accessToken: accessToken,
        options: { timeout: 5000 }
    });
    
    // 2. Crear una instancia del servicio de Preferencias
    const preference = new Preference(client);

    // 3. Crear el objeto de preferencia con los datos del item y URLs de retorno
    const preferenceData = {
      body: {
        items: [
          {
            id: `item-${Date.now()}`,
            title: title,
            quantity: 1,
            unit_price: Number(unit_price),
            currency_id: 'ARS', // Moneda Argentina
          },
        ],
        // URLs a las que Mercado Pago redirigirá al usuario después del pago
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002'}/payment-success`,
          failure: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002'}/payment-failure`,
          pending: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002'}/payment-pending`,
        },
        // Redirigir automáticamente en caso de aprobación del pago
        auto_return: 'approved' as 'approved',
      },
    };

    // 4. Crear la preferencia en Mercado Pago
    console.log("Creando preferencia en Mercado Pago...");
    const result = await preference.create(preferenceData);
    console.log("Preferencia creada con éxito:", result);
    
    // 5. Devolver el ID y la URL de inicialización (init_point) al frontend
    // El init_point es la URL a la que debes redirigir al usuario para que realice el pago.
    return NextResponse.json({ 
        id: result.id,
        init_point: result.init_point 
    });

  } catch (error: any) {
    console.error('Error creando la preferencia de pago:', error);
    const errorMessage = error?.cause?.message || error.message || 'Ocurrió un error desconocido';
    return NextResponse.json({ error: `Error al conectar con Mercado Pago: ${errorMessage}` }, { status: 500 });
  }
}
