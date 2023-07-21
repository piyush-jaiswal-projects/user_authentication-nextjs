"use client";
import axios from 'axios'
import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("")

    useEffect(() => {
        axios.get('/api/users/userData').then((res) => {
            const userId: string = res.data.userData.id
            setData(userId)
        })
    }, [])

    const logOut = async () => {
        try {
            const response = await axios.get('/api/users/logout')
            router.push('/login')
        } catch (error: any) {
            console.log(error.message);
            alert("Error")
            //use react hot toast
        }
    }
    return (
        <div className="flex flex-col justify-center items-center py-2 min-h-screen">
            <h1>Profile</h1>
            <div>
            <p className="text-4xl">Profile Page</p>
            </div>
            <hr />
            <div className='text-white'>
                {data}
            </div>
            <button
            id='logoutBtn'
            onClick={logOut}
            className='py-5 cursor-pointer underline text-[grey]'>
                Logout
            </button>
            <button
            id='redirecttBtn'
            onClick={()=>{router.push(`/profile/${data}`)}}
            className='py-5 cursor-pointer underline text-[green]'>
                Visit Profile - {data}
            </button>
        </div>
    )
}