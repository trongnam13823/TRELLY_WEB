import authApi from '@/api/auth.api'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getHook } from "react-hooks-outside";

export default create(persist(
  (set) => ({
    accessToken: "",
    user: {},
    
    setUser: (user) => set({ user }),
    setAccessToken: (accessToken) => set({ accessToken }),
  
    logout: async () => {
      await authApi.logout()
      set({ accessToken: "", user: {} })
      getHook("queryClient").clear()
      getHook("navigate")("/login")
    }
  })
  , { name: 'auth-store' }
))

