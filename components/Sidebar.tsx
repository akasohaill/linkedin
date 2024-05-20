import Image from 'next/image'
import React from 'react'
import ProfilePhoto from './shared/ProfilePhoto'
import { getAllPosts } from '@/lib/serveractions'

const Sidebar =async ({ user }: { user: any }) => {
  const posts=await getAllPosts();

  return (
    <div className='hidden md:block w-[20%] h-fit border bordergray-300 bg-white rounded-lg'>
      <div className="flex flex-col items-center relative">
        <div className="w-full h-16 overflow-hidden">
          {
            user && (<Image
              src={'/banner.jpg'}
              alt='banner'
              width={200}
              height={200}
              className='w-full h-full rounded-t'
            />)
          }
        </div>
        <div className="my-1 absolute top-10 left-[40%]">
          <ProfilePhoto src={user ? user?.imageUrl : "/banner.jpg"} />
        </div>
        <div className="border-b border-b-gray-300">
          <div className="p-2 mt-5 text-center">
            <h1 className='font-bold hover:underline cursor-pointer'>{
              user ? `${user?.firstName}${user?.lastName}` : "akaSohaill"
            }</h1>
            <p className='text-xs'>@{user ? `${user?.username}` : 'username'}</p>
          </div>
        </div>
      </div>
      <div className="text-xs">
        <div className="flex w-full justify-between items-center px-3 py-2">
          <p>Post Impression</p>
          <p className='text-blue-500 font-bold'>88</p>
        </div>
        <div className="flex w-full justify-between items-center px-3 py-2">
          <p>Posts</p>
          <p className='text-blue-500 font-bold'>{posts.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
