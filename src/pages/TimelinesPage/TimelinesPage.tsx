
import { channel, useAppDispatch, useAppSelector } from 'applet-store'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { type Channel } from 'applet-types'
import { useReachBottom } from 'use-reach-bottom'
import TimelineItem from '../../components/TimelineItem/TimelineItem'

const { loadChannels, setChannelPage, setKind } = channel

export default function TimelinesPage () {
  const listRef = useRef(null)
  const { hasMoreChannels, loadingChannels, channels, channelPage } = useAppSelector((state) => state.channel)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const initData = () => {
      dispatch(setKind('timeline'))
      void dispatch(loadChannels())
    }

    initData()
  }, [dispatch])

  useReachBottom(listRef, () => {
    if (hasMoreChannels && !loadingChannels) {
      dispatch(setChannelPage(channelPage + 1))
      void dispatch(loadChannels())
    }
  })

  const TimelineList = channels.map((channelItem: Channel, idx: number) => {
    return (
      <TimelineItem
        channel={channelItem}
        key={idx} />
    )
  })

  return (
    <div
      className="bg-gray-100 min-h-screen"
      ref={listRef}>
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Timelines</h1>
          <Link
            to="/timelines/new"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded shadow"
          >
            Add Timeline
          </Link>
        </div>
      </header>
      <main className="container mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
          {TimelineList}
        </div>
        <div className="flex justify-center mt-6">
          {loadingChannels && hasMoreChannels && <div className="text-gray-600">Loading...</div>}
          {!hasMoreChannels && <div className="text-gray-600">All Timelines Loaded</div>}
        </div>
      </main>
    </div>
  )
}
