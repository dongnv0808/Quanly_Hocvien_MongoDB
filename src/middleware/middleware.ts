import passpost from "passport";
import LocalStrategy from "passport-local";
import { User } from "../model/user";

passpost.serializeUser((user, done) => {
    done(null, user);
})

passpost.deserializeUser((user, done) => {
    done(null, user);
})

passpost.use('local', new LocalStrategy(async(username, password, done) => {
    const user = await User.find({
        username: username
    });
    if(!user){
        done(null, false);
    } else {
        let currentUser = user[0]
        if(currentUser.password !== password){
            done(null, false);
        } else {
            done(null, currentUser);
        }
    }
}))

export default passpost;