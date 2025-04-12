import React,{useState} from 'react'
import Auth_services from '../Appwrite/Auth'
import Input from './Input'
import Button from './Button'
import { Link, useNavigate } from 'react-router'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import logo from '../assets/react.svg'
import { login } from '../Store/authslice'

function Login() {
  
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState(null)

    const onSubmit = async (data) =>{
        setError(null)
        try {
           const session = await Auth_services.userlogin({email : data.email, password : data.password})
           console.log("session is",session)
           if(session){
             const userdata = await Auth_services.getCurrentuser()
             if(userdata) dispatch(login(userdata));
             navigate("/")
            }
          
        } catch (error) {
          console.log("Error in login",error)
          setError(error.message)
        }
    }
  
  return (
     <div  className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
          <div className="mb-2 flex justify-center">
              <span className="inline-block w-full max-w-[100px]">
                <img src={logo} alt="logo" className="w-full h-auto" />
              </span>
           </div>
           <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
           <p className="mt-2 text-center text-base text-black/60">
               Don&apos;t have any account?&nbsp;
                <Link
                 to="/signup"
                 className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                  Sign Up
                </Link>
        </p>
         {error && <p className="text-red-500 mt-8 text-center">{error}</p>}
          
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
            <div>
            <Input 
              label = 'Email: '
              type = 'email'
              placeholder = 'Enter your email'
              {...register('email', {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email address',
                },
              })}
              />
           <Input
             label = 'Password: '
             type = 'password'
             placeholder = 'Enter your password'
             {...register('password', {
                required: true,
             })}
             />
             <Button
              type = 'submit'
              text = 'Login'
              className = 'w-full mt-4 hover:bg-white transition-all duration-400 p-2 rounded-md'
             />
            </div>
          </form>
        </div>
     </div>
  )
}

export default Login