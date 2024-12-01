import { useAppStore } from '@/Store'
import React from 'react'

const Profile = () => {
  const {userInfo} = useAppStore();
  
  return (
    <div>
      Profile
    </div>
  )
}

export default Profile
