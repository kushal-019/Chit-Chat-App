import { Button } from "@/components/ui/button"
import { Route, Routes } from "react-router-dom";
import Auth from "./Pages/Auth";
import Profile from "./Pages/Profile";
import Chat from "./Pages/Chat";
function App() {

  return (
   <>
   <Routes>
    <Route path="/auth" element={<Auth/>} />
    <Route path="/profile" element={<Profile/>} />
    <Route path="/chat" element={<Chat/>} />
    <Route path="*" element={<Auth/>} />
   </Routes>
   </>
  )
}

export default App;
