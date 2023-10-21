import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { MainLayout } from '../../layouts/MainLayout'
import { selectUserData } from '../../redux/slices/user'
import { Api } from '../../utils/api'
import { Avatar, Paper, Tab, Tabs } from '@material-ui/core'
import AvatarUploader from '../../components/Profile/AvatarUploader'
import { UserInfo } from '../../components/Profile/UserInfo'
import { CommentItem, PostItem, ResponseUser } from '../../utils/api/types'
import { NextPage } from 'next'
import { UsersProfileInfo } from '../../components/Profile/UsersProfile/UsersProfileInfo'
import UsersProfileAvatar from '../../components/Profile/UsersProfile/UsersProfileAvatar'
import { useState } from 'react'
import { Post } from '../../components/Post'
import { UsersProfilePost } from '../../components/Profile/UsersProfile/UsersProfilePost'
import { useUserComments } from '../../hooks/useUserComments'
import { CommentProfile } from '../../components/Profile/CommentProfile'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
	paper: {
		padding: '15px',
		marginBottom: '20px',
		borderRadius: '10px',
		boxShadow: '0 2px 4px rgba(0,0,0,.06)',
		transition: 'box-shadow 0.3s ease-in-out',
		'&:hover': {
			boxShadow: '0 4px 8px rgba(0,0,0,.12)'
		}
	}
})

interface ProfilePage {
	posts: PostItem[]
	user: ResponseUser
}

const ProfilePage: NextPage<ProfilePage> = ({ user, posts }) => {
	const classes = useStyles()
	const router = useRouter()
	const { id } = router.query
	const [selectedTab, setSelectedTab] = useState(0)

	const userData = useSelector(selectUserData)
	const userPosts = posts.filter(post => post.user.id === user.id)
	const [postList, setPostList] = useState(posts)

	const isOwnProfile = userData && id && Number(id) === userData.id

	const { userComments } = useUserComments(Number(id))

	const handleRemovePost = (id: number) => {
		const updatedList = postList.filter(post => post.id !== id)
		setPostList(updatedList)
	}

	const filteredComments = userComments.filter(
		comment => comment.user.id === user.id
	)
	const sortedComments = filteredComments.sort(
		(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
	)

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
								value={selectedTab}
								indicatorColor='primary'
								textColor='primary'
								onChange={(_, newValue) => setSelectedTab(newValue)}
							>
								<Tab label='Статьи' />
								<Tab label='Комментарии' />
								<Tab label='Закладки' />
							</Tabs>
						</Paper>
						<div className='d-flex align-start'>
							{selectedTab === 0 && (
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
							)}
							<div>
								<div className='d-flex align-start'>
									{selectedTab === 1 && (
										<div className='mr-20 flex'>
											{sortedComments.map(comment => (
												<Paper className={classes.paper} elevation={0}>
													<CommentProfile
														id={comment.id}
														user={user}
														text={comment.text}
														createdAt={comment.createdAt}
														currentUserId={comment.user.id}
														post={comment.post}
														currentUserId={userData?.id}
													/>
												</Paper>
											))}
										</div>
									)}
								</div>
							</div>
							<Paper
								style={{ width: 300, borderRadius: 10 }}
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
								value={selectedTab}
								indicatorColor='primary'
								textColor='primary'
								onChange={(_, newValue) => setSelectedTab(newValue)}
							>
								<Tab label='Статьи' />
								<Tab label='Комментарии' />
								<Tab label='Закладки' />
							</Tabs>
						</Paper>
						<div className='d-flex align-start'>
							{selectedTab === 0 && (
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
							)}
							<div>
								<div className='d-flex align-start'>
									{selectedTab === 1 && (
										<div className='mr-20 flex'>
											{filteredComments.map(comment => (
												<Paper className={classes.paper} elevation={0}>
													<CommentProfile
														id={comment.id}
														user={user}
														text={comment.text}
														createdAt={comment.createdAt}
														currentUserId={comment.user.id}
														post={comment.post}
														currentUserId={userData?.id}
													/>
												</Paper>
											))}
										</div>
									)}
								</div>
							</div>
							<Paper
								style={{ width: 300, borderRadius: 10 }}
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
		const userComments = await api.comment.getCommentsByUserId(id)

		return {
			props: {
				posts,
				user: userData,
				userComments
			}
		}
	} catch (err) {
		console.log(err)
	}
	return {
		props: {
			posts: null,
			user: null,
			userComments: null
		}
	}
}

export default ProfilePage
