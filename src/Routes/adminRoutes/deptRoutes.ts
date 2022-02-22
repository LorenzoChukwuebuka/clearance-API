import express from 'express'

const router = express.Router()

import controller from '../../Controller/Admin/department'

router.get('/school',controller.getSchool)
router.post('/Dept',controller.addDepartment)
router.get('/Dept',controller.fetchDept)
router.put('/Dept/:id',controller.updateDept)
router.delete('/Dept/:id',controller.deleteDept)

export = router