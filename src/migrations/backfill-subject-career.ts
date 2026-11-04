import 'dotenv/config'
import mongoose from 'mongoose'
import Career from '../models/career.model'
import Subject from '../models/subject.model'

const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/gestion_tutorias'

type UnresolvedSubject = {
  id: string
  escuela_id: string
  reason: string
}

const migrate = async () => {
  await mongoose.connect(MONGO_URI)

  const unresolved: UnresolvedSubject[] = []
  const subjects = await Subject.find({
    $or: [{ carrera_id: { $exists: false } }, { carrera_id: null }],
  }).select('_id escuela_id')

  for (const subject of subjects) {
    const careers = await Career.find({ escuela_id: subject.escuela_id }).select('_id')
    if (careers.length !== 1) {
      unresolved.push({
        id: String(subject._id),
        escuela_id: String(subject.escuela_id),
        reason: careers.length === 0
          ? 'No existe una carrera para la escuela'
          : 'Existen varias carreras para la escuela',
      })
      continue
    }

    const career = careers[0]
    if (!career) {
      continue
    }

    await Subject.updateOne(
      { _id: subject._id, $or: [{ carrera_id: { $exists: false } }, { carrera_id: null }] },
      { $set: { carrera_id: career._id } },
    )
  }

  console.log(JSON.stringify({
    processed: subjects.length,
    assigned: subjects.length - unresolved.length,
    unresolved,
  }, null, 2))
}

migrate()
  .catch((error: unknown) => {
    console.error('Error al migrar carrera_id en materias:', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await mongoose.disconnect()
  })
