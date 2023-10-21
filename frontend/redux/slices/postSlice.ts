import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PostState {
	rating: number
}

const initialState: PostState = {
	rating: 0
}

const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		updateRating: (state, action: PayloadAction<number>) => {
			state.rating = action.payload
		}
	}
})

export const { updateRating } = postSlice.actions

export const postReducer = postSlice.reducer

export default postSlice.reducer
