import mongoose from 'mongoose';
import { Student } from './student.model';
import { error } from 'console';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({id})
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const updateStudentIntoDB = async(id: string, payload: Partial<TStudent>) =>{
  const {name, guardian, localGuardian, ...remainingStudentData} = payload

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingStudentData
  }

  if (name && Object.keys(name).length){
    for (const [key, value] of Object.entries(name)){
      modifiedUpdateData[`name.${key}`] = value
    }
  }

  if (guardian && Object.keys(guardian).length){
    for (const [key, value] of Object.entries(guardian)){
      modifiedUpdateData[`guardian.${key}`] = value
    }
  }

  if (localGuardian && Object.keys(localGuardian).length){
    for (const [key, value] of Object.entries(localGuardian)){
      modifiedUpdateData[`localGuardian.${key}`] = value
    }
  }

  const result = await Student.findOneAndUpdate({id}, modifiedUpdateData, {
    new: true,
    runValidators: true
  })

  return result
}

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deleteStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if(!deleteStudent){
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
    }

    const deletedUser =  await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if(!deletedUser){
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user')
    }

    await session.commitTransaction()
    await session.endSession()
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error('Failed to delete Student')
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
