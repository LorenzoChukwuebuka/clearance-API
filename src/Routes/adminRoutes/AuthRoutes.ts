import express from 'express'

const router = express.Router()
import controller from '../../Controller/Admin/AuthController'


router.post('/adminlog', controller.adminlogin)
router.post('/adminreg', controller.createAdmin)
router.post('/studentlog',controller.studentLogin)

export = router
