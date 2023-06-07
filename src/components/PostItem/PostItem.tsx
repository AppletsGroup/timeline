
import { type Post } from 'applet-types'
import { getMonthAndDay } from '../../utils/time'
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

  const [month, day] = getMonthAndDay(postItem.createdAt ?? '')

  return (
    <Link
      to={`/posts/${postItem.id}`}
      className="flex items-start mb-4">
      <div className="flex items-end mr-6">
        <div className="text-2xl bold">
          {day}
        </div>
        <div className="text-base text-gray-500 ml-1">
          {month}
        </div>
      </div>

      <div className="ml-2">
        {buildBody()}
      </div>
    </Link>
  )
}
