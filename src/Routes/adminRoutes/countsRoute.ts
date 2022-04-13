import express, { Router } from 'express'

const router = express.Router()

import controller from '../../Controller/Admin/counts'
import controllers from '../../Controller/Admin/approveFees'

router.get('/totalAdmins', controller.getAdmins)
router.get('/totalDepts', controller.getDepts)
router.get('/totalStudents', controller.getStudents)
router.get('/pendingschoolfees',controller.pendingSchFees)
router.get('/pendingdeptdues',controller.pendingDeptDues)

/**
 * view and approve the forms submitted by the studens
 */

router.get('/getpendingSchFees', controllers.getAllPendingSchFees)
router.get('/getApprovedSchFees', controllers.getAllApprovedSchFees)
router.put('/approvedSchFees/:id', controllers.approveSchFees)

export = router
