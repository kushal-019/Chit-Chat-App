import { create } from "zustand";
import { createAuthSlice } from "./Slices/AuthSlice";

export const useAppStore= create()((...a)=>({
    ...createAuthSlice(...a),
}))