# Integridad de la jerarquia academica

La relacion academica es `escuela -> carrera -> materia -> tema -> recurso`.

## Materias

`POST /api/materias` requiere `escuela_id`, `carrera_id`, `nombre`, `descripcion` y
`estado`. La escuela y la carrera deben existir, y la carrera debe pertenecer a la
escuela indicada. `GET /api/materias` devuelve ambos identificadores.

`PUT /api/materias/:id` combina los valores actuales con los recibidos y vuelve a
validar la relacion si cambia cualquiera de los dos identificadores. Una relacion
invalida devuelve `400`, `404` o `409` segun el motivo.

No se eliminan registros dependientes en cascada. Las eliminaciones devuelven `409`
cuando existen dependencias: carreras o materias para una escuela, materias para una
carrera, temas para una materia o recursos para un tema.

## Migracion

Antes de exigir `carrera_id` en datos existentes, ejecutar:

```bash
npm run migrate:subjects
```

El script solo asigna una carrera cuando existe exactamente una carrera para la
escuela de la materia. Imprime un reporte JSON de materias no resueltas; esas
materias deben corregirse manualmente. Es seguro ejecutarlo varias veces porque solo
actualiza materias sin `carrera_id`.
