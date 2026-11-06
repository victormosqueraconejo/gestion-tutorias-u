import type { Request, Response } from 'express'
import Tutoring from '../models/tutoring.model'

export const listTutorings = async (req: Request, res: Response) => {
  try {
    const filter: Record<string, unknown> = {}
    if (req.query.profesor_id) filter.profesor_id = req.query.profesor_id
    if (req.query.materia_id) filter.materia_id = req.query.materia_id
    if (req.query.estado) filter.estado = req.query.estado

    const tutorias = await Tutoring.find(filter)
      .populate('profesor_id', 'nombre correo')
      .populate('materia_id', 'nombre codigo')
      .populate('tema_id', 'nombre')
      .populate('estudiantes.estudiante_id', 'nombre correo avatar')
      .populate('estudiantes.carrera_id', 'nombre')
      .sort({ fecha: -1 })

    res.status(200).json(tutorias)
  } catch (error) {
    res.status(500).json({ error: 'Error al listar las tutorías' })
  }
}

export const getTutoringById = async (req: Request, res: Response) => {
  try {
    const tutoria = await Tutoring.findById(req.params.id)
      .populate('profesor_id', 'nombre correo')
      .populate('materia_id', 'nombre codigo')
      .populate('tema_id', 'nombre')
      .populate('estudiantes.estudiante_id', 'nombre correo avatar')
      .populate('estudiantes.carrera_id', 'nombre')

    if (!tutoria) {
      return res.status(404).json({ error: 'Registro de tutoría no encontrado' })
    }

    res.status(200).json(tutoria)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la tutoría' })
  }
}

export const createTutoring = async (req: Request, res: Response) => {
  try {
    const nuevaTutoria = await Tutoring.create(req.body)
    res.status(201).json(nuevaTutoria)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la tutoría' })
  }
}

export const updateTutoring = async (req: Request, res: Response) => {
  try {
    const tutoriaActualizada = await Tutoring.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .populate('profesor_id', 'nombre correo')
      .populate('materia_id', 'nombre codigo')
      .populate('tema_id', 'nombre')
      .populate('estudiantes.estudiante_id', 'nombre correo avatar')
      .populate('estudiantes.carrera_id', 'nombre')

    if (!tutoriaActualizada) {
      return res.status(404).json({ error: 'Tutoría no encontrada' })
    }

    res.status(200).json(tutoriaActualizada)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar los datos de la tutoría' })
  }
}

export const deleteTutoring = async (req: Request, res: Response) => {
  try {
    const eliminada = await Tutoring.findByIdAndDelete(req.params.id)
    if (!eliminada) return res.status(404).json({ error: 'Tutoría no encontrada' })
    res.status(200).json({ message: 'Tutoría eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la tutoría' })
  }
}