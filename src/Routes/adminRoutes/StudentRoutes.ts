import express from 'express'

const router = express.Router()

import controller from '../../Controller/Admin/StudentController'

router.post('/student', controller.createStudent)
router.put('/student/:Id', controller.updateStudent)
router.get('/student', controller.fetchStudents)
router.delete('/student/:Id', controller.delStudent)

export = router
