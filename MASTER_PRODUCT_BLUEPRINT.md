# English Coach — Documento maestro del producto

## 1. Definición

English Coach es una plataforma de aprendizaje de inglés para personas nativas de habla hispana. Su objetivo es ayudar al estudiante a comprender, pensar y comunicarse en inglés mediante situaciones reales, práctica adaptativa, inteligencia artificial y una experiencia dinámica.

Este documento reúne la visión completa del producto. Los requisitos permanentes y obligatorios se encuentran en [PRODUCT_REQUIREMENTS.md](PRODUCT_REQUIREMENTS.md).

## 2. Visión

Crear un entrenador personal de inglés que entienda por qué se equivoca cada hispanohablante, adapte su ruta de aprendizaje y lo prepare para comunicarse en situaciones reales.

La aplicación debe sentirse como una experiencia útil, humana y entretenida; no como una lista repetitiva de ejercicios.

## 3. Usuarios

- Personas que comienzan desde cero.
- Estudiantes con conocimientos previos.
- Personas que necesitan inglés para trabajo, viajes, estudios o conversación.
- Usuarios que comprenden inglés, pero no se atreven a hablar.
- Personas con poco tiempo diario.

## 4. Estándar académico

El currículo se alinea con el MCER/CEFR:

```text
A1 → Acceso
A2 → Básico
B1 → Intermedio
B2 → Intermedio alto
C1 → Avanzado
C2 → Dominio
```

El estudiante tendrá un nivel general y un nivel por habilidad: escucha, conversación, pronunciación, lectura, escritura, gramática y vocabulario.

## 5. Metodología

La metodología combina aprendizaje contextual, exposición comprensible, recuperación activa, repetición espaciada, práctica deliberada, aprendizaje basado en tareas, producción oral, retroalimentación y formación de hábitos.

Cada lección sigue:

```text
Situación real
→ Comprensión
→ Frases y vocabulario
→ Gramática aplicada
→ Pronunciación
→ Práctica guiada
→ Producción oral o escrita
→ Corrección
→ Repaso
```

La gramática se enseña dentro de situaciones, no como teoría aislada.

## 6. Currículo

### A1

Presentaciones, información personal, familia, profesiones, rutinas, horarios, comida y preguntas básicas.

### A2

Compras, viajes, hoteles, salud, pasado, planes, experiencias, preposiciones y verbos irregulares.

### B1

Opiniones, experiencias, trabajo, problemas, soluciones, entrevistas, phrasal verbs y conversaciones independientes.

### B2

Debates, reuniones, negociación, textos complejos, diferentes acentos y comunicación profesional.

### C1

Argumentación, presentaciones, escritura profesional, matices, lenguaje indirecto y contenido auténtico.

### C2

Comprensión prácticamente total, precisión, lenguaje idiomático, registros avanzados y comunicación académica o profesional.

## 7. Estructura del contenido

```text
Nivel
→ Ruta
→ Unidad
→ Lección
→ Bloques de contenido
→ Ejercicios
→ Evaluación
```

Cada unidad tendrá un objetivo comunicativo, situación, historia o contexto, vocabulario, gramática, pronunciación, escucha, lectura, escritura, conversación con IA, repaso y evaluación.

## 8. Tipos de contenido

- Diálogos originales.
- Historias y personajes recurrentes.
- Audios lentos y naturales.
- Diferentes voces y acentos.
- Ejercicios de escucha.
- Pronunciación y pares mínimos.
- Vocabulario contextual.
- Lecturas, mensajes, menús y correos.
- Escritura práctica.
- Role-play con IA.
- Misiones comunicativas fuera de la app.
- Evaluaciones basadas en tareas reales.

## 9. Enfoque para hispanohablantes

El contenido abordará /th/, /v/, /b/, /r/, /w/, ritmo, entonación, orden de palabras, artículos, preposiciones, tiempos verbales, falsos amigos, traducciones literales, phrasal verbs y diferencias entre inglés formal, informal y natural.

## 10. Diagnóstico y personalización

La prueba inicial será adaptativa y evaluará vocabulario, gramática, escucha, lectura, escritura, pronunciación y conversación.

Ejemplo:

```text
Nivel general: B1
Escucha: B2
Gramática: A2
Pronunciación: A1
Conversación: B1
```

La ruta se construirá a partir de las debilidades sin hacer repetir contenidos dominados.

## 11. Módulos de la aplicación

### Estudiante

- Registro y acceso.
- Perfil y objetivos.
- Prueba de nivel.
- Dashboard.
- Ruta de aprendizaje.
- Lecciones.
- Ejercicios.
- Pronunciación.
- Conversación con IA.
- Repaso inteligente.
- Progreso y estadísticas.
- Gamificación.
- Notificaciones.

### Administración

- Gestión de niveles, unidades y lecciones.
- Gestión de ejercicios y audios.
- Gestión de usuarios y roles.
- Analítica pedagógica.
- Configuración de escenarios y prompts de IA.

## 12. Diferenciadores

- Mapa personal de errores.
- Diagnóstico por habilidad.
- Simulador de vida real.
- Modo confianza sin interrupciones.
- Entrenador de naturalidad.
- Conversaciones con memoria.
- Historias ramificadas.
- Misiones fuera de la app.
- Evaluación de comunicación real.
- Pronunciación basada en inteligibilidad.
- Certificado basado en habilidades.

## 13. Motivación y retención

La app debe ofrecer sesiones de 5, 10 o 15 minutos, retos diarios, misiones semanales, historias, logros por aprendizaje real, rachas flexibles, recuperación sin culpa y recomendaciones adaptadas al tiempo y estado del usuario.

Cada unidad debe responder: “¿Por qué querrá el estudiante volver mañana?”

## 14. Inteligencia artificial

La IA será tutor, compañero de conversación, corrector, detector de errores, generador de ejemplos, adaptador de dificultad y recomendador de repasos.

Debe corregir sin desmotivar, mantener el contexto del estudiante y evitar inventar información o contenido no revisado.

## 15. Fuentes y producción de contenido

El contenido se basará en el MCER, investigación lingüística, errores de hispanohablantes, situaciones reales, materiales licenciados y contenido original creado por profesores, lingüistas, diseñadores pedagógicos, guionistas y locutores.

No se copiarán lecciones de otras aplicaciones. La IA ayudará a generar variaciones, pero el contenido pedagógico debe revisarse humanamente.

## 16. Arquitectura técnica

```text
Frontend web responsive
→ API y lógica de negocio
→ Supabase/PostgreSQL
→ Storage de audios e imágenes
→ IA y voz
→ n8n para automatizaciones
```

Las lecciones, ejercicios y progreso deben ser datos administrables; no deben quedar quemados en HTML o JavaScript.

### Arquitectura de código

El frontend debe estar modularizado por dominio y responsabilidad. No se deben crear archivos monolíticos ni mezclar interfaz, consultas a Supabase, lógica de negocio y configuración.

```text
src/
├── app/
├── components/
├── features/
│   ├── auth/
│   ├── lessons/
│   ├── exercises/
│   ├── progress/
│   ├── review/
│   ├── pronunciation/
│   └── conversation/
├── services/
├── lib/
├── hooks/
├── types/
└── styles/
```

La aplicación debe priorizar componentes pequeños, reutilización, carga diferida, consultas eficientes, optimización multimedia, pruebas de flujos críticos y separación clara entre contenido, datos, lógica e interfaz.

## 17. MVP

El MVP incluirá:

- Ruta A1 inicial.
- A2 inicial.
- Prueba de nivel.
- Registro y perfil.
- Dashboard.
- Lecciones dinámicas.
- Escucha, lectura, escritura y vocabulario.
- Pronunciación básica.
- Conversaciones iniciales con IA.
- Repetición espaciada.
- Progreso.
- Panel de contenido.

El primer contenido recomendado es una ruta A1 con situaciones como presentarse, cafetería, familia, profesiones, rutinas, horarios y compras.

## 18. Métricas

- Retención a 1, 7 y 30 días.
- Lecciones completadas.
- Tiempo hablado.
- Reducción de errores.
- Mejora de escucha y pronunciación.
- Conversaciones completadas.
- Regreso después de una pausa.
- Progreso por habilidad.
- Satisfacción y dificultad percibida.

## 19. Roadmap

1. Validar diseño y primer flujo.
2. Crear esquema de Supabase.
3. Migrar la primera lección a datos.
4. Conectar autenticación y progreso.
5. Crear panel de contenidos.
6. Publicar el MVP.
7. Probar con usuarios reales.
8. Mejorar contenido según métricas.
9. Añadir IA conversacional y pronunciación avanzada.
10. Expandir A1–C2 y rutas profesionales.

## 20. Criterio final

English Coach será extraordinario si el estudiante siente que:

> “La aplicación entiende mis errores, me mantiene motivado y me prepara para hablar inglés en mi vida real.”
