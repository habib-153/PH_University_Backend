import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { userRoutes } from "../modules/user/user.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/acadermicSemeter.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicFacultyRoutes";
import { FacultyRoutes } from "../modules/Faculty/faculty.route";

const router = Router()

const moduleRoutes = [
    {
        path: '/users',
        route: userRoutes
    },
    {
        path: '/students',
        route: StudentRoutes
    },
    {
        path: '/academic-semesters',
        route: AcademicSemesterRoutes
    },
    {
        path: '/academic-faculties',
        route: AcademicFacultyRoutes
    },
    {
        path: '/academic-departments',
        route: AcademicDepartmentRoutes
    },
    {
        path:'/faculties',
        route: FacultyRoutes
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
