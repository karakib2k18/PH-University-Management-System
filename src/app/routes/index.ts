import Router from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.router';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';

const router = Router();

// const moduleRoutes = [
//   {
//     path: '/users',
//     route: userRoutes,
//   },
//   {
//     path: '/students',
//     route: StudentRoutes,
//   },
//   {
//     path: '/academic-semester',
//     route: AcademicSemesterRoutes,
//   },
// ];

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  // {
  //   path: '/faculties',
  //   route: FacultyRoutes,
  // },
  // {
  //   path: '/admins',
  //   route: AdminRoutes,
  // },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  // {
  //   path: '/academic-departments',
  //   route: AcademicDepartmentRoutes,
  // },
  // {
  //   path: '/courses',
  //   route: CourseRoutes,
  // },
];

moduleRoutes.forEach((singleroute) =>
  router.use(singleroute.path, singleroute.route),
);

export default router;
