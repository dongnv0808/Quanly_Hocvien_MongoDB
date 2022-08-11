import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import { routes } from "./src/routes/routes";
import session from "express-session";
import passport from "passport";

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
app.use(session({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('views', './src/views');
app.set('view engine', 'ejs')
app.use(fileUpload({
    createParentPath: true
}))
app.use(express.static('public'))
app.use("", routes);
app.listen(PORT, () => {
    console.log(`Running http://localhost:${PORT}`);
})