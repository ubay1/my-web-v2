import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface IState {
  pageActive: string
  showSidebarSmallScreen: boolean
  setPageActive?: (value: string) => void
  setShowSidebarSmallScreen?: (value: boolean) => void
  resetPage?: () => void
}

const initialState: IState = {
  pageActive: '',
  showSidebarSmallScreen: false,
}

export const usePageStore = create<IState>()(
  devtools(
    (set) => ({
      ...initialState,
      setPageActive: (value: string) => set(() => ({ pageActive: value })),
      setShowSidebarSmallScreen: (value: boolean) => set(() => ({ showSidebarSmallScreen: value })),
      reset: () => set(initialState),
    }),
    {
      name: 'page',
    },
  ),
)
