import mongoose, { Model, Document, Schema } from 'mongoose';
import { IUser } from './user.model';
import { IComment } from './comment.model';

export interface IPost {
    description: string;
    user: IUser;
    imageUrl?: string;
    likes?: string[];
    comment?: IComment[];
}

export interface IPostDocument extends IPost, Document {
    createdAt: Date;
    updatedAt: Date;
}

const postSchema = new Schema<IPostDocument>({
    description: {
        type: String,
        required: true,
    },
    user: {
        userId: {
            type: String,
            required: true,
        },
        profilePhoto: {
            type: String,
            default: '',
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    imageUrl: {
        type: String,
        default:''
    },
    likes: {
        type: [String]
    },
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
}, { timestamps: true });

// Check if the model already exists before defining it
export const Post: Model<IPostDocument> = mongoose.models.Post || mongoose.model<IPostDocument>('Post', postSchema);
