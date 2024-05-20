'use server'

import { Post } from "@/models/post.model";
import { IUser } from "@/models/user.model";
import { currentUser } from "@clerk/nextjs/server"
import { v2 as cloudinary } from 'cloudinary';
import connectDB from "./db";
import { revalidatePath } from "next/cache";
import { useUser } from "@clerk/nextjs";
import { Comment } from "@/models/comment.model";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// creating post using server action
export const createPostAction = async (inputText: string, selectedFile: string) => {
    await connectDB();
    const user = await currentUser();
    if (!user) throw new Error('User not athenticated');
    if (!inputText) throw new Error('Input field is required');

    const image = selectedFile;


    const userDatabase: IUser = {
        firstName: user.firstName || "Patel",
        lastName: user.lastName || "Mern Stack",
        userId: user.id,
        profilePhoto: user.imageUrl
    }
    let uploadResponse;
    try {
        if (image) {
            //1. create post with image
            uploadResponse = await cloudinary.uploader.upload(image);
            await Post.create({
                description: inputText,
                user: userDatabase,
                imageUrl: uploadResponse?.secure_url // yha pr image url ayega from cloudinary
            })
        } else {
            //2. create post with text only
            await Post.create({
                description: inputText,
                user: userDatabase
            })
        }
        revalidatePath("/");
    } catch (error: any) {
        throw new Error(error);
    }
}

// getting post using server action
export const getAllPosts = async () => {
    await connectDB();
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate({path:"comment",options:{sort:{createdAt:-1}}})
        // console.log(posts);
        if(!posts) return [];
        return JSON.parse(JSON.stringify(posts))
    } catch (error) {
        console.log(error);
    }
}

// delete post using server action
export const deletePost = async (postId: string) => {
    await connectDB();
    const user = await currentUser();
    if (!user) throw new Error('user not authenticated');
    const post = await Post.findById(postId)
    if (!post) throw new Error('Post not found')

    if (post.user.userId !== user.id) {
        throw new Error('You are not the owner')
    }
    try {
        await Post.deleteOne({ _id: postId });
        revalidatePath("/")
    } catch (error: any) {
        throw new Error('An error occurred', error)
    }
}

// comment post using server actions
export const createCommentAction = async (postId: string, formData: FormData) => {
    try {
        const user=await currentUser();
        if(!user) throw new Error("User not authenticated");
        const inputText=formData.get('inputText') as string;
        if(!inputText) throw new Error("Input text is empty");
        if(!postId) throw new Error("Post Id is required");

        const userDatabase: IUser = {
            firstName: user.firstName || "Patel",
            lastName: user.lastName || "Mern Stack",
            userId: user.id,
            profilePhoto: user.imageUrl
        }

        const post=await Post.findById({_id:postId});
        if(!post) throw new Error("Post is not found");

        const comment=await Comment.create({
            textmessage:inputText,
            user:userDatabase
        })

        post.comment?.push(comment?._id)
        await post.save()

        revalidatePath("/")
    } catch (error) {
        throw new Error("An error occurred");
    }
}