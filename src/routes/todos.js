const router = require('express').Router()
const {
    createTodo, 
    getAllTodo,
    getTodoById,
    updateTodo,
    deleteTodo
} = require('../controllers/todos')

router.post('/', createTodo)
router.get('/', getAllTodo)
router.get('/:id', getTodoById)
router.patch('/:id', updateTodo)
router.delete('/:id', deleteTodo)

module.exports = router