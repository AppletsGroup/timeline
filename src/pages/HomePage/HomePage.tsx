import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector, post } from 'applet-store'
import { useReachBottom } from './useReachBottom'
import PostItem from '../../components/PostItem/PostItem'
import { Link } from 'react-router-dom'
import { getDateMetaData } from '../../utils/time'
import { type Post } from 'applet-types'
const { setCurrentPage, loadPosts, setContentTypes } = post

const groupPosts = (posts: Post[]) => {
  // 创建一个对象来存储分组后的数据
  const groupedPostsMap = new Map<string, Map<string, Post[]>>()

  // 遍历 posts 数组，根据月份和日期进行分组
  for (const postItem of posts) {
    const { monthInYear, day } = getDateMetaData(postItem.createdAt ?? '')

    // 检查月份分组是否已存在，如果不存在则创建一个新的 Map 对象
    if (!groupedPostsMap.has(monthInYear)) {
      groupedPostsMap.set(monthInYear, new Map())
    }

    // 获取对应月份的 Map 对象
    const monthMap = groupedPostsMap.get(monthInYear)

    // 检查日期分组是否已存在，如果不存在则创建一个空数组
    if (!monthMap?.has(day)) {
      monthMap?.set(day, [])
    }

    // 将 post 添加到对应的日期分组中
    const dayGroup = monthMap?.get(day)
    dayGroup?.push(postItem)
  }
  return groupedPostsMap
}

const ResumesPage = () => {
  const listRef = useRef(null)
  const { hasNext, posts, currentPage, loadingPosts } = useAppSelector((state) => state.post)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const initData = (): void => {
      dispatch(setContentTypes(['TEXT', 'IMAGES_WITH_TEXT']))
      void dispatch(loadPosts())
    }
    if (posts === null || posts.length === 0) initData()
  }, [dispatch])

  console.log({
    loadingPosts
  })
  useReachBottom(listRef, () => {
    if (hasNext && !loadingPosts) {
      dispatch(setCurrentPage(currentPage + 1))
      void dispatch(loadPosts())
    }
  })

  const groupedPostsMap = groupPosts(posts)
  const { month, day, weekDayFull } = getDateMetaData()

  return (
    <div
      className="bg-white min-h-screen"
      ref={listRef}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center sm:px-6 lg:px-8 px-4">
          <div className="flex items-center">
            <div className="text-4xl mr-2">{day}</div>
            <div className="text-sm">
              <div>{weekDayFull}</div>
              <div>{month}</div>
            </div>
          </div>
          <Link
            to="/posts/new"
            className="bg-slate-600 text-white rounded-lg w-10 h-10 flex justify-center items-center showdow-lg text-2xl">
            +
          </Link>
        </div>
        <div className="mt-8">
          {/* 第一层遍历，遍历月份 */}
          {Array.from(groupedPostsMap).map(([monthYear, monthMap]) => (
            <div key={monthYear}>
              <div className="px-4 bg-slate-100 py-2 sticky top-0">{monthYear}</div>
              {/* 第二层遍历，遍历日期 */}
              {Array.from(monthMap).map(([day, posts]) => (
                <div key={day}>
                  {/* 遍历该日期下的 posts */}
                  {posts.map((post, idx) => (
                    <PostItem
                      postItem={post}
                      index={idx}
                      key={post.id} />
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          {loadingPosts && hasNext && <div className="text-gray-600">Loading...</div>}
          {!hasNext && <div className="text-gray-600">All Posts Loaded</div>}
        </div>
      </div>
    </div>
  )
}

export default ResumesPage
