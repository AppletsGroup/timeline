
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
        timeline={channelItem}
        key={idx} />
    )
  })

  return (
    <div
      className="p-4"
      ref={listRef}>
      <header className="flex justify-between items-center mb-4 container mx-auto">
        <h1 className="text-2xl font-bold">Timelines</h1>
        <Link
          to="/timelines/new"
          className="text-blue-500 hover:underline">
          Add Timeline
        </Link>
      </header>
      <main className="container mx-auto">
        <div>{TimelineList}</div>
        <div className="flex justify-center mt-4">
          {loadingChannels && hasMoreChannels && (
          <div className="text-gray-500">Loading...</div>
          )}
          {!hasMoreChannels && (
          <div className="text-gray-500">All Timelines Loaded</div>
          )}
        </div>
      </main>
    </div>
  )
}
