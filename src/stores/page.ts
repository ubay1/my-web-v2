import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface IState {
  pageActive: string
  showSidebarSmallScreen: boolean
  lang: 'id' | 'en'
  pathName: string
  setPageActive?: (value: string) => void
  setShowSidebarSmallScreen?: (value: boolean) => void
  setLang?: (value: 'id' | 'en') => void
  setPathName?: (value: string) => void
  resetPage?: () => void
}

const initialState: IState = {
  pageActive: '',
  showSidebarSmallScreen: false,
  lang: 'id',
  pathName: '',
}

export const usePageStore = create<IState>()(
  devtools(
    (set) => ({
      ...initialState,
      setPageActive: (value: string) => set(() => ({ pageActive: value })),
      setShowSidebarSmallScreen: (value: boolean) => set(() => ({ showSidebarSmallScreen: value })),
      setLang: (value: 'id' | 'en') => set(() => ({ lang: value })),
      setPathName: (value: string) => set(() => ({ pathName: value })),
      reset: () => set(initialState),
    }),
    {
      name: 'page',
    },
  ),
)
