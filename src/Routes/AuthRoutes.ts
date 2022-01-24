import express from 'express'

const router = express.Router()
import controller from '../Controller/AuthController'

router.post('/adminlog', controller.adminlogin)
router.post('/adminreg', controller.createAdmin_1)

export = router
