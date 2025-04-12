import { useEffect, useState } from 'react'
import './App.css'
import {useDispatch} from 'react-redux'
import Auth_services from './Appwrite/Auth'
import { login, logout } from './Store/authslice'
import Header from './component/Header'
import Footer from './component/Footer'
// import Logoutbtn from './component/Logoutbtn'
import { Outlet } from 'react-router-dom'

function App() {

  const [loading, setloading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    Auth_services.getCurrentuser()
    .then((userData)=>{
      if(userData){
        dispatch(login(userData))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=>setloading(false))
  },[])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block ml-5 mr-5'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}


export default App
