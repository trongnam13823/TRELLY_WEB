import { create } from 'zustand'

export default create(
  (set, get) => ({
    board: {},
    setBoard: (board) => set({ board }),
    getBoard: () => get().board,
  })
)

