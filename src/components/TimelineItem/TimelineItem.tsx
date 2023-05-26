import { type Channel } from 'applet-types'
import { Link } from 'react-router-dom'

export default function TimelineItem ({ timeline }: { timeline: Channel }) {
  return (
    <Link
      to={`/timelines/${timeline.id}`}
      className="flex items-center p-4 rounded-lg bg-white shadow hover:shadow-lg mb-4">
      <div className="mr-4">
        <img
          src={timeline.avatarUrl ?? 'https://assets.yikeguozi.com/public/avatar.png'}
          alt="Timeline Avatar"
          className="w-16 h-16 object-cover rounded-full"
    />
      </div>
      <div>
        <h2 className="text-lg font-bold mb-2">{timeline.title}</h2>
        <p className="text-gray-500">{timeline.description}</p>
      </div>
    </Link>
  )
}
