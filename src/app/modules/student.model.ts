import { Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt'

import {
  Guardian,
  LocalGuardian,
  StdModel,
  TStudent,
  UserName,
} from './student/student.interface';
import { string } from 'joi';
import config from '../config';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
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

const studentSchema = new Schema<TStudent, StdModel>({
  id: { type: String, required: true, unique: true },
  password:{
    type: String,
    required:[true, 'Password is required'],
    maxlength:[20, 'Password can not be more than 20'],
  },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: ['female', 'male', 'other'],
    required: true,
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: true,
    // validate:{
    //   validator: (value: string)=> validator.isEmail(value)
    // }
  },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloogGroup: {
    type: String,
    enum: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddres: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImg: { type: String, required: true },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});

// pre save middleware / hook : will work on create() save()
studentSchema.pre('save', async function(next){
  const user = this
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))
  next()
  // console.log(this, 'pre hook: we will save the data')
})

// post save middleware
studentSchema.post('save', function(doc, next){
  doc.password = ''
  console.log(this, 'post hook: we saved the data')
  next()
})

studentSchema.statics.isUserExits = async function(id: string){
  const existingUser = await StudentModel.findOne({id})
  return existingUser
}

export const StudentModel = model<TStudent, StdModel>('Student', studentSchema);
