import React, { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector, post } from 'applet-store'
import { useReachBottom } from 'use-reach-bottom'
import PostItem from '../../components/PostItem/PostItem'
const { setCurrentPage, loadPosts, setContentTypes } = post

const ResumesPage = () => {
  const listRef = useRef(null)
  const { hasNext, posts, currentPage, loadingPosts } = useAppSelector((state) => state.post)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const initData = (): void => {
      dispatch(setContentTypes(['IMAGES_WITH_TEXT']))
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
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto py-5 sm:px-6 lg:px-8 px-4">
        <h2 className="text-3xl font-extrabold text-blue-500">My Posts</h2>
        <div className="mt-8">
          {posts.map((post) => (
            <PostItem
              postItem={post}
              key={post.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ResumesPage
