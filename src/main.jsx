import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './Store/store.js'
import { BrowserRouter, createBrowserRouter, Router } from "react-router";
import Protected from './component/Authlayout.jsx'
import { RouterProvider } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Loginpage from './Pages/Loginpage.jsx'
import Signup from './Pages/Signup.jsx' 
import AddPost from './Pages/AddPost.jsx'
import EditPost from './Pages/EditPost.jsx'
import Post from './Pages/Post.jsx'
import AllPosts from './Pages/AllPosts.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <Loginpage/>
          </Protected>
        )
      },
      {
         path: '/Signup',
         element: (
          <Protected authentication={false}>
            <Signup/>
          </Protected>
          )
      },
      {
          path:'/posts',
          element: (
              <AllPosts />
          )
      },
      {
        path:'/add-post',
        element: (
          <Protected authentication={true}>
            <AddPost/>
          </Protected>
        )
      },
      {
        path:'/edit-post/:id',
        element: (
          <Protected authentication={true}>
            <EditPost />
          </Protected>
        )
      },
      {
        path:'/post/:id',
        element: (
            <Post />
        )
      }
   ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
