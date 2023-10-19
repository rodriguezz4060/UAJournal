import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { MainLayout } from '../../layouts/MainLayout'
import { selectUserData } from '../../redux/slices/user'
import { Api } from '../../utils/api'
import { Avatar, Paper, Tab, Tabs } from '@material-ui/core'
import AvatarUploader from '../../components/Profile/AvatarUploader'
import { UserInfo } from '../../components/Profile/UserInfo'
import { PostItem, ResponseUser } from '../../utils/api/types'
import { NextPage } from 'next'
import { UsersProfileInfo } from '../../components/Profile/UsersProfile/UsersProfileInfo'
import UsersProfileAvatar from '../../components/Profile/UsersProfile/UsersProfileAvatar'
import { useState } from 'react'
import { Post } from '../../components/Post'
import { UsersProfilePost } from '../../components/Profile/UsersProfile/UsersProfilePost'

interface ProfilePage {
	posts: PostItem[]
	user: ResponseUser
}

const ProfilePage: NextPage<ProfilePage> = ({ user, posts }) => {
	const router = useRouter()
	const { id } = router.query
	const [postList, setPostList] = useState(posts)
	const userData = useSelector(selectUserData)

	const userPosts = posts.filter(post => post.user.id === user.id)

	const isOwnProfile = userData && id && Number(id) === userData.id

	const handleRemovePost = (id: number) => {
		const updatedList = postList.filter(post => post.id !== id)
		setPostList(updatedList)
	}

	return (
		<div>
			<MainLayout contentFullWidth>
				{isOwnProfile ? (
					<div>
						<Paper className='pl-20 pr-20 pt-20 mb-30' elevation={0}>
							<div className='justify-between'>
								<AvatarUploader
									headerCoverUrl={userData.headerCoverUrl}
									headerCoverPosition={userData.headerCoverPosition}
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
								{userPosts.map(obj => (
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
									/>
								))}
							</div>
							<Paper
								style={{ width: 300 }}
								className='p-20 mb-20'
								elevation={0}
							>
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
					</div>
				) : (
					<div>
						<Paper className='pl-20 pr-20 pt-20 mb-30' elevation={0}>
							<UsersProfileAvatar user={user} />
							<UsersProfileInfo user={user} />
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
								{userPosts.map(obj => (
									<UsersProfilePost
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
							<Paper
								style={{ width: 300 }}
								className='p-20 mb-20'
								elevation={0}
							>
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
					</div>
				)}
			</MainLayout>
		</div>
	)
}

export const getServerSideProps = async ctx => {
	try {
		const api = Api(ctx)
		const { id } = ctx.query
		const userData = await api.user.getUserById(id)
		const posts = await api.post.getAll()

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

export default ProfilePage
