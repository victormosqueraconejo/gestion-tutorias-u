import { model, Schema, type Document, Types } from 'mongoose'

export interface IResource extends Document {
  tema_id: Types.ObjectId
  tipo: string
  titulo: string
  url: string
  agregado_por: Types.ObjectId
  validado: boolean
  fecha_creacion: Date
}

const ResourceSchema = new Schema<IResource>(
  {
    tema_id: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
    tipo: { type: String, required: true },
    titulo: { type: String, required: true },
    url: { type: String, required: true },
    agregado_por: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    validado: { type: Boolean, required: true, default: true },
    fecha_creacion: { type: Date, required: true, default: Date.now },
  },
  { collection: 'recursos', timestamps: true }
)

export default model<IResource>('Resource', ResourceSchema)