import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export default create(persist(
  (set) => ({
    theme: "system",
    
    setTheme: (theme) => set({ theme })
  })
  , { name: 'theme-store' }
))

