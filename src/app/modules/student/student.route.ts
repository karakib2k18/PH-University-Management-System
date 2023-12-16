import express from 'express';
import { studentController } from './student.controller';

const router = express.Router();

//will call controller
router.get('/:studentID', studentController.getSingleStudents);

router.delete('/:studentID', studentController.deleteStudents);

router.get('/', studentController.getAllStudents);

export const StudentRoutes = router;
