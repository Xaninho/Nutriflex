import {Schema, model, models} from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema ({
    email: {type: String, required: true, unique: true },
    password: {
        type: String,
        required: true,
        validate: (pass : any) => { 
            if (!pass?.length || pass?.length < 5) {
                new Error('password must be at least 5 characters.')
                return false;
            }
            return pass;
        }
    }
}, {timestamps: true});

/*UserSchema.pre('save', (next, ...rest) => {
    console.log(rest);
    next();
})*/

UserSchema.post('validate', function (user) {
    const notHashedPassword = user.password;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(notHashedPassword, salt);
    user.password = hashedPassword;
});

export const User = models?.User || model('User', UserSchema);