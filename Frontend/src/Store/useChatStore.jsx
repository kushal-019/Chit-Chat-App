import {create} from "zustand"
import toast from "react-hot-toast"
import axiosInstance from "../lib/Axios"

export const useChatStore = create((set)=>({
    messages : [] , 
    users:[],
    selectedUser : null,
    isUsersLoading : false,
    isMessageLoading : false,

    getUsers : async ()=>{
        set({isUserLoading:true});
        try{
            const res = await axiosInstance.get("/message/users");
            set({users : res.data});
        }
        catch(error){
            toast.error(error.data.message);
        }
        finally{
            set({isUserLoading:false});
        }
    },
    getMessages:async()=>{
        set({isMessageLoading:true});
        try{
            const res = await axiosInstance.get(`/message/${userId}`);
            set({messages : res.data});
        }
        catch(error){
            toast.error(error.data.message);
        }
        finally{
            set({isMessageLoading:false});
        }
    },
    setSelectedUser: (selectedUser)=>set({selectedUser}),
}));