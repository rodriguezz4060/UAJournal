import React, { useEffect, useRef, useState } from 'react'
import { PostActions } from '../PostActions'
import MessageIcon from '@material-ui/icons/TextsmsOutlined'
import UserAddIcon from '@material-ui/icons/PersonAddOutlined'
import QuoteIcon from '@material-ui/icons/FormatQuote'
import styles from './FullPost.module.scss'
import { FullPostProps } from '.'
import {
	Backdrop,
	Button,
	Fade,
	Modal,
	Paper,
	Theme,
	Typography,
	createStyles,
	makeStyles
} from '@material-ui/core'
import Image from 'next/image'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		modal: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			transition: 'opacity 0.3s, transform 0.3s, width 0.3s, height 0.3s',
			opacity: 0,
			transform: 'scale(0.9)',
			cursor: 'zoom-in'
		},
		open: {
			opacity: 1,
			transform: 'scale(1)'
		},
		paper: { transition: 'transform 0.3s' }
	})
)

export const FullPost: React.FC<FullPostProps> = ({
	title,
	blocks,
	user,
	id,
	rating
}) => {
	const classes = useStyles()
	const [open, setOpen] = React.useState(false)
	const [zoomed, setZoomed] = useState(false)
	const [position, setPosition] = useState({ x: 0, y: 0 })
	const prevScrollY = useRef(0)

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
		setZoomed(false)
	}

	const handleImageClick = () => {
		setZoomed(!zoomed)
		setPosition({ x: 0, y: 0 })
	}

	const handleScroll = () => {
		handleClose()
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
		if (!zoomed) return
		event.preventDefault()
		const startX = event.clientX - position.x
		const startY = event.clientY - position.y

		const handleMouseMove = (event: MouseEvent) => {
			setPosition({
				x: event.clientX - startX,
				y: event.clientY - startY
			})
		}

		const handleMouseUp = () => {
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleMouseUp)
		}

		document.addEventListener('mousemove', handleMouseMove)
		document.addEventListener('mouseup', handleMouseUp)
	}

	const paperStyle = {
		cursor: zoomed ? 'grab' : 'zoom-in',
		userSelect: zoomed ? 'none' : 'auto',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		transition: 'transform 0.3s ease-in-out',
		transformOrigin: 'center',
		transform: `scale(${zoomed ? 1 : 0.7}) translate(${position.x}px, ${
			position.y
		}px)`,
		'&:active': {
			cursor: 'grabbing'
		}
	}

	return (
		<div>
			<Paper elevation={0} className={styles.paper}>
				<div className={styles.container}>
					<Typography className={styles.title}>{title}</Typography>
					<div>
						<div className={styles.text}>
							{blocks.map(obj => {
								if (obj.type === 'paragraph') {
									return (
										<div className={styles.figure}>
											<div className={styles.paragraph}>
												<Typography
													key={obj.id}
													dangerouslySetInnerHTML={{ __html: obj.data.text }}
												/>
											</div>
										</div>
									)
								}
								if (obj.type === 'quote') {
									return (
										<div className={styles.figure}>
											<blockquote className={styles.block_quote}>
												<div className={styles.quote__content}>
													<QuoteIcon />
													<Typography
														key={obj.id}
														className={styles.quote_text}
														dangerouslySetInnerHTML={{ __html: obj.data.text }}
													/>
													<div
														className={styles.quote_author}
														dangerouslySetInnerHTML={{
															__html: obj.data.caption
														}}
													/>
												</div>
											</blockquote>
										</div>
									)
								}
								if (obj.type === 'list') {
									return (
										<div className={styles.figure}>
											<div className={styles.list}>
												<ul>
													{obj.data.items.map((item, index) => (
														<li key={index}>{item}</li>
													))}
												</ul>
											</div>
										</div>
									)
								}
								if (obj.type === 'incut') {
									return (
										<div className={styles.figure}>
											<div className={styles.block_incut}>
												<div className={styles.content_incut}>
													<Typography
														key={obj.id}
														className={styles.quote_text}
														dangerouslySetInnerHTML={{ __html: obj.data.text }}
													/>
												</div>
											</div>
										</div>
									)
								}
								if (obj.type === 'code') {
									return (
										<div className={styles.figure}>
											<div className={styles.block_code}>{obj.data.code}</div>
										</div>
									)
								}
								if (obj.type === 'image') {
									const imageClass =
										obj.data.file.width < 640
											? styles.small_image
											: obj.data.file.width < 1000
											? styles.image
											: styles.stretched_image

									return (
										<div className={styles.figure}>
											<div className={imageClass}>
												<Image
													src={obj.data.file.url}
													alt={obj.data.caption}
													width={obj.data.file.width}
													height={obj.data.file.height}
													onClick={handleOpen}
												/>
												<Modal
													aria-labelledby='transition-modal-title'
													aria-describedby='transition-modal-description'
													className={`${classes.modal} ${
														open ? classes.open : ''
													}`}
													open={open}
													onClose={handleClose}
													closeAfterTransition
													disableScrollLock
													BackdropComponent={Backdrop}
													BackdropProps={{
														timeout: 400
													}}
												>
													<Fade in={open}>
														<div
															className={classes.paper}
															style={paperStyle}
															onClick={handleImageClick}
															onMouseDown={handleMouseDown}
														>
															<Image
																src={obj.data.file.url}
																alt={obj.data.caption}
																width={obj.data.file.width}
																height={obj.data.file.height}
																layout='responsive'
															/>
														</div>
													</Fade>
												</Modal>
												<div className={styles.image_caption}>
													{obj.data.caption}
												</div>
											</div>
										</div>
									)
								}
								if (obj.type === 'video') {
									const videoClass =
										obj.data.file.width < 640
											? styles.small_image
											: obj.data.file.width < 950
											? styles.image
											: styles.stretched_image
									return (
										<div className={styles.figure}>
											<div className={videoClass}>
												<video controls>
													<source src={obj.data.file.url} type='video/mp4' />
												</video>
												<div className={styles.video_caption}>
													{obj.data.caption}
												</div>
											</div>
										</div>
									)
								}
								return null
							})}
						</div>
						<div className={styles.PostActions}>
							<PostActions id={id} rating={rating} />
						</div>
						<div className='d-flex justify-between align-center mt-30 mb-30'>
							<div className={styles.userInfo}>
								<img
									src='https://leonardo.osnova.io/104b03b4-5173-fd9f-2af9-b458dddc4a23/-/scale_crop/108x108/-/format/webp/'
									alt='Avatar'
								/>
								<b>{user.fullName}</b>
								<span>+{user.commentsCount * 2}</span>
							</div>
							<div>
								<Button variant='contained' className='mr-15'>
									<MessageIcon />
								</Button>
								<Button variant='contained'>
									<UserAddIcon />
									<b className='ml-10'>Подписаться</b>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</Paper>
		</div>
	)
}
