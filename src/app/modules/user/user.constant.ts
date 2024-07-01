export const USER_ROLE = {
    student: 'student',
    faculty: 'faculty',
    admin: 'admin'
} as const

export type TUserRole = keyof typeof USER_ROLE

export const USER_STATUS = ['in-progress', 'blocked']