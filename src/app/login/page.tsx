"use client";
import Link from 'next/link'
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios' 

type User = {
    password: string
    email: string
}

export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = React.useState<User>({
        password: "",
        email: ""
    })
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false)

    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/login', user);
            console.log('Login Success', response.data);
            router.push('/profile')

        } catch (error) {
            console.log(error);
            alert("Error") // instead use react-toast lib
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            document.getElementById("loginBtn")?.classList.remove("text-[grey]")
            setButtonDisabled(false)
        }
        else {
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <div className="p-5 overflow-hidden">
            <h1 className="text-white text-2xl">User Login</h1>
            <div className='flex flex-col justify-center items-center min-h-screen'>
            <h1 className='text-[green]'>{loading ? "Processing" : ""}</h1>
                    <label htmlFor='email'>Email</label>
                    <input
                    type='text'
                    className='p-2 text-[black]'
                        name='email'
                        id='email'
                        value={user.email}
                        onChange={(e) => {
                            setUser({...user, email: e.target.value})
                        }}
                    />

                    <label htmlFor='password'>Password</label>
                    <input
                    type='password'
                    className='p-2 text-[black]'
                        name='password'
                        id='password'
                        value={user.password}
                        onChange={(e) => {
                            setUser({...user, password: e.target.value})
                        }}
                    />

                <button
                    type='submit'
                    id='loginBtn'
                    disabled={buttonDisabled}
                    onClick={onLogin}
                    className='py-5 cursor-pointer underline text-[grey]'
                >
                        Login
                </button>
            <Link href="/signup">Visit Signup Page</Link>

            </div>
        </div>
    )
}