import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentJoiSchema from './student.validation.joi';
import {z} from 'zod'
import studentZodSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const studentData = req.body.student;
    // zod
    const zodParsedData = studentZodSchema.parse(studentData)
    const result = await StudentServices.createStudentIntoDb(zodParsedData)
    // creating a schema validation using joi
    
    // const {error, value} = studentJoiSchema.validate(studentData)
    // const result = await StudentServices.createStudentIntoDb(studentData);

    // if (error){
    //   res.status(500).json({
    //     success: false,
    //     message: "Failed",
    //     error: error.details
    //   })
    // }
    //console.log(result, "res")
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    console.log(result, 'res');
    res.status(200).json({
      success: true,
      message: 'Students is retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student is retrieved succesfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
