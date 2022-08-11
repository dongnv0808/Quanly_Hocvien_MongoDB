import { model, Schema } from "mongoose";

interface IStudent {
    name: string;
    sex: string;
    address: string;
    avatar: string;
};

const studentSchema = new Schema<IStudent>({
    name: String,
    sex: String,
    address: String,
    avatar: String
});

const Student = model<IStudent>('Student', studentSchema);

export {Student};