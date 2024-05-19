import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    //console.log(req.body)
    const studentData = req.body.student;
    //console.log(studentData, "data")
    const result = await StudentServices.createStudentIntoDb(studentData);
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

const getAllStudents = async(req: Request, res: Response)=>{
  try{
    const result = await StudentServices.getAllStudentsFromDB()
    console.log(result, "res")
    res.status(200).json({
      success: true,
      message: 'Students is retrieved successfully',
      data: result,
    });
  }catch(err){
    console.log(err)
  }
}

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
  createStudent, getAllStudents, getSingleStudent
};
