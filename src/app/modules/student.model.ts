import { Schema, model } from 'mongoose';
import validator from 'validator';

import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student/student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: { type: String, required: true,
    trim: true,
    // validate: {
    //   validator: function(value: string){
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    //     return firstNameStr === value
    //   },
    //   message: "{Value} is not in capitalize format"
    // }
   },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    //validate:{
      // validator: (value: string)=> validator.isAlpha(value)}
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherContactNo: { type: String, required: true },
  motherOccupation: { type: String, required: true },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<Student>({
  id: { type: String,required: true, unique: true },
  name: {
    type: userNameSchema,
    required: true
  },
  gender: {
    type: String,
    enum: ['female', 'male', 'other'],
    required: true
  },
  dateOfBirth: { type: String },
  email: { type: String, required: true,
    // validate:{
    //   validator: (value: string)=> validator.isEmail(value)
    // }
   },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloogGroup: {
    type: String,
    enum: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-']
  },
  presentAddress: { type: String, required: true },
  permanentAddres: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: true
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true
  },
  profileImg: { type: String, required: true },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: "active"
  },
});

export const StudentModel = model<Student>('Student', studentSchema);
