import express from 'express';
import { AcademicSemesterControllers } from './academicSemeter.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-academic-semester',
  auth('admin'),
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

router.get('/', AcademicSemesterControllers.getAllAcademicServices)
router.get('/:semesterId', AcademicSemesterControllers.getSingleAcademicSemester)
router.patch('/semesterId', auth('admin', 'faculty'), validateRequest(AcademicSemesterValidations.updateAcademicSemesterValidationSchema),AcademicSemesterControllers.updateAcademicSemester)

export const AcademicSemesterRoutes = router;
