import express from 'express'

const router = express.Router()

import controller from '../../Controller/Admin/StudentController'

router.post('/studentReg',controller.createStudent)
router.get('/fetchDepts',controller.fetchDepts)
router.get('/fetchStudents',controller.fetchStudents)
router.put('/updateStudent/:Id/',controller.updateStudent)

export = router
