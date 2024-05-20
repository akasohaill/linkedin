import React, { useState } from 'react'
import { Button } from './ui/button'
import { MessageCircleMore, Repeat, Send, ThumbsUp } from 'lucide-react'
import { IPostDocument } from '@/models/post.model'
import { useUser } from '@clerk/nextjs'
import CommentsInput from './CommentsInput'
import Comments from './Comments'

const SocialOptions = ({ post }: { post: IPostDocument }) => {

  const { user } = useUser();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [commentOpen, setCommentOpen] = useState(false);

  const likeOrDislikeHandler = async () => {
    if (!user) throw new Error(' User not athenticated');
    const tempLiked = liked;
    const tempLikes = likes;
    const dislike = likes?.filter((userId) => userId !== user.id);
    const like = [...(likes ?? []), user.id];
    const newLike = liked ? dislike : like;

    setLiked(!liked);
    setLikes(newLike);

    const res = await fetch(`/api/posts/${post._id}/${liked ? '/dislike' : '/like'}`, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(user.id),
    });
    if (!res.ok) {
        setLiked(tempLiked);
        throw new Error('Failed to like or dislike')
    }

    const fetchAllLikes = await fetch(`/api/posts/${post._id}/like`);
    if (!fetchAllLikes.ok) {
        setLikes(tempLikes);
        throw new Error('Failed to fetch like');
    }

    const likeData = await fetchAllLikes.json();
    setLikes(likeData);
}

  return (
    <div>
       <div className='text-sm mx-2 p-2 flex items-center justify-between border-b border-gray-300'>
          {
            likes && likes.length > 0 && (<p className='text-xs text-gray-500 hover:text-blue-500 hover:underline hover:cursor-pointer'>{likes.length} Likes</p>)
          }
          {
             post.comment && post.comment.length >0 &&(<p onClick={()=>setCommentOpen(!commentOpen)} className='text-xs text-gray-500 hover:text-blue-500 hover:underline hover:cursor-pointer'>{post.comment.length} Comment</p>)
          }
        </div>
      <div className='flex items-center m-1 justify-between'>
        <Button onClick={likeOrDislikeHandler} variant={'ghost'} className='flex items-center rounded-lg gap-1 text-gray-600 hover:text-black'>
          <ThumbsUp 
          className={`${liked && 'fill-[#378FE9]'}`}
          />
          <p  className={`${liked && 'text-[#378FE9]'}`}>Like</p>
        </Button>
        <Button onClick={()=>setCommentOpen(!commentOpen)} variant={'ghost'} className='flex items-center rounded-lg gap-1 text-gray-600 hover:text-black'>
          <MessageCircleMore />
          <p>Comment</p>
        </Button>
        <Button variant={'ghost'} className='flex items-center rounded-lg gap-1 text-gray-600 hover:text-black'>
          <Repeat />
          <p>Repost</p>
        </Button>
        <Button variant={'ghost'} className='flex items-center rounded-lg gap-1 text-gray-600 hover:text-black'>
          <Send />
          <p>Share</p>
        </Button>
      </div>
      {
        commentOpen && (
          <div className='p-4'>
            <CommentsInput postId={post._id}/>
            <Comments post={post}/>
          </div>
        )
      }
    </div>
  )
}

export default SocialOptions
