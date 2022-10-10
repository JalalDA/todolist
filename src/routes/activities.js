const router = require('express').Router()
const {
    createActivity, 
    getAllActivity, 
    getActivityById, 
    updateActivity,
    deleteActivity
} = require('../controllers/activity')

router.post('/', createActivity)
router.get('/', getAllActivity)
router.get('/:id', getActivityById)
router.patch('/:id', updateActivity)
router.delete('/:id', deleteActivity)

module.exports = router