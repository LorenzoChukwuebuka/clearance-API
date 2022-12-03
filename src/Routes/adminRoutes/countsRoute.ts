import express, { Router } from 'express'

const router = express.Router()

import controller from '../../Controller/Admin/counts'
import controllers from '../../Controller/Admin/approveFees'


router.get('/totalAdmins', controller.getAdmins)
router.get('/totalDepts', controller.getDepts)
router.get('/totalStudents', controller.getStudents)
router.get('/pendingschoolfees', controller.pendingSchFees)


/**
 * view and approve the forms submitted by the studens
 */

router.get('/getpendingSchFees', controllers.getAllPendingSchFees)
router.get('/getApprovedSchFees', controllers.getAllApprovedSchFees)
router.get('/getapproveddeptdues', controllers.getAllApprovedDeptdues)
router.put('/approvedeptdues/:id', controllers.approveDeptDues)
router.put('/approveSchFees/:id', controllers.approveSchFees)
router.get('/pendingform', controllers.getpendingform)
router.put('/approvependingform/:id', controllers.approveform)
router.get('/getpendingdeptdues', controllers.getAllPendingDeptDues)
router.get('/getpendinglibrarydues', controllers.getPendinglibrary)
router.get('/getpendingmedicaldues', controllers.getPendingMedical)
router.get('/getapprovedlibrarydue', controllers.getApprovedlibrary)
router.get('/getapprovedmedicaldues', controllers.getApprovedMedical)
router.put('/approvelibrary/:id', controllers.approveLibrary)
router.put('/approvemedical/:id', controllers.approveMedical)
router.post('/deanclearance',controllers.deansClearance)

export = router
