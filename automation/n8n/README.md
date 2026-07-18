# Recordatorios de English Coach en n8n

Este flujo sigue el patrón `Schedule → consulta → filtrar → entregar → registrar`.

## Configuración

1. Ejecuta `supabase/migrations/011_notification_preferences.sql`.
2. En n8n crea una credencial HTTP con el endpoint REST de Supabase y la `SERVICE_ROLE_KEY` como secreto del servidor. Nunca la coloques en React ni en Git.
3. Programa un flujo diario con `Schedule Trigger` cada 15 minutos.
4. Consulta `notification_preferences` junto con `auth.users` y filtra `enabled = true` y la hora local del usuario.
5. Consulta `daily_activity` de la semana actual para personalizar el mensaje: felicitar el progreso o invitar a una sesión de cinco minutos.
6. Entrega por el proveedor de correo configurado en n8n y registra el resultado en el historial de ejecuciones.

## Reglas de producto

- Respetar `timezone` y `reminder_time` del usuario.
- No enviar más de un recordatorio al día.
- No enviar si el usuario ya completó el objetivo diario.
- Permitir desactivar recordatorios desde la aplicación.
- Configurar reintentos y un workflow de error en n8n.

El flujo se deja intencionalmente como configuración de infraestructura y no incluye credenciales. La aplicación ya persiste las preferencias necesarias para que n8n las consuma.
