import { useAppStore } from '@/Store'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { colors, getColor } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api-client';
import { UPDATE_PROFILE_ROUTE } from '@/Utils/constants';
import { Button } from '@/components/ui/button';


const Profile = () => {

  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [selectedColor, setColor] = useState(0);

  useEffect(()=>{
    console.log(userInfo)
    if(userInfo.profileSetup){
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setColor(userInfo.color);
    }
  } , [userInfo] );

  const validateProfile=()=>{
    if(!firstName){
      toast("Firstname is required")
      return false;
    }
    if(!lastName){
      toast("Lastname is required")
      return false;
    }
      return true;
  } 

  const saveChanges = async () => {
    if(validateProfile()){
      try {
        const id = userInfo.id;
        const res = await apiClient.post(UPDATE_PROFILE_ROUTE , {id , firstName , lastName , color : selectedColor} , {withCredentials : true}); 
        if(res.status === 200 && res.data){
          setUserInfo({...res.data});
          toast.success("Profile updated successfully");
          navigate("/chat");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className='bg-[#1b1c24] h-[100vh] flex items-center justigy-center flex-col gap-10'>
      <div className='flex flex-col gap-10 w-[80vw] md:w-max'>
        <div>
          <IoArrowBack className='text-4xl lg:text-6xl text-white/90 cursor-pointer' />
        </div>
        <div className='grid grid-cols-2'>
          <div className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">{
              image ? (
                <AvatarImage className="object-cover w-full h-full bg-black" src={image} />
              ) : (
                <div className={` uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(selectedColor)}`}>
                  {
                    firstName ? firstName.split("").shift() : userInfo.email.split("").shift()
                  }
                </div>
              )
            }
            </Avatar>
            {
              hovered && (
                <div className='absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer '>
                  {image ? <FaTrash className='text-white text-3xl cursor-pointer' /> : <FaPlus className='text-white text-3xl cursor-pointer' />}
                </div>
              )
            }
            {/* <input type="text" /> */}
          </div>
          <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <div className="w-full">
              <Input placeholder="Email" type="email" disabled value={userInfo.email} className="rounded-lg pg-6 bg-[#2c2eb3] border-none " />
            </div>
            <div className="w-full">
              <Input placeholder="First Name" type="text" value={firstName} className="rounded-lg pg-6 bg-[#2c2eb3] border-none " onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="w-full">
              <Input placeholder="Last Name" type="text" value={lastName} className="rounded-lg pg-6 bg-[#2c2eb3] border-none " onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className='-wfull flex gap-5'>
              {
                colors.map((color, index) => (
                  <div key={index} className={`${color} h-8 w-8 rounded-full cursor-pointer translate-all duration-300 ${selectedColor === index ? "outline outline-white/50 outline-1" : ""
                    }`} onClick={() => setColor(index)}></div>
                ))
              }
            </div>
          </div>
        </div>
        <div className="w-full ">
          <Button className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300" onClick={saveChanges}  >Save Changes</Button>
        </div>
      </div>
    </div>
  )
}

export default Profile
