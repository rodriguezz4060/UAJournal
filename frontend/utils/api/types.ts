import { OutputData } from '@editorjs/editorjs'

export type LoginDto = {
	email: string
	password: string
}

export type CreateUserDto = {
	fullName: string
} & LoginDto

export type ResponseUser = {
	id: number
	avatarUrl?: string
	headerCoverUrl?: string
	headerCoverPosition?: string
	description?: string
	email: string
	fullName: string
	commentsCount?: number
	token: string
	createdAt: string
	updatedAt: string
}

export type PostItem = {
	title: string
	body: OutputData['blocks']
	description: string
	tags: null | string
	id: number
	views: number
	tunes: string[]
	items: string
	incut: string[]
	quote: string[]
	caption: string
	code: string
	images?: string[]
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
