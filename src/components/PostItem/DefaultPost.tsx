import { type Post } from 'applet-types'
import PostText from '../PostText/PostText'

export default function DefaultPost({ post }: { post: Post }) {
  return (
    <div>
      <PostText postItem={post} />
    </div>
  )
}
