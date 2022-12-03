import express, { Request, Response, NextFunction } from 'express'
import multer from 'multer'

import { schoolfeesUpload, deptDuesUpload, ErrorMulterChecking, libraryUpload, medicalUpload } from '../../upload';

const router = express.Router()
const sch = schoolfeesUpload.array('myfile', 5)
const dept = deptDuesUpload.array('myfile', 5)
const library = libraryUpload.array('myfile', 5)
const medical = medicalUpload.array('myfile', 3)

import controller from '../../Controller/User/uploadController'
import __controller from '../../Controller/User/clearanceController'

router.post('/deptDues', ErrorMulterChecking(dept), controller.uploadDeptDues)
router.get('/deptDues', controller.fetchDepDues)
router.get('/deptDues/:id', controller.getfetchSingledeptdues)
//

router.post('/SchFees', ErrorMulterChecking(sch), controller.uploadSchFees)
router.get('/SchFees', controller.fetchSchoolFees)
router.get('/SchFees/:id', controller.getfetchSingleschfees)


router.post('/library_clearance', ErrorMulterChecking(library), __controller.UploadlibraryClearance)
router.get('/library_clearance/:id',__controller.getfetchSinglelibrary)
router.post('/medical_clearance', ErrorMulterChecking(medical), __controller.UploadmedicalClearance)
router.get('/medical_clearance/:id',__controller.getfetchSinglemedical)


export = router
