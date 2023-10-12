import { Paper, Avatar, Tabs, Tab } from '@material-ui/core'
import { Post } from '../../components/Post'
import { MainLayout } from '../../layouts/MainLayout'
import { PostItem, ResponseUser } from '../../utils/api/types'
import { NextPage, GetServerSideProps } from 'next'
import { Api } from '../../utils/api'
import { useState } from 'react'
import AvatarUploader from '../../components/Profile/AvatarUploader'
import { UserInfo } from '../../components/Profile/UserInfo'

interface ProfileProps {
	posts: PostItem[]
	user: ResponseUser
}

const Profile: NextPage<ProfileProps> = ({ posts, user }) => {
	const [postList, setPostList] = useState(posts)

	const handleRemovePost = (id: number) => {
		const updatedList = postList.filter(post => post.id !== id)
		setPostList(updatedList)
	}

	return (
		<MainLayout contentFullWidth>
			<Paper className='pl-20 pr-20 pt-20 mb-30' elevation={0}>
				<div className='justify-between'>
					<AvatarUploader
						avatarUrl={user.avatarUrl}
						headerCoverUrl={user.headerCoverUrl}
						fullName={user.fullName[0]}
						headerCoverPosition={user.headerCoverPosition}
					/>
				</div>
				<UserInfo />
				<Tabs
					className='mt-20'
					value={0}
					indicatorColor='primary'
					textColor='primary'
				>
					<Tab label='Статьи' />
					<Tab label='Комментарии' />
					<Tab label='Закладки' />
				</Tabs>
			</Paper>
			<div className='d-flex align-start'>
				<div className='mr-20 flex'>
					{postList.map(obj => (
						<Post
							key={obj.id}
							id={obj.id}
							title={obj.title}
							incut={obj.body
								.filter(
									item =>
										item.type === 'incut' &&
										item.tunes?.anyTuneName?.ShowOnHomepage === true
								)
								.map(item => item.data.text)}
							quote={obj.body
								.filter(
									item =>
										item.type === 'quote' &&
										item.tunes?.anyTuneName?.ShowOnHomepage === true
								)
								.map(item => item.data.text)}
							caption={obj.body
								.filter(
									item =>
										item.type === 'quote' &&
										item.tunes?.anyTuneName?.ShowOnHomepage === true
								)
								.map(item => item.data.caption)}
							video={obj.body
								.filter(
									item =>
										item.type === 'video' &&
										item.tunes?.anyTuneName?.ShowOnHomepage === true
								)
								.map(item => item.data.file.url)}
							description={obj.body
								.filter(
									item =>
										item.type === 'paragraph' &&
										item.tunes?.anyTuneName?.ShowOnHomepage === true
								)
								.map(item => item.data.text)}
							images={obj.body
								.filter(
									item =>
										item.type === 'image' &&
										item.tunes?.anyTuneName?.ShowOnHomepage === true
								)
								.map(item => item.data.file.url)}
							user={obj.user}
							createdAt={obj.createdAt}
							onRemove={handleRemovePost}
						/>
					))}
				</div>
				<Paper style={{ width: 300 }} className='p-20 mb-20' elevation={0}>
					<b>Подписчики</b>
					<div className='d-flex mt-15'>
						<Avatar
							className='mr-10'
							src='https://leonardo.osnova.io/2d20257c-fec5-4b3e-7f60-055c86f24a4d/-/scale_crop/108x108/-/format/webp/'
						/>
						<Avatar
							className='mr-10'
							src='https://leonardo.osnova.io/2d20257c-fec5-4b3e-7f60-055c86f24a4d/-/scale_crop/108x108/-/format/webp/'
						/>
					</div>
				</Paper>
			</div>
		</MainLayout>
	)
}

export const getServerSideProps = async ctx => {
	try {
		const api = Api(ctx)
		const posts = await api.post.getAll()
		const userData = await api.user.getMe()
		return {
			props: {
				posts,
				user: userData
			}
		}
	} catch (err) {
		console.log(err)
	}
	return {
		props: {
			posts: null,
			user: null
		}
	}
}

export default Profile
