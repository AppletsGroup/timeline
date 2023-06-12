
import { type Post } from 'applet-types'
import { getMonthAndDay } from '../../utils/time'
import ImagesWithText from '../ContentTypes/ImagesWithText'
import DefaultPost from '../ContentTypes/DefaultPost'
import { Link, useNavigate } from 'react-router-dom'

export default function PostItem({ postItem }: { postItem: Post }) {
  const navigate = useNavigate()

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

  const buildChannel = () => {
    return (
      <Link
        to={`/timelines/${postItem.channel?.id}`}
        className="bg-slate-100 px-3 py-1 rounded text-sm text-slate-600">
        {postItem.channel?.title}
      </Link>
    )
  }

  const handleGotoPostDetail = () => {
    navigate(`/posts/${postItem.id}`)
  }

  const [month, day] = getMonthAndDay(postItem.createdAt ?? '')

  return (
    <div
      onClick={handleGotoPostDetail}
      className="flex items-start mt-4">
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
        {postItem.channel && buildChannel()}
      </div>
    </div>
  )
}
