import React from 'react'
import Auth_services from '../Appwrite/Auth'
import { useDispatch } from 'react-redux'
import { logout } from '../Store/authslice'

function Logoutbtn() {
  
  const dispatch = useDispatch()
  
  const logouthandler = () => {
      Auth_services.logout()
      .then(()=>{
        dispatch(logout())
      })
  }

  return (
    <div>
      <button
      className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
      onClick={logouthandler}>Logout</button>
    </div>
  )
}

export default Logoutbtn