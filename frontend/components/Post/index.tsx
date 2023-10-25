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
	const [open, setOpen] = React.useState(false)
	const anchorRef = React.useRef<HTMLButtonElement>(null)
	const handleRemove = async () => {
		const userData = useAppSelector(selectUserData)

		try {
			await Api().post.remove(id)
			onRemove(id)
		} catch (err) {
			console.warn('Remove post', err)
		}
	}

	const handleToggle = () => {
		setOpen(prevOpen => !prevOpen)
	}

	const handleClose = (event: React.MouseEvent<EventTarget>) => {
		if (
			anchorRef.current &&
			anchorRef.current.contains(event.target as HTMLElement)
		) {
			return
		}

		setOpen(false)
	}

	function handleListKeyDown(event: React.KeyboardEvent) {
		if (event.key === 'Tab') {
			event.preventDefault()
			setOpen(false)
		}
	}

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = React.useRef(open)
	React.useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current!.focus()
		}

		prevOpen.current = open
	}, [open])

	const router = useRouter()
	const [anchorEl, setAnchorEl] = React.useState(null)

	const handleClick = event => {
		setAnchorEl(event.currentTarget)
	}

	// const handleClose = () => {
	// 	setAnchorEl(null)
	// }

	const handleEdit = () => {
		router.push(`/write/${id}`)
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
						<IconButton
							ref={anchorRef}
							aria-controls={open ? 'menu-list-grow' : undefined}
							aria-haspopup='true'
							onClick={handleToggle}
						>
							<MoreIcon />
						</IconButton>

						<Popper
							open={open}
							anchorEl={anchorRef.current}
							role={undefined}
							transition
							disablePortal
						>
							{({ TransitionProps, placement }) => (
								<Grow
									{...TransitionProps}
									style={{
										transformOrigin:
											placement === 'bottom' ? 'center top' : 'center bottom'
									}}
								>
									<Paper className={styles.menuForm}>
										<ClickAwayListener onClickAway={handleClose}>
											<div className={styles.menu__item}>
												<MenuList
													autoFocusItem={open}
													id='menu-list-grow'
													onKeyDown={handleListKeyDown}
												>
													<div className={styles.menu__item}>
														<MenuItem onClick={handleRemove}>Удалить</MenuItem>
													</div>
													<div className={styles.menu__item}>
														<MenuItem onClick={handleEdit}>
															Редактировать
														</MenuItem>
													</div>
												</MenuList>
											</div>
										</ClickAwayListener>
									</Paper>
								</Grow>
							)}
						</Popper>
					</div>
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
						<div>
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
