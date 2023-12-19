const Router = require('express')
const router = new Router()
const worksController = require('../controllers/works.controller')

router.get('/get_works',worksController.getWorks)
router.get('/get_work_by_id/:id',worksController.getWorkByID)
router.put('/update_work/:id',worksController.updateWork)
router.post('/create_work',worksController.createWork)
router.delete('/delete_work/:id',worksController.deleteWork)

module.exports = router