import express from 'express'

const router = express.Router()
import controller from '../../Controller/Admin/AuthController'

router.post('/adminlog', controller.adminlogin)
router.post('/admin', controller.createAdmin)
router.post('/studentlog', controller.studentLogin)
router.get('/admin', controller.fetchAdmin)
router.put('/admin/:id', controller.updateAdmin)
router.delete('/admin/:id', controller.deleteAdmin)

export = router
