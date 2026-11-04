import Topic from '../models/topic.model'
import { createCrudController } from './crud.controller'
import { ensureTopicHasNoDependencies } from '../services/academic-integrity.service'

export const {
  list: listTopics,
  getById: getTopicById,
  create: createTopic,
  update: updateTopic,
  remove: deleteTopic,
} = createCrudController(Topic, 'tema', {
  beforeRemove: ensureTopicHasNoDependencies,
})
