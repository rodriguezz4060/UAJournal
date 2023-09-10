export type LoginDto = {
  email: string
  password: string
}

export type CreateUserDto = {
  fullName: string
} & LoginDto

export type ResponseUser = {
  createAt: string
  email: string
  fullName: string
  id: number
  token: string
  updateAt: string
}
