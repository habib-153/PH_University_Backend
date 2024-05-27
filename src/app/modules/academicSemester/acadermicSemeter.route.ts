import express from 'express';
import { AcademicSemesterControllers } from './academicSemeter.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

router.get('/', AcademicSemesterControllers.getAllAcademicServices)
router.get('/:semesterId', AcademicSemesterControllers.getSingleAcademicSemester)
router.patch('/semesterId', validateRequest(AcademicSemesterValidations.updateAcademicSemesterValidationSchema),AcademicSemesterControllers.updateAcademicSemester)

export const AcademicSemesterRoutes = router;
