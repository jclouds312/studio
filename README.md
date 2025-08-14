# LaburoYA - Plataforma de Búsqueda de Empleo

Este es un proyecto de Next.js que sirve como una plataforma completa para la búsqueda y publicación de empleos en Argentina, creada con Firebase Studio.

## Stack Tecnológico

*   **Framework:** Next.js 15+ (con App Router y Turbopack)
*   **Lenguaje:** TypeScript
*   **Estilos:** Tailwind CSS
*   **Componentes UI:** shadcn/ui
*   **Base de Datos (simulada):** Prisma (con un proveedor estático para prototipado)
*   **Autenticación:** Sistema de sesión simulado con soporte para email/contraseña y social login (Google, Facebook, Microsoft).
*   **Pagos (simulados):** Integración simulada de Mercado Pago.
*   **IA Generativa:** Genkit para futuras integraciones de IA.

## Cuentas de Prueba

Para facilitar las pruebas y la revisión de la plataforma, se han preconfigurado las siguientes cuentas:

*   **Rol de Trabajador:**
    *   **Email:** `trabajador@test.com`
    *   **Contraseña:** `password`
*   **Rol de Empresa:**
    *   **Email:** `empresa@test.com`
    *   **Contraseña:** `password`
*   **Rol de Administrador:**
    *   **Email:** `admin@laburoya.com`
    *   **Contraseña:** `password`

## Opciones de Despliegue

Este proyecto está listo para ser desplegado en varias plataformas modernas que ofrecen generosos planes gratuitos.

*   **Firebase App Hosting (Recomendado):**
    *   **¿Por qué?:** Es la opción natural dentro del ecosistema de Firebase/Google Cloud. Tu proyecto ya incluye el archivo `apphosting.yaml` para un despliegue sin complicaciones.
    *   **Nota sobre la Tarjeta de Crédito:** Firebase requiere que vincules una tarjeta de crédito para activar su plan de pago por uso ("Blaze"), incluso si planeas mantenerte dentro de la capa gratuita. Esto es para **verificación de identidad** y para cubrir cualquier uso que exceda los límites gratuitos. **No se te cobrará nada si tu uso se mantiene dentro de la generosa cuota gratuita.** Si tienes problemas al registrar la tarjeta, asegúrate de que sea una tarjeta de crédito estándar (no prepaga) y que los datos coincidan con los de tu banco.

*   **Railway:**
    *   **¿Por qué?:** Tu proyecto ya está configurado con un archivo `railway.json`. Railway es conocido por su simplicidad y también ofrece un plan gratuito para empezar.

*   **Vercel:**
    *   **¿Por qué?:** Es la plataforma de los creadores de Next.js, por lo que la integración es perfecta. Simplemente conecta tu repositorio de GitHub y Vercel se encargará del resto. Su plan gratuito es ideal para proyectos personales y prototipos.


## Funcionalidades Clave

*   **Doble Rol de Usuario:** La plataforma soporta dos flujos principales: **Trabajadores** que buscan empleo y **Empresas** que buscan contratar.
*   **Panel de Administración:** Un dashboard completo para gestionar usuarios, publicaciones de trabajo, empresas, categorías y ver estadísticas de la plataforma.
*   **Planes de Suscripción:** Múltiples niveles de suscripción para trabajadores y empresas con funcionalidades y beneficios exclusivos.
*   **Proceso de Postulación:** Los usuarios pueden postularse a ofertas y las empresas pueden ver los candidatos.
*   **Perfiles de Usuario y Empresa:** Paneles dedicados para que los usuarios gestionen su información, postulaciones y trabajos guardados, y para que las empresas gestionen sus ofertas y candidatos.
*   **Funcionalidades de PWA:** La aplicación es una Progressive Web App (PWA), lo que permite su instalación en dispositivos móviles.
*   **Contacto Directo:** Las empresas pueden añadir su número de WhatsApp para que los candidatos puedan contactarlas directamente desde la oferta.
*   **Mapas Integrados:** Cada oferta de trabajo muestra un mapa interactivo con la ubicación del empleo.

## Instalación como Aplicación Móvil (PWA)

Esta aplicación es una Progressive Web App (PWA), lo que significa que puedes instalarla en tu dispositivo móvil directamente desde el navegador, como si fuera una aplicación nativa. No se necesita una tienda de aplicaciones.

### Cómo Instalar:

1.  **Abre la App en tu Navegador:** Navega a la URL de la aplicación en tu smartphone (por ejemplo, Chrome en Android o Safari en iOS).
2.  **Añadir a la Pantalla de Inicio:**
    *   **En Android (Chrome):** Busca un aviso emergente en la parte inferior de la pantalla que dice "Añadir a pantalla de inicio" o toca el icono del menú de tres puntos y selecciona "Instalar aplicación" o "Añadir a pantalla de inicio".
    *   **En iOS (Safari):** Toca el icono de "Compartir" (un cuadrado con una flecha hacia arriba) en la barra de navegación, luego desplázate hacia abajo y selecciona "Añadir a pantalla de inicio".
3.  **Lanzar desde la Pantalla de Inicio:** Una vez instalada, encontrarás el icono de la aplicación en tu pantalla de inicio. Puedes lanzarla desde allí para una experiencia que se siente como una aplicación nativa.

## Empaquetado como App Nativa (Android/iOS con Capacitor)

**Nota Importante:** Los siguientes comandos deben ejecutarse en tu **terminal o línea de comandos local**, no en este entorno de chat. Este asistente de IA prepara el código, pero tú eres quien ejecuta la compilación en tu máquina.

### 1. Preparar la Aplicación Next.js

Primero, necesitas generar la versión estática de la PWA. Este proyecto ya está configurado para ello. Simplemente ejecuta en tu terminal:

```bash
npm run export
```

Este comando creará una carpeta `out` en la raíz de tu proyecto. Esta carpeta contiene todos los archivos HTML, CSS y JavaScript que Capacitor necesita.

### 2. Configurar Capacitor

Abre una nueva terminal en la raíz de tu proyecto.

1.  **Instalar Capacitor CLI:**
    ```bash
    npm install @capacitor/cli @capacitor/core
    ```

2.  **Inicializar Capacitor:**
    ```bash
    npx cap init
    ```
    Capacitor te hará algunas preguntas:
    *   **App Name:** `LaburoYA`
    *   **App ID:** `com.laburoya.app` (o el que prefieras)
    *   **Web dir:** `out` (¡Este es el paso más importante!)

3.  **Instalar Plataformas Nativas:**
    Añade las plataformas para las que quieres construir.

    *   **Para Android:**
        ```bash
        npm install @capacitor/android
        npx cap add android
        ```
    *   **Para iOS:**
        ```bash
        npm install @capacitor/ios
        npx cap add ios
        ```

### 3. Sincronizar y Construir

1.  **Sincronizar la PWA:** Cada vez que hagas cambios en tu aplicación y los compiles con `npm run export`, debes sincronizarlos con Capacitor:
    ```bash
    npx cap sync
    ```

2.  **Abrir el Proyecto Nativo:**
    *   **Para Android:**
        ```bash
        npx cap open android
        ```
        Esto abrirá el proyecto en Android Studio. Desde allí, puedes construir y generar un APK firmado o un App Bundle.

    *   **Para iOS (requiere macOS):**
        ```bash
        npx cap open ios
        ```
        Esto abrirá el proyecto en Xcode. Desde allí, puedes compilar y ejecutar en un simulador o en un dispositivo físico.

