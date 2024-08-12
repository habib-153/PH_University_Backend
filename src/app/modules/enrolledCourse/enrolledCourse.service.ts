import { TEnrolledCourse } from "./enrolledCourse.interface"

const createEnrolledCourseIntoDB = async(userId: string, payload: TEnrolledCourse) => {
    /**
     * Step-1: Check if the offered course is exists
     * Step-2: Check if the student is already enrolled in the course
     * Step-3: Create a new enrolled course
     */
}

export const EnrolledCourseService = {
    createEnrolledCourseIntoDB
}