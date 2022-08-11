import { Student } from "../model/student";
import e, {Request, Response} from 'express';
import fileUpload, { UploadedFile } from "express-fileupload";

class StudentController {
    getAllStudent = async(req: Request, res: Response) => {
        try{
            let students = await Student.find();
            res.render('student/list', ({
                students: students,
            }))
        }catch(err){
            console.log('err:' +err );
        }
    }

    showFormCreate = async(req: Request, res: Response) => {
        res.render('student/create');
    }
    createNewStudent = async(req: Request, res: Response) => {
        let files = req.files;
        console.log(files)
        if(files){
            if(files.avatar){
                let studentNew = req.body;
                let avatar = files.avatar as UploadedFile;
                avatar.mv("./public/storage/" + avatar.name);
                studentNew.avatar = ("/storage/" + avatar.name);
                studentNew = new Student(studentNew);
                await studentNew.save();
                res.redirect(301, "/student/list");
            }
        }else {
            res.render("error");
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
            // let student = await Student.findOne({_id: id});
            // student = new Student(req.body);
            // const student = await Student.updateOne(req.body);
            // student.name = req.body.name;
            // student.sex = req.body.sex;
            // student.address = req.body.address;
            // await student.save();

            let student = await Student.findById({_id: id});
            if(student){
                let files = req.files;
                if(files){
                    let newStudent = req.body;
                    if(files.avatar){
                        let avatar = files.avatar as UploadedFile;
                        avatar.mv("./public/storage/" + avatar.name);
                        newStudent.avatar = "/storage/" +avatar.name;
                    }
                    await Student.findOneAndUpdate({
                        _id: id
                    }, newStudent);
                    res.redirect(301, '/student/list')
                }
            } else {
                console.log("Update error!");
            }
        }catch(err){
            res.render("error")
        }
    }

    deleteStudent = async(req: Request, res: Response) => {
        try{
            let id = req.params.id;
            let student = await Student.findOne({_id: id});
            if(student){
                await student.remove();
                console.log('Delete success');
                res.status(204).json();
            } else {
                console.log('Update error');
                res.status(404).json({
                    message: "NOT FOUND"
                });
            }
        }catch(err){
            console.log(err)
        }
    }
}

export default new StudentController;