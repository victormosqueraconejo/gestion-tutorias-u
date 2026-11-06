import type { Request, Response } from 'express'
import Resource from '../models/resource.model'

export const listResources = async (req: Request, res: Response) => {
  try {
    const filter: Record<string, unknown> = {}
    if (req.query.agregado_por) {
      filter.agregado_por = req.query.agregado_por
    }
    if (req.query.tema_id) {
      filter.tema_id = req.query.tema_id
    }
    if (req.query.tipo && req.query.tipo !== 'all') {
      filter.tipo = req.query.tipo
    }

    const resources = await Resource.find(filter)
      .populate({
        path: 'tema_id',
        select: 'nombre materia_id',
        populate: { path: 'materia_id', select: 'nombre' },
      })
      .populate('agregado_por', 'nombre correo')
      .sort({ createdAt: -1 })

    res.status(200).json(resources)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la lista de recursos' })
  }
}

export const getResourceById = async (req: Request, res: Response) => {
  try {
    const resource = await Resource.findById(req.params.id)
      .populate('tema_id')
      .populate('agregado_por')
    if (!resource) return res.status(404).json({ error: 'Recurso no encontrado' })
    res.status(200).json(resource)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el recurso' })
  }
}

export const createResource = async (req: Request, res: Response) => {
  try {
    const payload = {
      ...req.body,
      validado: req.body.validado ?? true,
      fecha_creacion: req.body.fecha_creacion || new Date(),
    }
    const newResource = await Resource.create(payload)
    res.status(201).json(newResource)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el recurso' })
  }
}

export const updateResource = async (req: Request, res: Response) => {
  try {
    const updated = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updated) return res.status(404).json({ error: 'Recurso no encontrado' })
    res.status(200).json(updated)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el recurso' })
  }
}

export const deleteResource = async (req: Request, res: Response) => {
  try {
    const deleted = await Resource.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ error: 'Recurso no encontrado' })
    res.status(200).json({ message: 'Recurso eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el recurso' })
  }
}