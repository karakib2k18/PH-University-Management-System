import Router from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { userRoutes } from '../modules/user/user.router';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
];

moduleRoutes.forEach((singleroute) =>
  router.use(singleroute.path, singleroute.route),
);

export default router;
