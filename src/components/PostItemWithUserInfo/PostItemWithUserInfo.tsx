
import { type Post } from 'applet-types'
import { fromNow } from '../../utils/time'
import ImagesWithText from '../ContentTypes/ImagesWithText'
import DefaultPost from '../ContentTypes/DefaultPost'
import { Link } from 'react-router-dom'

export default function PostItem({ postItem }: { postItem: Post }) {
  const buildBody = () => {
    const { contentType } = postItem

    if (contentType === 'DOCUMENT') {
      return (
        <div>contact user service</div>
      )
    } else if (postItem.contentFormat && ['MARKDOWN', 'JSON'].includes(postItem.contentFormat)) {
      return (
        <div>contact user service</div>
      )
    } else if (contentType === 'IMAGES_WITH_TEXT') {
      return (
        <ImagesWithText
          post={postItem}
          key={postItem.id} />
      )
    } else {
      return (
        <DefaultPost
          post={postItem}
          key={postItem.id} />
      )
    }
  }

  return (
    <Link to={`/posts/${postItem.id}`}>
      <div className="flex items-center mb-4">
        <div>
          <div className="font-bold text-lg mb-1">
            {postItem.author?.name}
          </div>
          <div className="text-sm text-gray-500">
            Created at
            {' '}
            {fromNow(postItem.createdAt ?? '')}
          </div>
        </div>
      </div>

      <div className="ml-auto">
        {buildBody()}
      </div>
    </Link>
  )
}
