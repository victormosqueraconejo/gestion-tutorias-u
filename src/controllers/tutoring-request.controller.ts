import type { Request, Response } from 'express'
import TutoringRequest from '../models/tutoring-request.model'
import AvailableSchedule from '../models/available-schedule.model'
import Tutoring from '../models/tutoring.model'
import User from '../models/user.model'

export const listTutoringRequests = async (req: Request, res: Response) => {
  try {
    const filter: Record<string, unknown> = {}
    if (req.query.profesor_id) {
      filter.profesor_id = req.query.profesor_id
    }

    const requests = await TutoringRequest.find(filter)
      .populate('estudiante_id', 'nombre correo matricula avatar perfil_estudiante')
      .populate('materia_id', 'nombre')
      .populate('horario_id', 'fecha dia hora_inicio hora_fin')
      .sort({ createdAt: -1 })

    res.status(200).json(requests)
  } catch (error) {
    res.status(500).json({ error: 'Error al listar las solicitudes de tutoría' })
  }
}

export const getTutoringRequestById = async (req: Request, res: Response) => {
  try {
    const request = await TutoringRequest.findById(req.params.id)
      .populate('estudiante_id')
      .populate('materia_id')
      .populate('horario_id')
    if (!request) return res.status(404).json({ error: 'Solicitud no encontrada' })
    res.status(200).json(request)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la solicitud' })
  }
}

export const createTutoringRequest = async (req: Request, res: Response) => {
  try {
    const newRequest = await TutoringRequest.create(req.body)
    res.status(201).json(newRequest)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la solicitud' })
  }
}

export const updateTutoringRequest = async (req: Request, res: Response) => {
  try {
    const updated = await TutoringRequest.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updated) return res.status(404).json({ error: 'Solicitud no encontrada' })
    res.status(200).json(updated)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la solicitud' })
  }
}

export const deleteTutoringRequest = async (req: Request, res: Response) => {
  try {
    const deleted = await TutoringRequest.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ error: 'Solicitud no encontrada' })
    res.status(200).json({ message: 'Solicitud eliminada' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la solicitud' })
  }
}

export const acceptTutoringRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { modalidad, tipo_tutoria, cupo_maximo, lugar_encuentro, link_videollamada, notas } = req.body

    const tutoringRequest = await TutoringRequest.findById(id)
    if (!tutoringRequest) {
      return res.status(404).json({ error: 'Solicitud no encontrada' })
    }

    tutoringRequest.estado = 'aceptada'
    tutoringRequest.modalidad = modalidad
    tutoringRequest.tipo_tutoria = tipo_tutoria
    tutoringRequest.cupo_maximo = cupo_maximo
    tutoringRequest.lugar_encuentro = lugar_encuentro
    tutoringRequest.link_videollamada = link_videollamada
    tutoringRequest.notas = notas
    await tutoringRequest.save()

    let horarioData = null
    if (tutoringRequest.horario_id) {
      horarioData = await AvailableSchedule.findByIdAndUpdate(
        tutoringRequest.horario_id,
        { estado: 'aceptada' },
        { new: true }
      )
    }

    const estudiante = await User.findById(tutoringRequest.estudiante_id)

    const nuevaTutoria = await Tutoring.create({
      solicitud_origen_id: tutoringRequest._id,
      profesor_id: tutoringRequest.profesor_id,
      materia_id: tutoringRequest.materia_id,
      tema_id: tutoringRequest.tema_id || tutoringRequest.materia_id,
      fecha: horarioData?.fecha || new Date(),
      hora_inicio: horarioData?.hora_inicio || '08:00 AM',
      hora_fin: horarioData?.hora_fin || '10:00 AM',
      modalidad: modalidad || 'presencial',
      enlace_reunion: link_videollamada || null,
      tipo: tipo_tutoria || 'individual',
      capacidad_maxima: cupo_maximo || 1,
      publicada: true,
      estado: 'programada',
      asistencia_profesor: { presente: null, hora_registro: null },
      estudiantes: [
        {
          estudiante_id: tutoringRequest.estudiante_id,
          carrera_id: estudiante?.perfil_estudiante?.carrera_id || tutoringRequest.materia_id,
          semestre: estudiante?.perfil_estudiante?.semestre_actual || 1,
          fecha_inscripcion: new Date(),
          asistencia: { presente: null, hora_registro: null },
        },
      ],
      fecha_creacion: new Date(),
    } as any)

    res.status(200).json({
      message: 'Solicitud aceptada y tutoría creada exitosamente',
      solicitud: tutoringRequest,
      tutoria: nuevaTutoria,
    })
  } catch (error) {
    console.error('Error al aceptar la solicitud de tutoría:', error)
    res.status(500).json({ error: 'Error interno al aceptar la solicitud de tutoría' })
  }
}