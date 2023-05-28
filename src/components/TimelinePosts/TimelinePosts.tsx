import { useEffect } from 'react'
import { channel, useAppDispatch, useAppSelector } from 'applet-store'
import { type Post } from 'applet-types'
import PostItem from '../PostItem/PostItem'

const { loadChannelPosts, setPostPage, setChannelId } = channel

export default function TimelinePosts({ bookId }: {
  bookId: number
}) {
  const { channelPosts } = useAppSelector(state => state.channel)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const queryPosts = () => {
      dispatch(setChannelId(Number(bookId)))
      dispatch(setPostPage(1))
      void dispatch(loadChannelPosts())
    }

    queryPosts()
  }, [bookId, dispatch])

  const PostList = channelPosts && channelPosts.length > 0
    ? channelPosts.map((item: Post, idx: number) => {
      return (
        <PostItem
          postItem={item}
          key={idx} />
      )
    })
    : (<div><div>empty</div></div>)

  return (
    <div>
      {PostList}
    </div>
  )
}
