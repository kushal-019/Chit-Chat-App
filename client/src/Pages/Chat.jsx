import { useAppStore } from '@/Store'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Chat = () => {

  const {userInfo} = useAppStore();
  const navigate = useNavigate();
  useEffect(()=>{
    if(!userInfo.profileSetup){
      toast("Please setup profile to continue");
      navigate("/profile");
    }
  } , [navigate , userInfo]);
  return (
    <div>
      Chat
    </div>
  )
}

export default Chat
