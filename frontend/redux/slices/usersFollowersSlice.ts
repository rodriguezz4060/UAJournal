import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

const followersSlice = createSlice({
	name: 'followers',
	initialState: [],
	reducers: {
		updateFollowers: (state, action) => {
			return action.payload
		}
	}
})

export const { updateFollowers } = followersSlice.actions

export const followersReducer = followersSlice.reducer

export const selectFollowers = (state: RootState) => state.followers
