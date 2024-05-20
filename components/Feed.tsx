import React from 'react'
import Postinput from './Postinput'
import { getAllPosts } from '@/lib/serveractions'
import Posts from './Posts'

const Feed = async ({ user }: { user: any }) => {
  const userData = JSON.parse(JSON.stringify(user))
  const posts = await getAllPosts()
  return (
    <div className='flex-1'>
      <Postinput user={userData} />
      <Posts posts={posts!} />
    </div>
  )
}

export default Feed
