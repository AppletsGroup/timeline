import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { appletStore } from 'applet-store'
import { Provider } from 'react-redux'

import PostFormPage from './pages/PostFormPage/PostFormPage'
import MyPostsPage from './pages/MyPostsPage/MyPostsPage'
import PostPage from './pages/PostPage/PostPage'
import { AppletProvider, DefaultLayout, SubPageLayout } from 'applet-shell'
import TimelinesPage from './pages/TimelinesPage/TimelinesPage'
import TimelinePage from './pages/TimelinePage/TimelinePage'
import SubscribePostsPage from './pages/SubscribePostsPage/SubscribePostsPage'

const menus = [
  { path: '/posts/new', label: 'Add Post' },
  { path: '/', label: 'Posts' },
  { path: '/subscribe', label: 'Subscribe' },
  { path: '/timelines', label: 'Timelines' }
]

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route >
      <Route
        element={(
          <DefaultLayout
            menus={menus}
            title={'Timeline'}/>
      )}>
        <Route
          path="/"
          element={<MyPostsPage />} />
        <Route
          path="/subscribe"
          element={<SubscribePostsPage />} />
        <Route
          path="/timelines"
          element={<TimelinesPage />} />
      </Route>
      <Route element={<SubPageLayout />}>
        <Route
          path="/posts/new"
          element={<PostFormPage />} />
        <Route
          path="/posts/:postId"
          element={<PostPage />} />
        <Route
          path="/posts/:postId/edit"
          element={<PostFormPage />} />
        <Route
          path="/timelines/:timelineId"
          element={<TimelinePage />} />
      </Route>
    </Route>
  )
)

const App: React.FC = () => {
  return (
    <AppletProvider>
      <Provider store={appletStore}>
        <RouterProvider router={router} />
      </Provider>
    </AppletProvider>
  )
}

export default App
