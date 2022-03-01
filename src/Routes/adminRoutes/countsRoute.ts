import express from 'express'

const router = express.Router()

import controller from '../../Controller/Admin/counts'

router.get('/totalAdmins', controller.getAdmins)
router.get('/totalDepts', controller.getDepts)
router.get('/totalStudents', controller.getStudents)

export = router
