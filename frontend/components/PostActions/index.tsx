import React, { CSSProperties, useState } from 'react'
import { IconButton } from '@material-ui/core'
import CommentsIcon from '@material-ui/icons/ModeCommentOutlined'
import RepostIcon from '@material-ui/icons/RepeatOutlined'
import FavoriteIcon from '@material-ui/icons/BookmarkBorderOutlined'
import styles from './PostActions.module.scss'
import ArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import { NextPage } from 'next'
import axios from 'axios'
import { parseCookies } from 'nookies'

interface PostActionsProps {
	rating: number
	id: number
}

export const PostActions: NextPage<PostActionsProps> = ({ rating, id }) => {
	const [currentRating, setCurrentRating] = useState(rating)

	const handleRatingChange = async increment => {
		try {
			const cookies = parseCookies()
			const token = cookies.rtoken

			const response = await axios.patch(
				`http://localhost:7777/posts/${id}/rating`,
				{
					increment: increment
				},
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			)
			const updatedRating = response.data.rating
			setCurrentRating(updatedRating)
		} catch (error) {
			console.error(error)
		}
	}
	console.log(currentRating)
	return (
		<div
			className={`${styles.contentFooter} ${styles.contentFooter__short} ${styles.islandA}`}
		>
			<div className={styles.contentFooter__item}>
				<IconButton
					className={`${styles.buttonSvg} ${styles.comments_counter}`}
				>
					<CommentsIcon style={{ width: 20, height: 20 }} />
				</IconButton>
			</div>
			<div className={styles.contentFooter__item}>
				<IconButton
					className={`${styles.buttonSvg} ${styles.comments_counter}`}
				>
					<RepostIcon style={{ width: 20, height: 20 }} />
				</IconButton>
			</div>
			<div className={styles.contentFooter__item}>
				<IconButton
					className={`${styles.buttonSvg} ${styles.comments_counter}`}
				>
					<FavoriteIcon style={{ width: 20, height: 20 }} />
				</IconButton>
			</div>
			<div
				className={`${styles.contentFooter__item} ${styles.contentFooter__item__right}`}
			>
				<IconButton
					className={`${styles.ratingUp} ${styles.ratingUp_counter}`}
					onClick={() => handleRatingChange(1)}
				>
					<ArrowUpIcon style={{ width: 25, height: 25 }} />
				</IconButton>
				{currentRating}
				<IconButton
					className={`${styles.ratingDown} ${styles.ratingDown_counter}`}
					onClick={() => handleRatingChange(-1)}
				>
					<ArrowDownIcon style={{ width: 25, height: 25 }} />
				</IconButton>
			</div>
		</div>
	)
}
