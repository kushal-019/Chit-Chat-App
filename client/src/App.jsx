import { Button } from "@/components/ui/button"
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./Pages/Auth";
import Profile from "./Pages/Profile";
import Chat from "./Pages/Chat";
import { useAppStore } from "./Store";
import { useEffect, useState } from "react";
import { apiClient } from "./lib/api-client";
import { GET_USER_INFO } from "./Utils/constants";

const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = userInfo;
  console.log(userInfo)
  return isAuthenticated ? children : <Navigate to="/auth" />
}
const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = userInfo;
  return isAuthenticated ? <Navigate to="/chat" /> : children
}

function App() {

  const {userInfo , setUserInfo }=useAppStore();
  const [loading  , setLoading]  = useState(true);

  useEffect(()=>{
    const getuserdata = async()=>{
      try {
        const res = await apiClient.get(GET_USER_INFO , {withCredentials :true})
      console.log(res);
        if(res.status === 200 && res.data.id){
          setUserInfo(res.data);
        }
        else setUserInfo(undefined)
      } catch (error) {
        setUserInfo(undefined)
      }
      finally{
        setLoading(false);
      }
      }
    if(!userInfo){
      getuserdata();
    }
    else setLoading(false);
  } , [userInfo , setUserInfo]);

  if(loading)return <div>Loading...</div>

  return (
    <>
      <Routes>
        <Route path="/auth" element={
          <AuthRoute>
            <Auth />
          </AuthRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        <Route path="/chat" element={<PrivateRoute>
          <Chat />
        </PrivateRoute>} />
        <Route path="*" element={<Auth />} />
      </Routes>
    </>
  )
}

export default App;
