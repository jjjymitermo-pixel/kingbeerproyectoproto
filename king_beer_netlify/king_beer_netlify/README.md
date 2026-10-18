# King Beer IA — versión preparada para Netlify

Esta versión está adaptada para publicarse en Netlify. Incluye una web colorida con burbujas animadas, chat con IA mediante OpenRouter, catálogo y panel de administración. Las funciones del servidor están en `netlify/functions` y el catálogo editado se guarda en Netlify Blobs, no en un archivo efímero.

## Publicar en Netlify (recomendado: GitHub)

1. Descarga y descomprime este ZIP.
2. Crea un repositorio en GitHub y sube los archivos de esta carpeta. No subas tu clave API ni un archivo `.env`.
3. Entra en https://app.netlify.com/ y crea una cuenta o inicia sesión.
4. Selecciona **Add new project / Import an existing project** y conecta el repositorio.
5. Netlify debería detectar `netlify.toml`. Configuración:
   - Build command: `npm run build`
   - Publish directory: `public`
   - Functions directory: `netlify/functions`
6. Antes de probar la IA, abre la configuración del sitio en Netlify y añade estas variables de entorno:
   - `OPENROUTER_API_KEY` = tu clave privada de OpenRouter
   - `OPENROUTER_MODEL` = un modelo que esté disponible en tu cuenta; el ejemplo es `openai/gpt-4o-mini`
   - `ADMIN_PASSWORD` = una contraseña larga y única para administrar el catálogo
   Añádelas en la configuración de variables de entorno de Netlify (con alcance para Functions si la interfaz muestra ese ajuste). No escribas secretos en `netlify.toml` ni en el HTML.
7. Ejecuta el deploy. Cuando termine, Netlify te dará una URL pública del estilo `https://nombre-del-sitio.netlify.app`.

## Probar localmente (opcional)
Necesitas Node.js 18 o superior.

```bash
npm install
npx netlify dev
```

Abre la URL local que muestre Netlify CLI. Para probar funciones localmente, puedes configurar variables en un `.env` local, pero nunca lo subas al repositorio.

## Panel de administración
En la web, abre “Administración del catálogo”, escribe `ADMIN_PASSWORD` y pulsa “Cargar catálogo”. Edita el JSON y pulsa “Guardar cambios”. La persistencia usa Netlify Blobs, por lo que no depende de escribir archivos en el entorno temporal de una función.

## Catálogo inicial
- Adicionales: Sal limón, Sal mexicana, Azúcar blue ice, Azúcar blueberry, Azúcar lima-maracuyá, Azúcar fresa pink, Tajín-Chamoy.
- Siropes: Mango biche, Maracuyá, Frutos amarillos, Frutos rojos, Mora azul, Lychee, Curaçao, Granadina.
- Bebidas: Soda, Seven Up, Ginger, Sprite.
- Frutas: Mango, Maracuyá, Fresa, Mora.
- Perlas explosivas: Mango biche, Maracuyá, Lychee, Fresa.

## Seguridad
- No publiques `OPENROUTER_API_KEY` en el HTML ni en repositorios.
- Usa una contraseña administrativa larga y única. El panel es una protección básica por contraseña compartida; para un negocio en producción conviene añadir autenticación más robusta y límites de solicitudes.
- La IA puede equivocarse: confirma precios, disponibilidad y recetas con el negocio.
- El uso de OpenRouter puede generar costes según el modelo y la cuenta. Revisa los límites y precios antes de compartir la web públicamente.
- La publicación requiere que tú conectes tu cuenta de Netlify y GitHub y añadas tus propios secretos. Este archivo no crea automáticamente una web en tu cuenta.

## Solución de problemas
- **Chat dice que la IA no está configurada:** revisa `OPENROUTER_API_KEY` en Netlify y vuelve a desplegar.
- **Error de proveedor:** comprueba que la clave esté activa, que el modelo exista y que la cuenta tenga límites disponibles.
- **El panel no guarda:** comprueba `ADMIN_PASSWORD` y que el JSON sea válido.
- **Función no encontrada:** confirma que el directorio `netlify/functions` esté en la raíz del repositorio y que el sitio haya terminado de desplegarse.
