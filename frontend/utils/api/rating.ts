import { AxiosInstance } from 'axios'
import { RatingItem } from './types'

export const RatingApi = (instance: AxiosInstance) => ({

  async getAll() {
    const { data } = await instance.get<RatingItem[]>('/rating')
    return data
  },

  async getOne(id: number) {
    const { data } = await instance.get<RatingItem>(`/rating/${id}`)
    return data
  },

})
