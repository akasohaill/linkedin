'use client'
import React, { useState } from 'react'
import ProfilePhoto from './shared/ProfilePhoto'
import { Input } from './ui/input'
import { PostDailog } from './PostDailog'

const Postinput = ({user}:{user:any}) => {
    const [open, setOpen]=useState<boolean>(false)
    const inputHandler = ()=>{
        setOpen(true)
    }

  return (
    <div className='bg-white p-4 m-2 md:m-0 border border-gray-300 rounded-lg'>
        <div className="flex items-center gap-3">
            <ProfilePhoto src={user?.imageUrl}/>
            <Input
            type='text'
            placeholder='Start a post'
            className='hover:bg-gray-300 cursor-pointer h-12 rounded-full'
            onClick={inputHandler}
            />
            <PostDailog setOpen={setOpen} open={open} src={user?.imageUrl} />
        </div>
    </div>
  )
}

export default Postinput
