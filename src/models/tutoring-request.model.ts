import { Schema, model, type Document, Types } from 'mongoose'

export interface ITutoringRequest extends Document {
  profesor_id: Types.ObjectId
  estudiante_id: Types.ObjectId
  materia_id: Types.ObjectId
  horario_id: Types.ObjectId
  tema_id?: Types.ObjectId
  estado: string
  modalidad?: string
  tipo_tutoria?: string
  cupo_maximo?: number
  lugar_encuentro?: string
  link_videollamada?: string
  notas?: string
}

const tutoringRequestSchema = new Schema<ITutoringRequest>(
  {
    profesor_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    estudiante_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    materia_id: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    horario_id: { type: Schema.Types.ObjectId, ref: 'AvailableSchedule', required: true },
    tema_id: { type: Schema.Types.ObjectId, ref: 'Topic' },
    estado: {
      type: String,
      enum: ['pendiente', 'aceptada', 'aplazada', 'cancelada'],
      default: 'pendiente',
    },
    modalidad: { type: String, default: 'presencial' },
    tipo_tutoria: { type: String, default: 'individual' },
    cupo_maximo: { type: Number, default: 1 },
    lugar_encuentro: { type: String },
    link_videollamada: { type: String },
    notas: { type: String },
  },
  { timestamps: true }
)

export default model<ITutoringRequest>('TutoringRequest', tutoringRequestSchema)