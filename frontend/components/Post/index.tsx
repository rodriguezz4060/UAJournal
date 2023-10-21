import React, { useState } from 'react'
import Link from 'next/link'
import {
	Avatar,
	IconButton,
	Menu,
	MenuItem,
	Paper,
	Typography
} from '@material-ui/core'
import { useRouter } from 'next/router'
import styles from './Post.module.scss'
import quotecss from '../FullPost/FullPost.module.scss'
import { PostActions } from '../PostActions'
import { Api } from '../../utils/api'
import { ResponseUser } from '../../utils/api/types'
import MoreIcon from '@material-ui/icons/MoreHorizOutlined'
import QuoteIcon from '@material-ui/icons/FormatQuote'
import { useAppSelector } from '../../redux/hooks'
import { selectUserData } from '../../redux/slices/user'

import moment from 'moment'
import 'moment/locale/ru'
moment.locale('ru')

interface PostProps {
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
}

export const Post: React.FC<PostProps> = ({
	id,
	title,
	description,
	images,
	video,
	onRemove,
	user,
	createdAt,
	incut,
	quote,
	caption
}) => {
	const handleRemove = async () => {
		const userData = useAppSelector(selectUserData)
		try {
			await Api().post.remove(id)
			onRemove(id) // Remove the post from the UI
		} catch (err) {
			console.warn('Remove post', err)
		}
	}

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
							<MenuItem onClick={handleRemove}>Удалить</MenuItem>
							<MenuItem onClick={handleEdit}>Редактировать</MenuItem>
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
			<PostActions />
		</Paper>
	)
}
