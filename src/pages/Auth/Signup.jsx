import { Link } from 'react-router-dom'
import Image from '../../Common/Image'

const Signup = () => {
    return (
        <div className='bg-gray-50 w-screen h-screen flex justify-center items-center'>
            <div className='flex flex-col gap-2 max-w-[90%] w-[500px]'>
                <div className='w-full flex flex-col justify-center items-center mb-4'>
                    <Image
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Logo"
                    />
                    <h1 className='text-2xl font-bold'>Create your account</h1>
                </div>
                <form className='border bg-white rounded-lg w-full flex flex-col gap-3 p-10 shadow-md'>
                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="name">Name</label>
                        <input className='outline-none block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-400 sm:text-sm sm:leading-6' id='name' name='name' type="text" />
                    </div>

                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="email">Email</label>
                        <input className='outline-none block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-400 sm:text-sm sm:leading-6' id='email' name='email' type="email" />
                    </div>

                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="password">Password</label>
                        <input className='outline-none block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-400 sm:text-sm sm:leading-6' id='password' name='password' type="password" />
                    </div>

                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input className='outline-none block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-400 sm:text-sm sm:leading-6' id='confirmPassword' name='confirmPassword' type="password" />
                    </div>

                    <button
                        type='submit'
                        className='bg-indigo-600 hover:bg-indigo-500  text-white font-bold p-2 rounded-md mt-5'>
                        Register
                    </button>
                </form>
                <div className='w-full text-center mt-2'>
                    <p className='text-xl font-semibold text-gray-500'>
                        Already Registered? &nbsp;
                        <Link to="/login" className='text-indigo-600 hover:text-indigo-400 cursor-pointer'>
                            SignIn
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup