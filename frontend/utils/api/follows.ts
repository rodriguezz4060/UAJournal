import { FollowItem } from './types'
import { AxiosInstance } from 'axios'

export const FollowApi = (instance: AxiosInstance) => ({
	async getUserFollowing(id: string) {
		const { data } = await instance.get<FollowItem[]>(`/users/${id}/following`)
		return data
	},
	async getUserFollowers(id: string) {
		const { data } = await instance.get<FollowItem[]>(`/users/${id}/followers`)
		return data
	}
})
