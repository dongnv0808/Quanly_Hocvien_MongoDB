import { Student } from "../model/student";
import e, {Request, Response} from 'express';

class StudentController {
    getAllStudent = async(req: Request, res: Response) => {
        let students = await Student.find();
        res.render('student/list', ({
            students: students
        }))
    }

    showFormCreate = async(req: Request, res: Response) => {
        res.render('student/create');
    }
    createNewStudent = async(req: Request, res: Response) => {
        try{
            let studentNew = new Student(req.body);
            let student = studentNew.save();
            if(student){
                console.log('Create success');
                res.redirect('list');
            } else {
                console.log('Create error');
                res.redirect('student/create');
            }
        }catch(err){
            console.log(err);
        }
    }

    showFormUpdate = async(req: Request, res: Response) => {
        try{
            let id = req.params.id;
            let student = await Student.findOne({_id: id});
            if(student){
                res.render('student/update', {student: student})
            } else {
                console.log('Show error');
            }
        }catch(err){
            console.log(err);
        }
    }

    updateStudent = async(req: Request, res: Response) => {
        try{
            let id = req.params.id;
            let student = await Student.findOne({_id: id});
            student = new Student(req.body);
            // student.name = req.body.name;
            // student.sex = req.body.sex;
            // student.address = req.body.address;
            await student.save();
            if(student){
                console.log("Update success!");
                res.redirect('/student/list')
            } else {
                console.log("Update error!");
            }
        }catch(err){
            console.log(err);
        }
    }

    deleteStudent = async(req: Request, res: Response) => {
        try{
            let id = req.params.id;
            let student = await Student.findOne({_id: id});
            if(student){
                await student.remove();
                console.log('Delete success');
                res.redirect('/student/list');
            } else {
                console.log('Update error');
            }
        }catch(err){
            console.log(err)
        }
    }
}

export default new StudentController;