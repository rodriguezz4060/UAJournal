import React, { CSSProperties, useState } from 'react'
import { IconButton } from '@material-ui/core'
import CommentsIcon from '@material-ui/icons/ModeCommentOutlined'
import RepostIcon from '@material-ui/icons/RepeatOutlined'
import FavoriteIcon from '@material-ui/icons/BookmarkBorderOutlined'
import styles from './PostActions.module.scss'
import ArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import { NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux'

interface PostActionsProps {
	rating: number
	postId: number
}

export const PostActions: NextPage<PostActionsProps> = ({ rating, postId }) => {
	const [ratings, setRating] = useState(0)
	const [voted, setVoted] = useState(0)

	const handleVote = (value: number) => {
		if (voted === value) {
			setRating(ratings - value)
			setVoted(0)
		} else if (voted === -value) {
			setRating(ratings + 2 * value)
			setVoted(value)
		} else {
			setRating(ratings + value)
			setVoted(value)
		}
	}
	const sendRatingToServer = async (postId, rating) => {
		try {
			const response = await fetch(
				`http://localhost:7777/posts/${postId}/rating`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ rating })
				}
			)

			if (response.ok) {
				console.log('Рейтинг успешно отправлен на сервер')
				setRating(rating) // Обновление состояния рейтинга на сайте
			} else {
				console.log('Не удалось отправить рейтинг')
			}
		} catch (error) {
			console.log('Ошибка при отправке рейтинга', error)
		}
	}

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
					onClick={() => {
						handleVote(1)
						sendRatingToServer(postId, rating + 1)
					}}
				>
					<ArrowUpIcon style={{ width: 25, height: 25 }} />
				</IconButton>

				{rating}
				<IconButton
					className={`${styles.ratingDown} ${styles.ratingDown_counter}`}
					onClick={() => {
						handleVote(-1)
						sendRatingToServer(postId, rating - 1)
					}}
				>
					<ArrowDownIcon style={{ width: 25, height: 25 }} />
				</IconButton>
			</div>
		</div>
	)
}
