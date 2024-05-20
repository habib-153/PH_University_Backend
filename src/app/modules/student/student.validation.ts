import exp from 'constants';
import { z } from 'zod';

const userNameZodSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
});

const guardianZodSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherContactNo: z.string(),
  motherOccupation: z.string(),
});

const localGuardianZodSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

const studentZodSchema = z.object({
  id: z.string(),
  name: userNameZodSchema,
  gender: z.enum(['female', 'male', 'other']),
  dateOfBirth: z.string().optional(),
  email: z.string().email(),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloogGroup: z.enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-']).optional(),
  presentAddress: z.string(),
  permanentAddres: z.string(),
  guardian: guardianZodSchema,
  localGuardian: localGuardianZodSchema,
  profileImg: z.string(),
  isActive: z.enum(['active', 'blocked']).default('active'),
});

export default studentZodSchema