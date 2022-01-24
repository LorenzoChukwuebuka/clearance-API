import express from 'express'

const router = express.Router()
import controller from '../../Controller/Admin/AuthController'


router.post('/adminlog', controller.adminlogin)
router.post('/adminreg', controller.createAdmin_1)

export = router
