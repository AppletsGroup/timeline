import React, { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector, post } from 'applet-store'
import { useReachBottom } from 'use-reach-bottom'
const { setCurrentPage, loadPosts } = post

const ResumesPage = () => {
  const listRef = useRef(null)
  const { hasNext, posts, currentPage, loadingPosts } = useAppSelector((state) => state.post)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const initData = (): void => {
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
        <h2 className="text-3xl font-extrabold text-blue-500">Posts</h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
          {posts.map((post) => (
            <div key={post.id}>{post.id}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ResumesPage
