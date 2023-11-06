import React, { useState } from 'react'
import Link from 'next/link'
import {
	Avatar,
	ClickAwayListener,
	Grow,
	IconButton,
	Menu,
	MenuItem,
	MenuList,
	Paper,
	Popper,
	Typography
} from '@material-ui/core'
import { useRouter } from 'next/router'
import styles from './Post.module.scss'
import quotecss from '../FullPost/FullPost.module.scss'
import { PostActions } from '../PostActions'
import { Api } from '../../utils/api'
import { RatingItem, ResponseUser } from '../../utils/api/types'
import MoreIcon from '@material-ui/icons/MoreHorizOutlined'
import QuoteIcon from '@material-ui/icons/FormatQuote'
import { useAppSelector } from '../../redux/hooks'
import { selectUserData } from '../../redux/slices/user'

import moment from 'moment'
import 'moment/locale/ru'
moment.locale('ru')
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { HeaderUser } from '../HeaderPostUserInfo'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex'
		},
		paper: {
			marginRight: theme.spacing(2)
		}
	})
)

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
	rating: number
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
	caption,
	rating
}) => {
	const classes = useStyles()
	return (
		<Paper elevation={0} classes={{ root: styles.paper }}>
			<div className={styles.postContent}>
				<div className={styles.userInfoContent}>
					<HeaderUser
						onRemove={onRemove}
						showTime={false}
						id={id}
						createdAt={createdAt}
						user={user}
					/>
				</div>
			</div>
			<div className={styles.figure}>
				<div className={styles.title}>
					<Link href={`/news/${id}`}>{title}</Link>
				</div>
			</div>
			{images.length > 0 && (
				<div className={`${styles.imagePost} ${styles.contentImage}`}>
					{images.map((image, index) => (
						<div key={index}>
							<img src={image} alt={`Image ${index + 1}`} />
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
