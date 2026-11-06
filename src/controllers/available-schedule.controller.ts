import type { Request, Response } from 'express'
import AvailableSchedule from '../models/available-schedule.model'
import { createCrudController } from './crud.controller'
import { ensureScheduleHasNoAcceptedTutorings } from '../services/academic-integrity.service'

const scheduleController = createCrudController(AvailableSchedule, 'horario disponible', {
  beforeRemove: ensureScheduleHasNoAcceptedTutorings,
})

export const getAvailableScheduleById = scheduleController.getById
export const createAvailableSchedule = scheduleController.create
export const updateAvailableSchedule = scheduleController.update
export const deleteAvailableSchedule = scheduleController.remove

export const listAvailableSchedules = async (req: Request, res: Response) => {
  try {
    const filter: Record<string, unknown> = {}
    if (req.query.profesor_id) {
      filter.profesor_id = req.query.profesor_id
    }
    if (req.query.materia_id) {
      filter.materia_id = req.query.materia_id
    }

    const schedules = await AvailableSchedule.find(filter)
      .populate('profesor_id', 'nombre correo')
      .populate('materia_id', 'nombre')
      .sort({ fecha: 1, hora_inicio: 1 })

    res.status(200).json(schedules)
  } catch (error) {
    res.status(500).json({ error: 'Error al listar los horarios disponibles' })
  }
}