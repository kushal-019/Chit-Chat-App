import React, { useState } from 'react'
import backgroundimg from "@/Assets/victory.svg"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { apiClient } from '@/lib/api-client.js'
import { HOST, LOGIN_ROUTE, SIGNUP_ROUTE } from '@/Utils/constants.js'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/Store'

const Auth = () => {

    const navigate = useNavigate();
    const {setUserInfo} = useAppStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");

    const validateSignup = () => {
        if (!email.length) {
            toast("Email is require")
            return false;
        }
        if (!password.length) {
            toast("Password is require")
            return false;
        }
        if (password !== confirmpassword) {
            toast("Password and Confirm Password need to be same")
            return false;
        }
        return true;
    }
    const validateLogin = () => {
        if (!email.length) {
            toast("Email is require")
            return false;
        }
        if (!password.length) {
            toast("Password is require")
            return false;
        }
        return true;
    }

    const loginHandler = async () => {
        if (validateLogin()) {

            const res = await apiClient.post(`${HOST}${LOGIN_ROUTE}`, { email, password }, { withCredentials: true })
            console.log("Logged in")
            console.log(res)
            setPassword("") , setEmail("");
            if(res.data.user.id){
                setUserInfo(res.data.user);
                if(res.data.user.profileSetup)navigate("/chat");
                else navigate("/profile");
            }
        }
    }
    const signInHandler = async () => {
        if (validateSignup()) {
            
            const res = await apiClient.post(`${HOST}${SIGNUP_ROUTE}`, { email, password }, { withCredentials: true })
            
            console.log("Signed up")
            console.log(res)
            
            setPassword("") , setEmail("") , setConfirmPassword("");
            
            if(res.status === 201){
                setUserInfo(res.data.user);
                navigate("/profile");
            }
        }
    }

    return (
        <div className='h-[100vh] w-[100vw] flex items-center justify-center'>
            <div className='h-[80vh] bg-white border-white border-2 test-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60w] rounded-3xl grid xl:grid-cols=2'>
                <div className='flex flex-col gap-10 items-center justify-center'>
                    <div className='flex items-center justify-center flex-col'>
                        <div className='flex items-center justify-center'>
                            <h1 className='text-5xl font-bold md:text-6xl '>Welcome</h1>
                            <img src={backgroundimg} alt="victory image" className='h-[100px]' />
                        </div>
                        <p className='font-medium text-center'>Fill in the details to get staterd with the best chat app</p>
                    </div>
                    <div className='flex items-center justify-center w-full'>
                        <Tabs className='w-3/4' defaultValue='login'>
                            <TabsList className="bg-transparent rounded-none w-full">
                                <TabsTrigger value="login" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300">Login</TabsTrigger>
                                <TabsTrigger value="signup" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300">Signup</TabsTrigger>
                            </TabsList>
                            <TabsContent value="login" className="flex flex-col gap-5 mt-10">
                                <Input placeholder="Email" type="email" className="rounded-full p-6 " value={email} onChange={(e) => setEmail(e.target.value)} />
                                <Input placeholder="Password" type="password" className="rounded-full p-6 " value={password} onChange={(e) => setPassword(e.target.value)} />

                                <Button className="rounded-full p-6" onClick={loginHandler}>Login</Button>

                            </TabsContent>
                            <TabsContent value="signup" className="flex flex-col gap-5">
                                <Input placeholder="Email" type="email" className="rounded-full p-6 " value={email} onChange={(e) => setEmail(e.target.value)} />
                                <Input placeholder="Password" type="password" className="rounded-full p-6 " value={password} onChange={(e) => setPassword(e.target.value)} />
                                <Input placeholder="Confirm Password" type="password" className="rounded-full p-6 " value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                <Button className="rounded-full p-6" onClick={signInHandler}>Sign Up</Button>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Auth
