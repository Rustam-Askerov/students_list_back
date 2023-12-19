const Router = require('express')
const router = new Router()
const departmentsController = require('../controllers/departments.controller')

router.get('/get_departments',departmentsController.getDepartments)
router.get('/get_department_by_id',departmentsController.getDepartmentByID)

module.exports = router