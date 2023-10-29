import { MainLayout } from '../../layouts/MainLayout'
import { FullPost } from '../../components/FullPost/'
import React from 'react'
import { PostComments } from '../../components/PostComments'
import { GetServerSideProps, NextPage } from 'next'
import { Api } from '../../utils/api'
import { PostItem } from '../../utils/api/types'
import { useRouter } from 'next/router'

interface FullPostPageProps {
	post: PostItem
}

const FullPostPage: NextPage<FullPostPageProps> = ({ post }) => {
	const [postList, setPostList] = React.useState([post])

	const router = useRouter()
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

		return {
			props: {
				post
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
