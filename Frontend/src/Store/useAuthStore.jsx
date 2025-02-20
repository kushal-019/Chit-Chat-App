import { create } from "zustand"
import axiosInstance from "../lib/Axios.jsx"
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:5001";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
            get().connectSocket();
        }
        catch (error) {
            console.log("Error in CheckAuth: ", error);
            set({ authUser: null });
        }
        finally {
            set({ isCheckingAuth: false })
        }
    },
    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account Created Successfully");
            get().connectSocket();
        } catch (error) {
            toast.error("Error while Creating Account");
            console.log("SignUp Error", error.response.data.message);
        }
        finally {
            set({ isSigningUp: false });
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout")
            set({ authUser: null });
            toast.success("Logged Out Successfully");
            get().disconnectSocket(); 
        } catch (error) {
            toast.success("Error Logging out");
            console.log("Logout Error", error.response.data.message);
        }
    },
    login: async (data) => {
        set({ isLoggingin: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success(" Logged in Successfully");
            get().connectSocket();
        } catch (error) {
            toast.error("Error while Logginin Account");
            console.log("Login Error", error.response.data.message);
        }
        finally {
            set({ isLoggingin: false });
        }
    },
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/updateProfile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("Error in updating profile pic")
        }
        finally {
            set({ isUpdatingProfile: false });
        }
    },
    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            query: {
                userid: authUser._id
            }
        });

        socket.connect();
        set({ socket: socket });

        socket.on("getOnlineUsers" , (userids)=>{
            set({onlineUsers:userids})
        })
    },
    disconnectSocket: () => {
        if (get().socket?.connected)
            get().socket.disconnect();
            socket.on("getOnlineUsers" , (userids)=>{
            set({onlineUsers:userids})
        })
    },
}))