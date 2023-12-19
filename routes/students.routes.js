const Router = require('express')
const router = new Router()
const studentsController = require('../controllers/students.controller')

router.get('/get_students',studentsController.getStudent)
router.post('/create_new_student', studentsController.createStudent)
router.get('/get_students_by_id/:id', studentsController.getStudentByID)
router.put('/update_student/:id',studentsController.updateStudent)
router.delete('/delete_students/:id',studentsController.deleteStudent)

module.exports = router