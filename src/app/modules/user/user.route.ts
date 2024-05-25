import express from 'express'
import { UserControllers } from './user.controller'
import validateRequest from '../../middlewares/validateRequest'
import { studentValidationSchema } from '../student/student.validation'

const router = express.Router()

router.post('/create-student', validateRequest(studentValidationSchema),UserControllers.createStudent)

export const userRoutes = router