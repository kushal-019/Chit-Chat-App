import React, { useEffect } from 'react'
import {useChatStore} from "../Store/useChatStore";
import MessageSkeleton from './Skeleton/MessageSkeleton';
import ChatHeader from './ChatHeader';
const ChatContainer = () => {

  const {messages ,getMessages, isMessageLoading,selectedUser} = useChatStore();

  if(isMessageLoading)return <MessageSkeleton/>

  useEffect=(()=>{
    getMessages(selectedUser._id);
  } , [selectedUser._id  , getMessages]);

  return (
    <div>
      {/* <ChatHeader/> */}
    </div>
  )
}

export default ChatContainer;