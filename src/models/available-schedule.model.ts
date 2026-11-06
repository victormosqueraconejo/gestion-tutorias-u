import { model, Schema } from 'mongoose'

const AvailableScheduleSchema = new Schema(
  {
    profesor_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    materia_id: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    fecha: { type: Date, required: true },
    hora_inicio: { type: String, required: true },
    hora_fin: { type: String, required: true },
    dia: { type: String, required: true }, 
    modalidad_permitida: { type: String, required: true },
    estado: { type: String, required: true },
  },
  { collection: 'horarios_disponibles' },
)

export default model('AvailableSchedule', AvailableScheduleSchema)
