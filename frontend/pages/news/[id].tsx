import { MainLayout } from '../../layouts/MainLayout'
import { FullPost } from '../../components/FullPost/'
import React, { useState } from 'react'
import { PostComments } from '../../components/PostComments'
import { GetServerSideProps, NextPage } from 'next'
import { Api } from '../../utils/api'
import { FollowItem, PostItem } from '../../utils/api/types'
import { useRouter } from 'next/router'

interface FullPostPageProps {
	post: PostItem
	followers: FollowItem[]
}

const FullPostPage: NextPage<FullPostPageProps> = ({ post, followers }) => {
	const router = useRouter()

	const [postList, setPostList] = React.useState([post])

	const handleRemovePost = (postId: number) => {
		const updatedList = postList.filter(post => post.id !== postId)
		setPostList(updatedList)
		if (router.pathname.includes('/news/')) {
			router.push('/')
		}
	}

	return (
		<MainLayout className='mb-50' contentFullWidth>
			<FullPost
				id={post.id}
				title={post.title}
				blocks={post.body}
				user={post.user}
				rating={post.rating}
				createdAt={post.createdAt}
				onRemove={handleRemovePost}
				followers={followers}
			/>
			<div id='comments'>
				<PostComments postId={post.id} />
			</div>
		</MainLayout>
	)
}

export const getServerSideProps: GetServerSideProps = async ctx => {
	try {
		const id = ctx.params?.id
		const post = await Api(ctx).post.getOne(+id)

		const followers = await Api(ctx).follow.getUserFollowers(id)

		return {
			props: {
				post,
				followers: []
			}
		}
	} catch (err) {
		console.log('Fulll post page', err)
		return {
			props: {},
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}
}

export default FullPostPage
