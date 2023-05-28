import { Link, useParams } from 'react-router-dom'
import TimelinePosts from '../../components/TimelinePosts/TimelinePosts'
import { useAppSelector, useAppDispatch, channel } from 'applet-store'
import { useEffect } from 'react'

const { fetchChannel } = channel

export default function TimelinePage() {
  const { timelineId } = useParams<{ timelineId: string }>()
  const currentTimelineId = Number(timelineId)
  const currentBook = useAppSelector((state) => state.channel.currentChannel)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const loadTimeline = async () => {
      void dispatch(fetchChannel(currentTimelineId))
    }

    void loadTimeline()
  }, [currentTimelineId, dispatch])

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center mb-8">
        <img
          className="w-48 h-64 object-contain mr-0 md:mr-8 mb-4 md:mb-0"
          src={currentBook?.avatarUrl ?? 'https://assets.yikeguozi.com/public/avatar.png'}
          alt="Book Cover"
        />
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold">{currentBook?.title}</h1>
          <p className="text-gray-600">{currentBook?.description}</p>
          <div className="flex flex-col md:flex-row mt-4 space-y-2 md:space-y-0 md:space-x-4">
            <Link
              to={`/chapters/new?bookId=${currentTimelineId}`}
              className="w-full md:w-auto bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Add Post
            </Link>
          </div>
        </div>
      </div>
      {currentTimelineId && <TimelinePosts bookId={currentTimelineId} />}
    </div>
  )
}
