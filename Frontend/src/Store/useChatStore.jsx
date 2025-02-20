import { create } from "zustand"
import toast from "react-hot-toast"
import  axiosInstance  from "../lib/Axios.jsx"
import { useAuthStore } from "./useAuthStore.jsx"

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessageLoading: false,

    getUsers: async () => {
        set({ isUserLoading: true });
        try {
            const res = await axiosInstance.get("/message/users");
            set({ users: res.data });
        }
        catch (error) {
            toast.error(error.data.message);
        }
        finally {
            set({ isUserLoading: false });
        }
    },
    getMessages: async () => {
        set({ isMessageLoading: true });
        const { selectedUser } = get();
        try {
            const res = await axiosInstance.get(`/message/${selectedUser._id}`);
            set({ messages: res.data });
        }
        catch (error) {
            // toast.error(error.data.message);
        }
        finally {
            set({ isMessageLoading: false });
        }
    },
    sendMessages: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data] })
        } catch (error) {
            // toast.error(error.data.message);
        }
    },
    setSelectedUser: (selectedUser) => set({ selectedUser }),
    subscribeToMsgs: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newmsg", (newmsg) => {
            if(newmsg.senderId != selectedUser._id)return;
            set({ messages: [...get().messages, newmsg] });
        })
    },
    unsubscribeFromMsgs: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newmsg");
    },

}));