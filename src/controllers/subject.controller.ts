import type { NextFunction, Request, Response } from 'express'
import Subject from '../models/subject.model'
import { createCrudController } from './crud.controller'
import { AppError } from './crud.controller'
import { ensureSubjectHasNoDependencies, validateSubjectRelation } from '../services/academic-integrity.service'

const subjectController = createCrudController(Subject, 'materia', {
  beforeRemove: ensureSubjectHasNoDependencies,
})

export const listSubjects = subjectController.list
export const getSubjectById = subjectController.getById
export const deleteSubject = subjectController.remove

const sendSubjectError = (res: Response, error: unknown, action: string) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ error: error.message })
    return
  }
  res.status(500).json({ error: `Error al ${action}` })
}

export const createSubject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await validateSubjectRelation(req.body)
    await subjectController.create(req, res, next)
  } catch (error) {
    sendSubjectError(res, error, 'crear materia')
  }
}

export const updateSubject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const current = await Subject.findById(req.params.id).select('escuela_id carrera_id')
    if (!current) {
      res.status(404).json({ error: 'materia no encontrada' })
      return
    }
    await validateSubjectRelation({
      escuela_id: req.body.escuela_id ?? current.escuela_id,
      carrera_id: req.body.carrera_id ?? current.carrera_id,
    })
    await subjectController.update(req, res, next)
  } catch (error) {
    sendSubjectError(res, error, 'actualizar materia')
  }
}
