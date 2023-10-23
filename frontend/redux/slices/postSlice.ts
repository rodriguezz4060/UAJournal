// postSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Создайте асинхронный экшен для изменения рейтинга поста
export const changePostRating = createAsyncThunk(
	'post/changePostRating',
	async ({ id, increment }) => {
		try {
			// Отправьте PATCH-запрос на сервер для изменения рейтинга
			const response = await axios.patch(
				`http://localhost:7777/posts/${id}/rating`,
				{
					increment
				}
			)
			return response.data
		} catch (error) {
			throw new Error(error.response.data)
		}
	}
)

// Создайте срез состояния и редюсеры для постов
const postSlice = createSlice({
	name: 'post',
	initialState: {},
	reducers: {},
	extraReducers: builder => {
		builder.addCase(changePostRating.fulfilled, (state, action) => {
			// Обновите рейтинг поста в состоянии
			const { id, rating } = action.payload
			state[id] = rating
		})
	}
})

export default postSlice.reducer
