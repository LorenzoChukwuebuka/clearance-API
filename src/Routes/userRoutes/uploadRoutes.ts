import express from 'express'

const router = express.Router()

import controller from '../../Controller/User/uploadController'

router.post('/uploadDeptDues', controller.uploadDeptDues)

export = router
