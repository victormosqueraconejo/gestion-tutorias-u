import { Router, type RequestHandler } from 'express'
import {
  createAcademicReport,
  deleteAcademicReport,
  getAcademicReportById,
  listAcademicReports,
  updateAcademicReport,
} from '../controllers/academic-report.controller'
import {
  createAvailableSchedule,
  deleteAvailableSchedule,
  getAvailableScheduleById,
  listAvailableSchedules,
  updateAvailableSchedule,
} from '../controllers/available-schedule.controller'
import {
  createCareer,
  deleteCareer,
  getCareerById,
  listCareers,
  updateCareer,
} from '../controllers/career.controller'
import {
  createResource,
  deleteResource,
  getResourceById,
  listResources,
  updateResource,
} from '../controllers/resource.controller'
import {
  createSchool,
  deleteSchool,
  getSchoolById,
  listSchools,
  updateSchool,
} from '../controllers/school.controller'
import {
  createSubject,
  deleteSubject,
  getSubjectById,
  listSubjects,
  updateSubject,
} from '../controllers/subject.controller'
import {
  createTopic,
  deleteTopic,
  getTopicById,
  listTopics,
  updateTopic,
} from '../controllers/topic.controller'
import {
  acceptTutoringRequest,
  createTutoringRequest,
  deleteTutoringRequest,
  getTutoringRequestById,
  listTutoringRequests,
  updateTutoringRequest,
} from '../controllers/tutoring-request.controller'
import {
  createTutoring,
  deleteTutoring,
  getTutoringById,
  listTutorings,
  updateTutoring,
} from '../controllers/tutoring.controller'
import {
  createUser,
  deleteUser,
  getUserById,
  listUsers,
  updateUser,
} from '../controllers/user.controller'
import { login } from '../controllers/auth.controller'

const router = Router()

router.post('/login', login)

const registerCrudRoutes = (
  path: string,
  handlers: {
    list: RequestHandler
    getById: RequestHandler
    create: RequestHandler
    update: RequestHandler
    remove: RequestHandler
  },
) => {
  router.get(path, handlers.list)
  router.get(`${path}/:id`, handlers.getById)
  router.post(path, handlers.create)
  router.put(`${path}/:id`, handlers.update)
  router.delete(`${path}/:id`, handlers.remove)
}

registerCrudRoutes('/usuarios', {
  list: listUsers,
  getById: getUserById,
  create: createUser,
  update: updateUser,
  remove: deleteUser,
})

registerCrudRoutes('/escuelas', {
  list: listSchools,
  getById: getSchoolById,
  create: createSchool,
  update: updateSchool,
  remove: deleteSchool,
})

registerCrudRoutes('/carreras', {
  list: listCareers,
  getById: getCareerById,
  create: createCareer,
  update: updateCareer,
  remove: deleteCareer,
})

registerCrudRoutes('/materias', {
  list: listSubjects,
  getById: getSubjectById,
  create: createSubject,
  update: updateSubject,
  remove: deleteSubject,
})

registerCrudRoutes('/temas', {
  list: listTopics,
  getById: getTopicById,
  create: createTopic,
  update: updateTopic,
  remove: deleteTopic,
})

registerCrudRoutes('/recursos', {
  list: listResources,
  getById: getResourceById,
  create: createResource,
  update: updateResource,
  remove: deleteResource,
})

registerCrudRoutes('/horarios-disponibles', {
  list: listAvailableSchedules,
  getById: getAvailableScheduleById,
  create: createAvailableSchedule,
  update: updateAvailableSchedule,
  remove: deleteAvailableSchedule,
})

registerCrudRoutes('/solicitudes-tutoria', {
  list: listTutoringRequests,
  getById: getTutoringRequestById,
  create: createTutoringRequest,
  update: updateTutoringRequest,
  remove: deleteTutoringRequest,
})

router.put('/solicitudes-tutoria/:id/aceptar', acceptTutoringRequest)

registerCrudRoutes('/tutorias', {
  list: listTutorings,
  getById: getTutoringById,
  create: createTutoring,
  update: updateTutoring,
  remove: deleteTutoring,
})

registerCrudRoutes('/reportes-academicos', {
  list: listAcademicReports,
  getById: getAcademicReportById,
  create: createAcademicReport,
  update: updateAcademicReport,
  remove: deleteAcademicReport,
})

export default router