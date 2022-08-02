import express from 'express'

const router = express.Router()

import controller  from '../../Controller/Admin/clearanceController'

router.get('/getAllStudents', controller.getAllStudents)

export = router