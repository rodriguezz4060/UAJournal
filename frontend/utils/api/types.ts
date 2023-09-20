import { Comment } from './../../components/Comment/index'
import { OutputData } from '@editorjs/editorjs'

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
  commentsCount?: number
  token: string
  updateAt: string
}

export type PostItem = {
  title: string
  body: OutputData['blocks']
  description: string
  tags: null | string
  id: number
  views: number
  user: ResponseUser
  createdAt: string
  updatedAt: string
}

export type CommentItem = {
  id: number
  text: string
  post: PostItem
  user: ResponseUser
  createdAt: string
  updatedAt: string
}
