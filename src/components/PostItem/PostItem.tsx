
import { type Post } from 'applet-types'
import { getDateMetaData } from '../../utils/time'
import ImagesWithText from '../ContentTypes/ImagesWithText'
import DefaultPost from '../ContentTypes/DefaultPost'
import { Link, useNavigate } from 'react-router-dom'

export default function PostItem({ postItem, index }: { postItem: Post, index: number }) {
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
        onClick={(event) => { event.stopPropagation() }}>
        <div className="bg-slate-100 px-3 py-1 rounded text-sm text-slate-600 mt-2 inline-block">{postItem.channel?.title}</div>
      </Link>
    )
  }

  const handleGotoPostDetail = () => {
    navigate(`/posts/${postItem.id}`)
  }

  const { day, weekDay, hourAndMinute } = getDateMetaData(postItem.createdAt ?? '')

  return (
    <div
      onClick={handleGotoPostDetail}
      className="flex justify-between items-start mt-4 border-b px-4 pb-2">

      <div className="mr-2">
        {buildBody()}
        {postItem.channel && buildChannel()}
      </div>
      <div className="flex flex-col items-center justify-center ml-6 h-full">
        {
          index === 0 &&
            (
              <div className="border rounded-lg flex flex-col items-center justify-center px-1 shadow-md">
                <div className="text-sm text-stone-400">{weekDay}</div>
                <div className="text-xl bold">{day}</div>
              </div>
            )
        }
        <div className="text-sm text-gray-500">
          {hourAndMinute}
        </div>
      </div>
    </div>
  )
}
