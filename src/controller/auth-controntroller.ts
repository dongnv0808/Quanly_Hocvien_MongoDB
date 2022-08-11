import {Request, Response, NextFunction} from "express"
import passport from "../middleware/middleware";
class AuthController{
    showLoginForm = (req: Request, res: Response) => {
        res.render('auth/login');
    }

    login = (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate("local", (err, user) => {
            if(err){
                return next(err);
            }
            if(!user){
                console.log(req.body)
                return res.send("Wrong email or password")
            }
            req.login(user, () => {
                res.send("You are authenticated")
            })
        })(req, res, next)
    }
}

export default new AuthController;