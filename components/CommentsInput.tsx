'use client'

import { useUser } from '@clerk/nextjs'
import React from 'react'
import ProfilePhoto from './shared/ProfilePhoto'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { createCommentAction } from '@/lib/serveractions'

const CommentsInput = ({postId}:{postId:string}) => {
    const {user}=useUser();
    const commentActionHandler= async (formData:FormData)=>{
        try {
        if(!user) throw new Error("User is not authenticated");
        await createCommentAction(postId,formData)
        } catch (error:any) {
            throw new Error('An error occurred')
            
        }
        
    }
  return (
    <form action={(formData)=>commentActionHandler(formData)}>
        <div className="flex items-center gap-2">
            <ProfilePhoto src={user?.imageUrl!}/>
            <Input
            type='text' 
            name='inputText'
            placeholder='Comment whatever you want'
            className='rounded-full'
            />
            <Button className='rounded-full' type='submit' variant={'outline'}>
                Send
            </Button>
        </div>
    </form>
  )
}

export default CommentsInput
