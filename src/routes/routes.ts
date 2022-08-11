import { Router } from "express";
import authControntroller from "../controller/auth-controntroller";
import studentController from "../controller/student-controller";

export const routes = Router();

routes.use("/student/**", (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login')
    }
})
routes.get('/student/list', studentController.getAllStudent);
routes.get('/student/create', studentController.showFormCreate);
routes.post('/student/create', studentController.createNewStudent);
routes.get('/student/update/:id', studentController.showFormUpdate);
routes.post('/student/update/:id', studentController.updateStudent);
routes.delete('/student/:id', studentController.deleteStudent);
routes.get('/login', authControntroller.showLoginForm);
routes.post('/login', authControntroller.login);