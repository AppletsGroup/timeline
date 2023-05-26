import { type Channel } from 'applet-types'
import { Link } from 'react-router-dom'

export default function ChannelItem ({ channel }: { channel: Channel }) {
  return (
    <Link
      to={`/timelines/${channel.id}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
    >
      <div className="relative h-64 overflow-hidden rounded-t-lg">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover object-center"
          src={channel.avatarUrl ?? 'https://assets.yikeguozi.com/public/avatar.png'}
          alt="Book Cover"
        />
      </div>
      <div className="px-4 py-2">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{channel.title}</h2>
        <p className="text-gray-700">{channel.description}</p>
      </div>
    </Link>
  )
}
