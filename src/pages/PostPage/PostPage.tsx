import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getPost } from 'applet-apis'
import { type Post } from 'applet-types'

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

  return (
    <div className="p-4">
      {post.id}
    </div>
  )
}

export default PostPage
