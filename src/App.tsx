import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { appletStore } from 'applet-store'
import { Provider } from 'react-redux'

import PostFormPage from './pages/PostFormPage/PostFormPage'
import PostsPage from './pages/PostsPage/PostsPage'
import PostPage from './pages/PostPage/PostPage'
import { AppletProvider, DefaultLayout, SubPageLayout } from 'applet-shell'

const menus = [
  { path: '/', label: 'Posts' },
  { path: '/posts/new', label: 'Create Post' }
]

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route >
      <Route
        element={(
          <DefaultLayout
            menus={menus}
            title={'Career'}/>
      )}>
        <Route
          path="/"
          element={<PostsPage />} />
        <Route
          path="/posts/new"
          element={<PostFormPage />} />
      </Route>
      <Route element={<SubPageLayout />}>
        <Route
          path="/posts/:postId"
          element={<PostPage />} />
        <Route
          path="/posts/:postId/edit"
          element={<PostFormPage />} />
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
