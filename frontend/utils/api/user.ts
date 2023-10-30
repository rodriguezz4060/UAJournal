import { CreateUserDto, LoginDto, PostItem, ResponseUser } from './types'
import { AxiosInstance } from 'axios'

export const UserApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get<ResponseUser[]>('/users')
    return data
  },
  async register(dto: CreateUserDto) {
    const { data } = await instance.post<CreateUserDto, { data: ResponseUser }>(
      '/auth/register',
      dto,
    )
    return data
  },
  async login(dto: LoginDto) {
    const { data } = await instance.post<LoginDto, { data: ResponseUser }>(
      '/auth/login',
      dto,
    )
    return data
  },
  async getMe() {
    const { data } = await instance.get<ResponseUser>('/users/me')
    return data
  },
  async getUserById(id: number) {
    const { data } = await instance.get<ResponseUser>(`/users/${id}`)
    if (data) {
      return data
    } else {
      return {}
    }
  },
  async getUserPosts(userId: number) {
    const { data } = await instance.get<PostItem[]>(`/users/${userId}/posts`)
    return data
  },
})
