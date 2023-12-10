import express from 'express';
import { studentController } from './student.controller';

const router = express.Router();

//will call controller
router.get('/', studentController.getAllStudents);
router.get('/:studentID', studentController.getSingleStudents);
router.delete('/:studentID', studentController.deleteStudents);

export const StudentRoutes = router;
