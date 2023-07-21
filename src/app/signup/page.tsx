"use client";
import Link from 'next/link'
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast';
import axios from 'axios'

type User = {
    email: string
    password: string
    username: string
}

export default function SignupPage() {
    const router = useRouter()
    const [user, setUser] = useState<User>({
        email: "",
        password: "",
        username: ""
    })
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            document.getElementById("signupBtn")?.classList.remove("text-[grey]")
            setButtonDisabled(false)
        }
        else {
            setButtonDisabled(true)
        }
    }, [user])

    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/signup', user);
            console.log('Signup Success', response.data);
            router.push('/login')

        } catch (error: any) {
            console.log(error);
            alert("Error") // instead use react-toast lib

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-5 overflow-hidden">
            <h1 className="text-white text-2xl">User Signup</h1>
                
            <div className='flex flex-col justify-center items-center min-h-screen'>
                <h1 className='text-[green]'>{loading ? "Processing" : ""}</h1>
                <label htmlFor='username'>Username</label>
                <input
                    type='text'
                    className='p-2 text-black'
                        name='username'
                    id='username'
                    autoComplete='off'
                        value={user.username}
                        onChange={(e) => {
                            setUser({...user, username: e.target.value})
                        }}
                    />

                    
                    <label htmlFor='email'>Email</label>
                    <input
                    type='text'
                    className='p-2 text-black'
                        name='email'
                        id='email'
                        autoComplete='off'
                        value={user.email}
                        onChange={(e) => {
                            setUser({...user, email: e.target.value})
                        }}
                    />

                    <label htmlFor='password'>Password</label>
                    <input
                    type='password'
                    className='p-2 text-black'
                        name='password'
                        id='password'
                        autoComplete='off'
                        value={user.password}
                        onChange={(e) => {
                            setUser({...user, password: e.target.value})
                        }}
                    />

                <button
                    id='signupBtn'
                    type='submit'
                    disabled={buttonDisabled}
                    onClick={onSignup}
                    className='py-5 cursor-pointer underline text-[grey]'
                >
                        Signup
                </button>
            <Link href="/login">Visit Login Page</Link>

            </div>
        </div>
    )
}