const router = require('express').Router()
const activitiesRouter = require('./activities')
const todosRouter = require('./todos')

router.use('/activity-groups', activitiesRouter)
router.use('/todo-items', todosRouter)

module.exports = router