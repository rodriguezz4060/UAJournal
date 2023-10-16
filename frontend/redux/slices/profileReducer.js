import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  fullName: '',
  description: '',
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.fullName = action.payload.fullName
      state.description = action.payload.description
    },
  },
})


export const { updateProfile } = profileSlice.actions
export default profileSlice.reducer
