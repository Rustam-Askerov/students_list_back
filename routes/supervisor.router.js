const Router = require('express')
const router = new Router()
const supervisorController = require('../controllers/scientific_supervisor.controller')

router.post('/create_new_supervisor', supervisorController.createSupervisor)
router.get('/get_supervisors', supervisorController.getSupervisors)
router.get('/get_supervisor_by_id/:id', supervisorController.getSupervisorsByID)
router.put('/update_supervisor/:id', supervisorController.updateSupervisor)
router.delete('/delete_supervisor/:id', supervisorController.deleteSupervisor)

module.exports = router