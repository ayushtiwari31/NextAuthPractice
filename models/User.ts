import mongoose,{Schema,Document} from "mongoose";
import bcrypt from "bcrypt"


export interface IUser extends Document {
    fullname:string,
    email: string;
    isVerified:boolean,
    password?: string; // Optional if excluded in API responses
    verifyCode?:string,
    verifyCodeExpiry?:string,
    readonly _id: mongoose.Types.ObjectId;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}

const userSchema=new Schema<IUser>({
    fullname:{
        type:String,
        required:[true,"FullName is required"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Invalid email address"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verifyCode:{
        type:String,
    },
    verifyCodeExpiry:{
        type:Date
    }
    
})


const UserModel=mongoose.models?.UserModel||mongoose.model<IUser>("UserModel",userSchema);
export default UserModel