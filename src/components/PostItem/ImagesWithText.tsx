import { type Post } from 'applet-types'
import PostImages from '../PostImages/PostImages'
import PostText from '../PostText/PostText'

export default function ImagesWithText({ post }: { post: Post }) {
  return (
    <div>
      <PostText postItem={post} />
      <PostImages post={post} />
    </div>
  )
}
