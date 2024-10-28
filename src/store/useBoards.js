import { create } from 'zustand'

export default create(
  (set) => ({
    boards: [],
    setBoards: (boards) => set({ boards })
  })
)

