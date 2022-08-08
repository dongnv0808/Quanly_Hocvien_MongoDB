import { model, Schema } from "mongoose";

interface IStudent {
    id: string;
    name: string;
    sex: string;
    address: string
};

const studentSchema = new Schema<IStudent>({
    id: String,
    name: String,
    sex: String,
    address: String
});

const Student = model<IStudent>('Student', studentSchema);

export {Student};