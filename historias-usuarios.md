## Profesor

### HU-01 – Registrar horarios disponibles (horarios\_disponibles)

Como profesor, quiero diligenciar un formulario con mi nombre, asignatura, semestre y los días y franjas horarias en que tengo tiempo libre, para ofrecer tutorías a los estudiantes que no pueden asistir a las monitorías en los horarios regulares.

**Criterios de aceptación:** el formulario valida los campos obligatorios, permite varios días y franjas, y guarda el horario asociado al profesor y a la materia.

### HU-04 – Gestionar solicitudes recibidas (solicitudes\_tutoria)

Como profesor, quiero ver las solicitudes de tutoría que me han hecho y poder aceptarlas, cancelarlas o aplazarlas, para organizar mi agenda cuando tenga dificultades en una fecha determinada.

**Criterios de aceptación:** la lista muestra estudiante, materia, tema y fecha; cada acción actualiza el estado de la solicitud (pendiente, aceptada, cancelada, aplazada).

### HU-05 – Registrar evidencia de la tutoría (tutorias)

Como profesor, quiero registrar el enlace de la reunión (si es virtual) y la asistencia de los estudiantes (si es presencial o virtual), para dejar evidencia de que la tutoría se realizó correctamente.

**Criterios de aceptación:** la tutoría guarda modalidad, enlace y lista de asistentes con su estado (asistió o no).

### HU-06 – Definir modalidad y tipo de tutoría (tutorias)

Como profesor, quiero definir si una tutoría será presencial o virtual y si será individual o grupal, para adaptarla a la necesidad de los estudiantes y a los recursos disponibles.

**Criterios de aceptación:** al aceptar una solicitud se elige modalidad, tipo y, si es presencial, el lugar.

### HU-07 – Guardar enlaces de reunión y grabación (tutorias)

Como profesor, quiero almacenar el enlace de la reunión virtual y luego el de la grabación, para que los estudiantes puedan acceder a la sesión y repasarla después.

**Criterios de aceptación:** el enlace de grabación se puede agregar o editar una vez finalizada la tutoría.

### HU-08 – Editar o eliminar mis horarios (horarios\_disponibles)

Como profesor, quiero modificar o eliminar mis horarios disponibles, para mantener mi agenda actualizada cuando cambie mi disponibilidad.

**Criterios de aceptación:** un horario con tutorías ya aceptadas no se puede eliminar sin antes reprogramarlas o cancelarlas.

### HU-09 – Consultar historial de tutorías dictadas (tutorias)

Como profesor, quiero ver el historial de tutorías que he realizado, para hacer seguimiento a mi labor de apoyo académico.

**Criterios de aceptación:** permite filtrar por materia, tema, fecha y modalidad.

### HU-10 – Recomendar recursos académicos (recursos)

Como profesor, quiero agregar recursos de apoyo (videos, guías, documentos, enlaces) asociados a un tema, para que los estudiantes los consulten antes de solicitar una tutoría.

**Criterios de aceptación:** cada recurso queda vinculado a una materia y un tema, con título, tipo y URL.

## Estudiante

### HU-02 – Consultar horarios disponibles (horarios\_disponibles)

Como estudiante, quiero ver los días y horas en que los profesores tienen disponibilidad, para escoger una tutoría que se ajuste a mis tiempos, ya que no puedo asistir en ciertos horarios.

**Criterios de aceptación:** la lista muestra profesor, materia, día y franja, y solo incluye horarios aún libres.

### HU-03 – Solicitar una tutoría (solicitudes\_tutoria)

Como estudiante, quiero solicitar una tutoría con un profesor sobre un tema específico, para reforzar los contenidos que no he logrado comprender por completo.

**Criterios de aceptación:** la solicitud guarda estudiante, profesor, materia, tema y horario elegido, y queda en estado "pendiente".

### HU-11 – Registrarme e iniciar sesión (usuarios)

Como estudiante, quiero registrarme e iniciar sesión en la plataforma, para acceder a mis solicitudes y tutorías de forma personalizada y segura.

**Criterios de aceptación:** el registro incluye carrera y semestre; el sistema identifica el rol del usuario.

### HU-12 – Buscar apoyo académico (escuelas, materias, temas, usuarios)

Como estudiante, quiero buscar apoyo por escuela, materia, tema y profesor, para encontrar rápidamente la ayuda adecuada para mi dificultad.

**Criterios de aceptación:** los filtros se pueden combinar y devuelven los profesores y horarios relacionados.

### HU-13 – Consultar recursos antes de solicitar (recursos)

Como estudiante, quiero ver los recursos recomendados de un tema antes de pedir una tutoría, para intentar resolver mis dudas por mi cuenta y aprovechar mejor la sesión.

**Criterios de aceptación:** al seleccionar un tema se listan sus recursos; desde esa vista se puede continuar a la solicitud.

### HU-14 – Seguir el estado de mis solicitudes (solicitudes\_tutoria)

Como estudiante, quiero ver si mis solicitudes fueron aceptadas, canceladas o aplazadas, para saber si debo prepararme para la tutoría o buscar otra opción.

**Criterios de aceptación:** el estado se actualiza apenas el profesor responde.

### HU-15 – Cancelar una solicitud (solicitudes\_tutoria)

Como estudiante, quiero cancelar una solicitud pendiente, para liberar el horario del profesor cuando ya no pueda asistir.

**Criterios de aceptación:** solo se pueden cancelar solicitudes que no hayan sido realizadas.

### HU-16 – Inscribirme en una tutoría grupal (tutorias)

Como estudiante, quiero inscribirme en una tutoría grupal ya programada, para aprovechar la sesión junto con otros compañeros que tienen la misma duda.

**Criterios de aceptación:** el estudiante queda en la lista de participantes y se respeta el cupo máximo, si existe.

### HU-17 – Acceder al enlace de reunión y a la grabación (tutorias)

Como estudiante, quiero ver el enlace de la reunión virtual y la grabación de mis tutorías, para conectarme a tiempo y repasar el contenido después.

**Criterios de aceptación:** el enlace solo es visible para los estudiantes inscritos en esa tutoría.

### HU-18 – Consultar mi historial de tutorías (tutorias)

Como estudiante, quiero ver las tutorías que he recibido, para llevar un control de mi proceso de aprendizaje.

**Criterios de aceptación:** muestra materia, tema, profesor, fecha, modalidad y asistencia.

## Administrador académico

### HU-19 – Gestionar usuarios (usuarios)

Como administrador, quiero crear, editar y desactivar usuarios (estudiantes, profesores y administradores), para controlar quién accede al sistema y con qué permisos.

**Criterios de aceptación:** se puede asignar y cambiar el rol de cada usuario.

### HU-20 – Gestionar la estructura académica (escuelas, carreras, materias, temas)

Como administrador, quiero administrar escuelas, carreras, materias y temas, para mantener actualizado el catálogo sobre el que los estudiantes buscan apoyo.

**Criterios de aceptación:** CRUD completo y relación jerárquica escuela → carrera → materia → tema.

### HU-21 – Administrar recursos académicos (recursos)

Como administrador, quiero revisar, editar y eliminar los recursos publicados, para garantizar que el material recomendado sea pertinente y esté vigente.

**Criterios de aceptación:** se puede filtrar por tema y eliminar recursos con enlaces rotos.

### HU-22 – Analizar la demanda de tutorías (solicitudes\_tutoria, reportes\_academicos)

Como administrador, quiero ver qué materias y temas tienen mayor número de solicitudes según la carrera y el semestre, para identificar contenidos que requieren fortalecimiento y planificar acciones de enseñanza.

**Criterios de aceptación:** el reporte se construye con agregaciones de MongoDB y permite filtrar por carrera, semestre y rango de fechas.

### HU-23 – Guardar y consultar reportes académicos (reportes\_academicos)

Como administrador, quiero guardar los reportes generados y consultarlos después, para comparar la demanda entre periodos y respaldar decisiones académicas.

**Criterios de aceptación:** cada reporte guarda sus filtros, fecha de generación y resultados.
