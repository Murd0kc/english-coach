# English Coach — Requisitos permanentes del producto

Este documento es la fuente principal de verdad para diseñar, desarrollar y revisar English Coach. Cualquier nueva función, lección, tabla o flujo debe respetar estos requisitos.

## 1. Propósito

English Coach es una aplicación para enseñar inglés a personas nativas de habla hispana. Debe ayudar al estudiante a comprender, pensar y comunicarse en inglés, reduciendo la dependencia de la traducción literal.

## 2. Estándar internacional

El currículo debe alinearse con el Marco Común Europeo de Referencia para las Lenguas (MCER/CEFR):

- **A1 — Acceso:** frases básicas y necesidades cotidianas.
- **A2 — Básico:** comunicación sencilla en situaciones previsibles.
- **B1 — Intermedio:** conversación independiente sobre experiencias y opiniones.
- **B2 — Intermedio alto:** debates, textos complejos y comunicación profesional.
- **C1 — Avanzado:** comunicación fluida, precisa y con matices.
- **C2 — Dominio:** comprensión y expresión prácticamente completas.

La aplicación debe evaluar el nivel general y también el nivel por habilidad.

Ejemplo:

```text
Nivel general: B1
Escucha: B2
Lectura: B1
Gramática: A2
Pronunciación: B1
Conversación: B1
```

## 3. Usuarios

La app debe servir tanto para:

- Personas que empiezan desde cero.
- Personas que ya estudiaron inglés.
- Usuarios que necesitan inglés para trabajar.
- Usuarios que lo necesitan para viajar, estudiar o conversar.

La prueba inicial debe crear una ruta personalizada sin obligar al usuario a repetir contenidos que ya domina.

## 4. Habilidades obligatorias

Todo el currículo debe desarrollar:

- Comprensión auditiva.
- Pronunciación.
- Conversación.
- Vocabulario.
- Gramática aplicada.
- Comprensión lectora.
- Escritura.
- Fluidez y confianza.

## 5. Dificultades de hispanohablantes

El contenido debe abordar de forma explícita:

- Sonidos /th/, /v/, /b/, /r/ y /w/.
- Acentuación, ritmo y entonación.
- Orden de palabras.
- Artículos y preposiciones.
- Tiempos verbales.
- Verbos irregulares.
- Phrasal verbs.
- Falsos amigos.
- Traducciones literales.
- Diferencias entre inglés formal, informal y conversacional.
- Diferencias entre *make/do*, *say/tell*, *since/for*, entre otras.

Las correcciones deben explicar la diferencia entre español e inglés con ejemplos claros y útiles.

## 6. Metodología

La metodología debe combinar:

- Aprendizaje contextual.
- Repetición espaciada.
- Recuperación activa.
- Práctica deliberada.
- Exposición comprensible.
- Producción oral y escrita.
- Retroalimentación personalizada.
- Gamificación moderada.
- Adaptación mediante inteligencia artificial.

Cada lección debe seguir este ciclo:

```text
Situación real
→ Comprensión
→ Frases y vocabulario
→ Gramática aplicada
→ Pronunciación
→ Práctica guiada
→ Producción
→ Corrección
→ Repaso
```

## 7. Estructura de una unidad

Cada unidad debe incluir:

1. Objetivo comunicativo.
2. Situación real.
3. Diálogo principal.
4. Vocabulario contextual.
5. Gramática aplicada.
6. Pronunciación.
7. Escucha.
8. Lectura.
9. Escritura.
10. Conversación con IA.
11. Repaso personalizado.
12. Evaluación de dominio.

Las lecciones normales deben durar aproximadamente 8–15 minutos.

## 8. Contenido y ejercicios

Debe incluir:

- Diálogos cotidianos.
- Audios lentos y naturales.
- Diferentes voces y acentos progresivamente.
- Dictados.
- Selección múltiple.
- Completar frases.
- Ordenar palabras.
- Pares mínimos de pronunciación.
- Lectura en voz alta.
- Mensajes, correos, menús y anuncios.
- Escritura contextual.
- Reformulación de traducciones literales.
- Role-play con inteligencia artificial.

No se deben crear ejercicios aislados sin un objetivo comunicativo.

## 9. Evaluación y progreso

La evaluación debe incluir:

- Prueba de nivel adaptativa.
- Diagnóstico por habilidad.
- Evaluación semanal.
- Evaluación mensual.
- Evaluación al terminar cada unidad.
- Evaluación al terminar cada nivel CEFR.
- Tareas comunicativas reales.

El usuario debe demostrar comprensión y producción antes de dominar una unidad.

## 10. Inteligencia artificial

La IA debe funcionar como:

- Tutor personalizado.
- Compañero de conversación.
- Corrector de escritura.
- Analizador de errores.
- Generador de ejemplos.
- Adaptador de dificultad.
- Recomendador de repasos.

La IA no debe inventar productos, reglas o respuestas. Las correcciones deben ser claras, breves y apropiadas al nivel.

## 11. Motivación

La experiencia debe fomentar constancia mediante:

- Lecciones cortas.
- Objetivos diarios alcanzables.
- Progreso visible.
- Rachas flexibles.
- Misiones semanales.
- Historias y personajes recurrentes.
- Recompensas por corregir errores y hablar.
- Modo de práctica sin presión.

La gamificación nunca debe sustituir el aprendizaje real.

## 12. Arquitectura del producto

La interfaz, el contenido y el progreso deben estar separados:

```text
Interfaz
→ API y lógica
→ Base de datos
→ Contenido educativo
→ IA y servicios multimedia
```

Las lecciones no deben quedar quemadas en HTML o JavaScript. Deben ser administrables desde la base de datos o un panel de contenidos.

## 13. Calidad

Cada unidad debe ser revisada por:

- Especialista pedagógico.
- Profesor de inglés.
- Lingüista español-inglés.
- Revisor de naturalidad.
- Revisor técnico.

Se debe medir retención, avance por habilidad, reducción de errores, tiempo hablado, comprensión y capacidad de completar situaciones reales.

## 14. Principio de producto

Cada lección debe responder claramente:

> ¿Qué podrá hacer el estudiante en inglés después de completarla?

Si una función o contenido no mejora la comprensión, la producción, la confianza o la constancia del estudiante, debe revisarse antes de incluirse.

## 16. Arquitectura y calidad de código

La aplicación debe construirse con prácticas profesionales de desarrollo moderno:

- Separar presentación, lógica de negocio, acceso a datos y configuración.
- Dividir la interfaz en componentes pequeños, reutilizables y fáciles de probar.
- Separar cada módulo funcional en sus propios archivos y carpetas.
- Evitar archivos monolíticos y componentes con demasiadas responsabilidades.
- Mantener las lecciones y ejercicios fuera del código de la interfaz.
- Usar servicios o repositorios para comunicarse con Supabase.
- Centralizar tipos, validaciones, constantes y configuración.
- Cargar funciones pesadas de forma diferida cuando sea necesario.
- Optimizar audios, imágenes, JavaScript y consultas a la base de datos.
- Evitar duplicación de código.
- Aplicar nombres claros y consistentes.
- Mantener las variables secretas fuera del frontend y del repositorio.
- Añadir pruebas para los flujos críticos.
- Diseñar la arquitectura para que pueda crecer sin reescribir toda la aplicación.

### Organización recomendada

```text
src/
├── app/             # Arranque, rutas y proveedores
├── components/      # Componentes visuales reutilizables
├── features/        # Módulos por funcionalidad
│   ├── auth/
│   ├── lessons/
│   ├── exercises/
│   ├── progress/
│   ├── review/
│   ├── pronunciation/
│   └── conversation/
├── services/        # Supabase, IA, audio y APIs
├── lib/             # Clientes y utilidades compartidas
├── hooks/           # Hooks reutilizables
├── types/           # Tipos y contratos
└── styles/          # Estilos globales y tokens visuales
```

Cada módulo debe poder evolucionar y probarse con el menor impacto posible en los demás módulos.

## 15. Motivación, dinamismo y retención

English Coach no debe sentirse como una lista repetitiva de ejercicios. La experiencia debe ser dinámica, variada y emocionalmente motivadora.

### Principios obligatorios

- Las actividades deben variar en formato, contexto y nivel de interacción.
- Cada sesión debe tener un objetivo comunicativo claro.
- El estudiante debe percibir avances reales y visibles.
- La gamificación debe premiar aprendizaje real, no solamente tiempo dentro de la app.
- Las lecciones deben evitar la repetición mecánica y sin contexto.
- El estudiante debe poder equivocarse sin sentirse castigado.
- La aplicación debe adaptarse a usuarios que empiezan desde cero y a usuarios avanzados.

### Variedad de experiencias

El producto debe combinar progresivamente:

- Diálogos.
- Historias y personajes recurrentes.
- Retos diarios y semanales.
- Juegos lingüísticos.
- Imágenes y situaciones visuales.
- Audios y videos breves.
- Conversaciones con IA.
- Desafíos de pronunciación.
- Misiones prácticas.
- Lecturas, mensajes y correos reales.

### Tipos de sesión

El usuario debe poder elegir o recibir una recomendación adaptada:

- Práctica rápida de 5 minutos.
- Lección completa de 8–15 minutos.
- Repaso inteligente.
- Conversación libre.
- Desafío de pronunciación.
- Reto semanal.
- Evaluación de progreso.

### Narrativa y contexto

Siempre que sea apropiado, las unidades deben conectarse mediante historias, personajes y situaciones recurrentes. Esto ayuda a crear continuidad y una razón emocional para regresar.

### Adaptación mediante IA

La IA debe ajustar la experiencia según:

- Rendimiento.
- Tiempo disponible.
- Intereses.
- Errores frecuentes.
- Nivel de confianza.
- Tiempo desde la última sesión.
- Señales de frustración o aburrimiento.

La IA puede recomendar una sesión más corta, cambiar el tipo de actividad, variar el contexto o reducir temporalmente la dificultad.

### Recuperación de motivación

Si un usuario abandona, la app debe ofrecer una reentrada sencilla:

- Repaso corto.
- Lección relacionada con sus intereses.
- Recuperación flexible de la racha.
- Mensaje útil y no culpabilizante.
- Reto pequeño con alta probabilidad de éxito.

### Métricas de motivación

Se deben medir:

- Retención a 1, 7 y 30 días.
- Lecciones iniciadas y terminadas.
- Tiempo hablado.
- Regreso después de una pausa.
- Abandono dentro de una lección.
- Repetición voluntaria de actividades.
- Progreso percibido por el usuario.
- Dificultad y satisfacción reportadas.

### Criterio de calidad motivacional

Cada unidad debe responder también:

> ¿Por qué querrá el estudiante volver mañana?

Si una actividad es correcta desde el punto de vista académico pero repetitiva, confusa o desmotivadora, debe rediseñarse.
