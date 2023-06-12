import React, { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector, post } from 'applet-store'
import { useReachBottom } from 'use-reach-bottom'
import PostItem from '../../components/PostItem/PostItem'
import { Link } from 'react-router-dom'
const { setCurrentPage, loadPosts, setContentTypes } = post

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

  useReachBottom(listRef, () => {
    if (hasNext && !loadingPosts) {
      dispatch(setCurrentPage(currentPage + 1))
      void dispatch(loadPosts())
    }
  })

  return (
    <div
      className="bg-white min-h-screen"
      ref={listRef}>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 px-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-extrabold text-blue-500">My Posts</h2>
          <Link to="/posts/new">Add</Link>
        </div>
        <div className="mt-8">
          {posts.map((post) => (
            <PostItem
              postItem={post}
              key={post.id} />
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
