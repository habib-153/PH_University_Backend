/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { OfferedCourse } from '../OfferedCourse/OfferedCourse.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import { Student } from '../student/student.model';
import EnrolledCourse from './enrolledCourse.model';
import { Course } from '../Course/course.model';
import mongoose from 'mongoose';
import { SemesterRegistration } from '../semesterRegestration/semesterRegistration.model';

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  /**
   * Step-1: Check if the offered course is exists
   * Step-2: Check if the student is already enrolled in the course
   * step-3: Check if the max limit exceed
   * Step-3: Create a new enrolled course
   */

  const { offeredCourse } = payload;

  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);
  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found !');
  }

  if (isOfferedCourseExists.maxCapacity <= 0) {
    throw new AppError(httpStatus.BAD_GATEWAY, 'Room is full !');
  }

  const student = await Student.findOne({ id: userId }, { _id: 1 });
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found !');
  }

  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    student: student._id,
    offeredCourse,
    semesterRegistration: isOfferedCourseExists?.semesterRegistration,
  });
  if (isStudentAlreadyEnrolled) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Student is already enrolled in the course !',
    );
  }

  // check total credits of exceeds maxCredits
  const course = await Course.findById(isOfferedCourseExists.course)
  const currentCredits = course?.credits

  const semesterRegistration = await SemesterRegistration.findById(isOfferedCourseExists.semesterRegistration).select('maxCredit')
  const maxCredit = semesterRegistration?.maxCredit

  const enrolledCourses = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExists.semesterRegistration,
        student: student._id
      }
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'enrolledCourseData',
      },
    },
    {
      $unwind: '$enrolledCourseData',
    },
    {
      $group: {
        _id: null,
        totalEnrolledCredits: { $sum: '$enrolledCourseData.credits' },
      },
    },
    {
      $project: {
        _id: 0,
        totalEnrolledCredits: 1,
      },
    },
  ])

  const totalCredits = enrolledCourses.length > 0 ? enrolledCourses[0].totalEnrolledCredits : 0

  if (totalCredits && maxCredit && totalCredits + currentCredits > maxCredit){
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You have exceeded maximum number of credits !',
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const result = await EnrolledCourse.create(
      [
        {
          semesterRegistration: isOfferedCourseExists.semesterRegistration,
          academicSemester: isOfferedCourseExists.academicSemester,
          academicFaculty: isOfferedCourseExists.academicFaculty,
          academicDepartment: isOfferedCourseExists.academicDepartment,
          offeredCourse: offeredCourse,
          course: isOfferedCourseExists.course,
          student: student._id,
          faculty: isOfferedCourseExists.faculty,
          isEnrolled: true,
        },
      ],
      { session },
    );

    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to enroll in this course !',
      );
    }

    const maxCapacity = isOfferedCourseExists.maxCapacity;
    await OfferedCourse.findByIdAndUpdate(offeredCourse, {
      maxCapacity: maxCapacity - 1,
    });

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const EnrolledCourseService = {
  createEnrolledCourseIntoDB,
};