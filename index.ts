import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import { routes } from "./src/routes/routes";

let PORT = 3000;
const DB_URL = 'mongodb://localhost:27017/duyDB';
const app = express();
mongoose.connect(DB_URL)
.then(() => {
    console.log('Connect success');
})
.catch(() => {
    console.log('Connect Error');
});
app.use(bodyParser.json());
app.use(express.json());
app.set('views', './src/views');
app.set('view engine', 'ejs')
app.use(fileUpload({
    createParentPath: true
}))
app.use("", routes);
app.listen(PORT, () => {
    console.log(`Running http://localhost:${PORT}`);
})