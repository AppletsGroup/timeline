import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getPost } from 'applet-apis'
import { type Post } from 'applet-types'
import DefaultPost from '../../components/ContentTypes/DefaultPost'
import ImagesWithText from '../../components/ContentTypes/ImagesWithText'
import { fromNow } from '../../utils/time'

const PostPage = () => {
  const { postId } = useParams<{ postId: string }>()
  const [post, setPost] = React.useState<Post | null>(null)

  useEffect(() => {
    const loadPost = async () => {
      const res = await getPost(Number(postId))
      setPost(res)
    }

    if (postId) {
      void loadPost()
    }
  }, [postId])

  if (post == null) return <></>

  const buildBody = () => {
    const { contentType } = post

    if (contentType === 'DOCUMENT') {
      return (
        <div>contact user service</div>
      )
    } else if (post.contentFormat && ['MARKDOWN', 'JSON'].includes(post.contentFormat)) {
      return (
        <div>contact user service</div>
      )
    } else if (contentType === 'IMAGES_WITH_TEXT') {
      return (
        <ImagesWithText
          post={post}
          key={post.id} />
      )
    } else {
      return (
        <DefaultPost
          post={post}
          key={post.id} />
      )
    }
  }

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <img
          src={post.author?.avatarUrl}
          alt="img"
          className="w-12 h-12 rounded-full mr-4"
      />
        <div>
          <div className="font-bold text-lg mb-1">
            {post.author?.name}
          </div>
          <div className="text-sm text-gray-500">
            Created at
            {' '}
            {fromNow(post.createdAt ?? '')}
          </div>
        </div>
      </div>

      <div className="ml-auto">
        {buildBody()}
      </div>
    </div>
  )
}

export default PostPage
