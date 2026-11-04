import type { NextFunction, Request, Response } from 'express'
import Career from '../models/career.model'
import { AppError, createCrudController } from './crud.controller'
import { ensureCareerHasNoDependencies, validateCareerSchool } from '../services/academic-integrity.service'

const careerController = createCrudController(Career, 'carrera', {
  beforeRemove: ensureCareerHasNoDependencies,
})

export const listCareers = careerController.list
export const getCareerById = careerController.getById
export const deleteCareer = careerController.remove

const sendCareerError = (res: Response, error: unknown, action: string) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ error: error.message })
    return
  }
  res.status(500).json({ error: `Error al ${action}` })
}

export const createCareer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await validateCareerSchool(req.body.escuela_id)
    await careerController.create(req, res, next)
  } catch (error) {
    sendCareerError(res, error, 'crear carrera')
  }
}

export const updateCareer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const current = await Career.findById(req.params.id).select('escuela_id')
    if (!current) {
      res.status(404).json({ error: 'carrera no encontrada' })
      return
    }
    await validateCareerSchool(req.body.escuela_id ?? current.escuela_id)
    await careerController.update(req, res, next)
  } catch (error) {
    sendCareerError(res, error, 'actualizar carrera')
  }
}
