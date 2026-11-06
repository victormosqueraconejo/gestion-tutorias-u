import { model, Schema, type Document, Types } from 'mongoose'

export interface IStudentProfile {
  carrera_id?: Types.ObjectId
  semestre_actual?: number
  materias_interes?: Types.ObjectId[]
}

export interface ITeacherProfile {
  materias?: Types.ObjectId[]
}

export interface IAdministratorProfile {
  nivel_acceso?: string
}

export interface IAcademicAdministratorProfile {
  escuelas_a_cargo?: Types.ObjectId[]
}

export interface IUser extends Document {
  nombre: string
  correo: string
  contrasena_hash: string
  rol: string
  escuela_id?: Types.ObjectId | null
  estado: string
  fecha_registro: Date
  perfil_estudiante?: IStudentProfile
  perfil_profesor?: ITeacherProfile
  perfil_administrador?: IAdministratorProfile
  perfil_administrador_academico?: IAcademicAdministratorProfile
}

const StudentProfileSchema = new Schema<IStudentProfile>(
  {
    carrera_id: { type: Schema.Types.ObjectId, ref: 'Career' },
    semestre_actual: { type: Number, min: 1 },
    materias_interes: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
  },
  { _id: false },
)

const TeacherProfileSchema = new Schema<ITeacherProfile>(
  {
    materias: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
  },
  { _id: false },
)

const AdministratorProfileSchema = new Schema<IAdministratorProfile>(
  {
    nivel_acceso: { type: String },
  },
  { _id: false },
)

const AcademicAdministratorProfileSchema = new Schema<IAcademicAdministratorProfile>(
  {
    escuelas_a_cargo: [{ type: Schema.Types.ObjectId, ref: 'School' }],
  },
  { _id: false },
)

const UserSchema = new Schema<IUser>(
  {
    nombre: { type: String, required: true },
    correo: { type: String, required: true },
    contrasena_hash: { type: String, required: true },
    rol: { type: String, required: true },
    escuela_id: { type: Schema.Types.ObjectId, ref: 'School', default: null },
    estado: { type: String, required: true },
    fecha_registro: { type: Date, required: true },
    perfil_estudiante: { type: StudentProfileSchema },
    perfil_profesor: { type: TeacherProfileSchema },
    perfil_administrador: { type: AdministratorProfileSchema },
    perfil_administrador_academico: {
      type: AcademicAdministratorProfileSchema,
    },
  },
  { collection: 'usuarios' },
)

export default model<IUser>('User', UserSchema)