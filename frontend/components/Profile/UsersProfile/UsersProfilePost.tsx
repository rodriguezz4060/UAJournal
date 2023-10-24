import React, { useState } from 'react'
import Link from 'next/link'
import { Avatar, IconButton, Menu, MenuItem, Paper } from '@material-ui/core'
import { useRouter } from 'next/router'
import styles from '../../Post/Post.module.scss'
import quotecss from '../../FullPost/FullPost.module.scss'
import MoreIcon from '@material-ui/icons/MoreHorizOutlined'
import moment from 'moment'
import QuoteIcon from '@material-ui/icons/FormatQuote'
import { ResponseUser } from '../../../utils/api/types'
import { useAppSelector } from '../../../redux/hooks'
import { selectUserData } from '../../../redux/slices/user'
import { Api } from '../../../utils/api'
import { PostActions } from '../../PostActions'

interface UsersProfilePostProps {
	title: string
	id: number
	description: string
	incut: string[]
	quote: string[]
	caption: string[]
	images: string[]
	video: string[]
	onRemove: (id: number) => void
	user: ResponseUser
	createdAt: string
	rating: number
}

export const UsersProfilePost: React.FC<UsersProfilePostProps> = ({
	id,
	title,
	description,
	images,
	video,
	user,
	createdAt,
	incut,
	quote,
	caption,
	rating
}) => {
	const router = useRouter()
	const [anchorEl, setAnchorEl] = React.useState(null)

	const handleClick = event => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleEdit = () => {
		router.push(`/write/${id}`)
		handleClose()
	}

	return (
		<Paper elevation={0} classes={{ root: styles.paper }}>
			<div className={styles.postContent}>
				<div className={styles.userInfoContent}>
					<div className={styles.userInfo}>
						<Avatar
							className={styles.userAvatar}
							src={user.avatarUrl ? user.avatarUrl : user.fullName[0]}
						/>
						<b>{user.fullName}</b>

						<div>
							<span>{moment(createdAt).fromNow()}</span>
						</div>
					</div>
					<div className={styles.userInfoControl}>
						<IconButton onClick={handleClick}>
							<MoreIcon />
						</IconButton>

						<Menu
							anchorEl={anchorEl}
							elevation={2}
							open={Boolean(anchorEl)}
							onClose={handleClose}
							keepMounted
							disableScrollLock={true}
						>
							<MenuItem>Удалить</MenuItem>
							<MenuItem>Редактировать</MenuItem>
						</Menu>
					</div>
				</div>
			</div>
			<div className={styles.figure}>
				<div className={styles.title}>
					<Link href={`/news/${id}`}>{title}</Link>
				</div>
			</div>
			{images.length > 0 && (
				<div className={styles.imagePost}>
					{images.map((image, index) => (
						<div className={styles.figure}>
							<img key={index} src={image} alt={`Image ${index + 1}`} />
						</div>
					))}
				</div>
			)}
			{video.length > 0 && (
				<div className={styles.figure}>
					<div className={styles.imagePost}>
						<video controls>
							<source src={video} type='video/mp4' />
						</video>
					</div>
				</div>
			)}
			{incut.length > 0 && (
				<div className={styles.figure}>
					<div className={styles.block_incut}>
						<div
							className={styles.content_incut}
							dangerouslySetInnerHTML={{ __html: incut }}
						/>
					</div>
				</div>
			)}
			{quote.length > 0 && (
				<div className={styles.figure}>
					<blockquote className={quotecss.block_quote}>
						<div className={quotecss.quote__content}>
							<QuoteIcon />
							<div
								className={quotecss.quote_text}
								dangerouslySetInnerHTML={{ __html: quote }}
							/>
							<div
								className={quotecss.quote_author}
								dangerouslySetInnerHTML={{ __html: caption }}
							/>
						</div>
					</blockquote>
				</div>
			)}
			{description && (
				<div className={styles.content}>
					{description.map((paragraph, index) => (
						<p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
					))}
				</div>
			)}
			<PostActions id={id} rating={rating} user={user.id} />
		</Paper>
	)
}
