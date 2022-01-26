import express, { Request, Response, NextFunction } from 'express'
import multer from 'multer'
import { upload } from '../../utils'

const router = express.Router()

import controller from '../../Controller/User/uploadController'

router.post(
  '/uploadDeptDues',
  upload.array('myfile', 2),
  controller.uploadDeptDues
)

export = router
