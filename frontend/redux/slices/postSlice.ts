import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PostState {
  rating: number;
}

const initialState: PostState = {
  rating: 0,
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPostRating: (state, action: PayloadAction<number>) => {
      state.rating = action.payload
    },
  },
})

export const { setPostRating } = postSlice.actions

export const postReducer = postSlice.reducer

export default postSlice.reducer
