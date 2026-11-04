import { model, Schema } from 'mongoose'

const SubjectSchema = new Schema(
  {
    escuela_id: { type: Schema.Types.ObjectId, ref: 'School', required: true },
    carrera_id: { type: Schema.Types.ObjectId, ref: 'Career', required: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    estado: { type: String, required: true },
  },
  { collection: 'materias' },
)

export default model('Subject', SubjectSchema)
