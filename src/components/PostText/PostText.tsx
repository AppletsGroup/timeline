import { type Post } from 'applet-types'
import { getPostTextContent } from '../../utils/post'

export default function PostContent({ postItem }: { postItem: Post }) {
  const textContent = getPostTextContent(postItem)

  return (
    <div>
      {textContent}
    </div>
  )
}
