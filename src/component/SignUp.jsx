import React, {useState} from 'react'
import Input from './Input'
import Button from './Button'
import Reactlogo from '../assets/react.svg'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { useForm } from 'react-hook-form'
import Auth_services  from '../Appwrite/Auth'
import { login } from '../Store/authslice'

function SignUp() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {register, handleSubmit} = useForm()
  const [error, setError] = useState(null)

  const onSubmit = async (data) => {
    setError(null)
    try {
        const account = await Auth_services.createAccount(data)
        if(account){
           await Auth_services.userlogin(data)  
           const user = await Auth_services.getCurrentuser()
           console.log("user is registered",user)
           if (user){
            console.log("user is logged in",user)
            dispatch(login(user))
            navigate("/")
           }  
        }
    } catch (error) {
        console.log("Error in signup",error)
        setError(error.message)
    }
  }

  return (
    <div className="flex items-center justify-center">
    <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
       <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
                <img src={Reactlogo} alt="logo" className="w-full h-auto" />
            </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
        <p className="mt-2 text-center text-base text-black/60">
            Already have an account?&nbsp;
            <Link
                to="/login"
                className="font-medium text-primary transition-all duration-200 hover:underline"
            >
                Sign In
            </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <div className='space-y-5'>
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                        />
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})}
                        />
                        <Button type="submit" className="w-full hover:bg-white transition-all duration-400 p-2 rounded-md"
                        text = "Create Account" />
                    </div> 

        </form>

    </div>
    </div>
  )
}

export default SignUp