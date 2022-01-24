import express from 'express'

const router = express.Router()
import controller from '../Controller/AuthController'

router.post('/adminlog', controller.adminlogin)
router.post('/adminreg', controller.createAdmin1)

export = router
