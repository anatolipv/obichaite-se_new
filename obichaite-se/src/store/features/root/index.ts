import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface RootInitialState {
  openMenu: boolean
  isLoading: boolean
  sectionName: string | null
  heroAppearAnimationDone: boolean | 'pending'
  heroAnimationDone: boolean
  openSearch: boolean
}

const rootInitialState: RootInitialState = {
  openMenu: false,
  isLoading: false,
  sectionName: null,
  heroAppearAnimationDone: 'pending',
  heroAnimationDone: false,
  openSearch: false,
}

export const rootSlice = createSlice({
  name: 'root',
  initialState: rootInitialState,
  reducers: {
    setOpenMenu: (state, { payload }: PayloadAction<boolean>) => {
      state.openMenu = payload
    },
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload
    },
    setSectionName: (state, { payload }: PayloadAction<string | null>) => {
      state.sectionName = payload
    },
    setHeroAnimationDone: (state) => {
      state.heroAnimationDone = true
    },
    setHeroAppearAnimationDone: (state, action: PayloadAction<boolean | 'pending'>) => {
      state.heroAppearAnimationDone = action.payload
    },
    setOpenSearch: (state, { payload }: PayloadAction<boolean>) => {
      state.openSearch = payload
    },
  },
})

export const {
  setOpenMenu,
  setIsLoading,
  setSectionName,
  setHeroAnimationDone,
  setHeroAppearAnimationDone,
  setOpenSearch,
} = rootSlice.actions

export default rootSlice.reducer
