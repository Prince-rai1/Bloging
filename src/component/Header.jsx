import React from 'react'
import { Link } from 'react-router-dom'
import ReactLogo from '../assets/react.svg';
import { useSelector } from 'react-redux';
import Logoutbtn from './Logoutbtn';
import { useNavigate } from 'react-router-dom';


function Header() {
  const userStatus = useSelector((state)=>state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    { 
      name: "Home",
      url : "/",
      active : true
    },
    { 
      name:'Login',
      url : "/login",
      active : !userStatus
    },
    {
      name:'Signup',
      url : "/signup",
      active : !userStatus
    },
    {
      name:'All Posts',
      url : "/posts",
      active: userStatus
    },
    {
      name:'Add post',
      url : "/add-post",
      active: userStatus
    }
  ]
  return (
     <header className='header bg-gray-500 rounded-md shadow-md'>
       <nav className='flex w-full justify-around items-center column gap-150 py-4 '>
        <div>
          <Link to="/">
           <img src={ReactLogo} alt="logo" className='logo' />
          </Link>
        </div>
        <ul className='flex column gap-10'>
          {navItems.map((item,index)=>(
            item.active ? (
              <li key={index} className='hover:bg-white rounded-md py-2 px-4 transition-all duration-700'>
                <button
                  onClick={()=>navigate(item.url)}>
                  {item.name}
                </button>
              </li>
            ):null

          ))}

          {userStatus && (
            <li>
              <Logoutbtn />
            </li>
          )}
        </ul>
       </nav>
     </header>
  )
}

export default Header