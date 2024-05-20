import mongoose, { Model } from 'mongoose'
import { Document } from 'mongoose'
import { IUser } from './user.model'

export interface IComment{
    textmessage:string,
    user:IUser
}
export interface ICommentDocument extends IComment,Document{
    createdAt:Date,
    updatedAt:Date
}
const commentSchema =new mongoose.Schema<ICommentDocument>({
    textmessage:{
        type:String,
        required:true
    },
    user:{
        userId:{
            type:String,
            required:true
        },
        profilePhoto:{
            type:String,
            default:''
        },
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        }
    }
},{timestamps:true})

export const Comment:Model<ICommentDocument>=mongoose.models?.Comment || mongoose.model<ICommentDocument>('Comment',commentSchema)
