import { Router } from "express";
import studentController from "../controller/student-controller";

export const routes = Router();

routes.get('/student/list', studentController.getAllStudent);
routes.get('/student/create', studentController.showFormCreate);
routes.post('/student/create', studentController.createNewStudent);
routes.get('/student/update/:id', studentController.showFormUpdate);
routes.post('/student/update/:id', studentController.updateStudent);
routes.get('/student/delete/:id', studentController.deleteStudent);