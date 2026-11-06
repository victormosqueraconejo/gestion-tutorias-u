import { isValidObjectId } from 'mongoose'
import Career from '../models/career.model'
import Resource from '../models/resource.model'
import School from '../models/school.model'
import Subject from '../models/subject.model'
import Topic from '../models/topic.model'
import TutoringRequest from '../models/tutoring-request.model'
import { AppError } from '../controllers/crud.controller'

const requireObjectId = (value: unknown, field: string): string => {
  if (typeof value !== 'string' || !isValidObjectId(value)) {
    throw new AppError(`${field} debe ser un identificador valido`, 400)
  }
  return value
}

export const validateSubjectRelation = async (data: {
  escuela_id?: unknown
  carrera_id?: unknown
}) => {
  const schoolId = requireObjectId(data.escuela_id, 'escuela_id')
  const careerId = requireObjectId(data.carrera_id, 'carrera_id')
  const [school, career] = await Promise.all([
    School.findById(schoolId).select('_id'),
    Career.findById(careerId).select('escuela_id'),
  ])

  if (!school) {
    throw new AppError('La escuela no existe', 404)
  }
  if (!career) {
    throw new AppError('La carrera no existe', 404)
  }
  if (String(career.escuela_id) !== schoolId) {
    throw new AppError('La carrera no pertenece a la escuela indicada', 409)
  }
}

export const validateCareerSchool = async (escuelaId: unknown) => {
  const schoolId = requireObjectId(escuelaId, 'escuela_id')
  if (!(await School.exists({ _id: schoolId }))) {
    throw new AppError('La escuela no existe', 404)
  }
}

export const ensureSchoolHasNoDependencies = async (id: string) => {
  const [careers, subjects] = await Promise.all([
    Career.exists({ escuela_id: id }),
    Subject.exists({ escuela_id: id }),
  ])
  if (careers || subjects) {
    throw new AppError('No se puede eliminar la escuela porque tiene carreras o materias asociadas', 409)
  }
}

export const ensureCareerHasNoDependencies = async (id: string) => {
  if (await Subject.exists({ carrera_id: id })) {
    throw new AppError('No se puede eliminar la carrera porque tiene materias asociadas', 409)
  }
}

export const ensureSubjectHasNoDependencies = async (id: string) => {
  if (await Topic.exists({ materia_id: id })) {
    throw new AppError('No se puede eliminar la materia porque tiene temas asociados', 409)
  }
}

export const ensureTopicHasNoDependencies = async (id: string) => {
  if (await Resource.exists({ tema_id: id })) {
    throw new AppError('No se puede eliminar el tema porque tiene recursos asociados', 409)
  }
}

export const ensureScheduleHasNoAcceptedTutorings = async (horarioId: string) => {
  const hasAcceptedRequest = await TutoringRequest.exists({
    horario_id: horarioId,
    estado: 'aceptada',
  })

  if (hasAcceptedRequest) {
    throw new AppError(
      'No se puede eliminar este horario porque tiene 1 tutoría aceptada. Debes reprogramar o cancelar la tutoría primero.',
      409,
    )
  }
}