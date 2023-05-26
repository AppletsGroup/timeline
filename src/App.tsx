import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { appletStore } from 'applet-store'
import { Provider } from 'react-redux'

import { Toaster } from 'react-hot-toast'
import PostFormPage from './pages/PostFormPage/PostFormPage'
import PostsPage from './pages/PostsPage/PostsPage'
import PostPage from './pages/PostPage/PostPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route >
      <Route
        path="/"
        element={<PostsPage />} />
      <Route
        path="/posts/:postId"
        element={<PostPage />} />
      <Route
        path="/posts/new"
        element={<PostFormPage />} />
      <Route
        path="/posts/:postId/edit"
        element={<PostFormPage />} />
    </Route>
  )
)

const App: React.FC = () => {
  return (
    <Provider store={appletStore}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  )
}

export default App
