import { model, Schema, type Document, Types } from 'mongoose'

export interface IAttendance {
  presente?: boolean | null
  hora_registro?: Date | null
}

export interface IStudentAttendance {
  estudiante_id: Types.ObjectId
  carrera_id: Types.ObjectId
  semestre: number
  fecha_inscripcion: Date
  asistencia: IAttendance
}

export interface ITutoring extends Document {
  solicitud_origen_id?: Types.ObjectId | null
  profesor_id: Types.ObjectId
  materia_id: Types.ObjectId
  tema_id: Types.ObjectId
  fecha: Date
  hora_inicio: string
  hora_fin: string
  modalidad: string
  enlace_reunion?: string | null
  enlace_grabacion?: string | null
  tipo: string
  capacidad_maxima: number
  publicada: boolean
  estado: string
  asistencia_profesor: IAttendance
  estudiantes: IStudentAttendance[]
  fecha_creacion: Date
}

const AttendanceSchema = new Schema<IAttendance>(
  {
    presente: { type: Boolean, default: null },
    hora_registro: { type: Date, default: null },
  },
  { _id: false },
)

const StudentAttendanceSchema = new Schema<IStudentAttendance>(
  {
    estudiante_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    carrera_id: { type: Schema.Types.ObjectId, ref: 'Career', required: true },
    semestre: { type: Number, required: true, min: 1 },
    fecha_inscripcion: { type: Date, required: true, default: Date.now },
    asistencia: { type: AttendanceSchema, required: true, default: () => ({}) },
  },
  { _id: false },
)

const TutoringSchema = new Schema<ITutoring>(
  {
    solicitud_origen_id: {
      type: Schema.Types.ObjectId,
      ref: 'TutoringRequest',
      default: null,
    },
    profesor_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    materia_id: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    tema_id: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
    fecha: { type: Date, required: true },
    hora_inicio: { type: String, required: true },
    hora_fin: { type: String, required: true },
    modalidad: { type: String, required: true, default: 'presencial' },
    enlace_reunion: { type: String, default: null },
    enlace_grabacion: { type: String, default: null },
    tipo: { type: String, required: true, default: 'individual' },
    capacidad_maxima: { type: Number, required: true, min: 1, default: 1 },
    publicada: { type: Boolean, required: true, default: true },
    estado: { type: String, required: true, default: 'programada' },
    asistencia_profesor: { type: AttendanceSchema, required: true, default: () => ({}) },
    estudiantes: { type: [StudentAttendanceSchema], required: true, default: [] },
    fecha_creacion: { type: Date, required: true, default: Date.now },
  },
  { collection: 'tutorias', timestamps: true },
)

export default model<ITutoring>('Tutoring', TutoringSchema)