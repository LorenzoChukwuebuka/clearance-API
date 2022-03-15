import express, { Request, Response, NextFunction } from 'express'
import multer from 'multer'
import { uploadDeptDues, uploadSchFees, ErrorMulterChecking } from '../../utils'

const router = express.Router()
const sch = uploadSchFees.array('myfile', 5)
const dept = uploadDeptDues.array('myfile', 5)

import controller from '../../Controller/User/uploadController'

router.post('/deptDues', ErrorMulterChecking(dept), controller.uploadDeptDues)
router.get('/deptDues', controller.fetchDepDues)
router.get('/deptDues/:id', controller.getfetchSingledeptdues)
//

router.post('/SchFees', ErrorMulterChecking(sch), controller.uploadSchFees)
router.get('/SchFees', controller.fetchSchoolFees)
router.get('/SchFees/:id', controller.getfetchSingleschfees)

export = router
