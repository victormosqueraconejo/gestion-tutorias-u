import assert from 'node:assert/strict'
import test from 'node:test'
import { Types } from 'mongoose'
import Career from '../src/models/career.model'
import School from '../src/models/school.model'
import Subject from '../src/models/subject.model'
import { validateSubjectRelation } from '../src/services/academic-integrity.service'

const asLookup = <T>(value: T) => ({
  select: async () => value,
})

test('materias requieren carrera_id', () => {
  assert.equal(Subject.schema.path('carrera_id').isRequired, true)
  assert.equal(Subject.schema.path('escuela_id').isRequired, true)
})

test('valida una relacion escuela-carrera existente', async () => {
  const schoolId = new Types.ObjectId().toString()
  const careerId = new Types.ObjectId().toString()
  const originalSchoolFindById = School.findById
  const originalCareerFindById = Career.findById

  School.findById = (() => asLookup({ _id: schoolId })) as typeof School.findById
  Career.findById = (() => asLookup({ escuela_id: schoolId })) as typeof Career.findById

  try {
    await validateSubjectRelation({ escuela_id: schoolId, carrera_id: careerId })
  } finally {
    School.findById = originalSchoolFindById
    Career.findById = originalCareerFindById
  }
})

test('rechaza una carrera asociada a otra escuela', async () => {
  const schoolId = new Types.ObjectId().toString()
  const careerId = new Types.ObjectId().toString()
  const otherSchoolId = new Types.ObjectId().toString()
  const originalSchoolFindById = School.findById
  const originalCareerFindById = Career.findById

  School.findById = (() => asLookup({ _id: schoolId })) as typeof School.findById
  Career.findById = (() => asLookup({ escuela_id: otherSchoolId })) as typeof Career.findById

  try {
    await assert.rejects(
      validateSubjectRelation({ escuela_id: schoolId, carrera_id: careerId }),
      (error: unknown) => error instanceof Error && error.message.includes('no pertenece'),
    )
  } finally {
    School.findById = originalSchoolFindById
    Career.findById = originalCareerFindById
  }
})
