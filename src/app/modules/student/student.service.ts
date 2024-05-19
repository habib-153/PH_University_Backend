import { StudentModel } from '../student.model';
import { Student } from './student.interface';

const createStudentIntoDb = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  //console.log(result)
  return result;
};
export const StudentServices = {
  createStudentIntoDb,
  getAllStudentsFromDB,
  getSingleStudentFromDB
};
