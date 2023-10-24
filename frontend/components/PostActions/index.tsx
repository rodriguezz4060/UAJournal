import React, { CSSProperties, useEffect, useState } from 'react'
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
import { usePostRating } from '../../hooks/usePostRating'
import { useAppSelector } from '../../redux/hooks'
import { selectUserData } from '../../redux/slices/user'

interface PostActionsProps {
	rating: number
	postId: number
}

export const PostActions: NextPage<PostActionsProps> = ({ rating, postId }) => {
	const [currentRating, setCurrentRating] = useState(rating)
	const [userRatedUp, setUserRatedUp] = useState(false)
	const [userRatedDown, setUserRatedDown] = useState(false)

	const userData = useAppSelector(selectUserData)
	const { postsRating, setPostsRating } = usePostRating(postId)
	console.log(postsRating)

	const handleRatingChange = async (increment: number) => {
		try {
			const cookies = parseCookies()
			const token = cookies.rtoken

			const response = await axios.patch(
				`http://localhost:7777/posts/${postId}/rating`,
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
			console.log('Updated rating:', updatedRating)

			// Установить состояние для изменения стилей
			if (increment === 1) {
				setUserRatedUp(true)
				setUserRatedDown(false)
			} else if (increment === -1) {
				setUserRatedUp(false)
				setUserRatedDown(true)
			}
		} catch (error) {
			console.error(error)
		}
	}

	const userHasRated = postsRating.some(item => item.user.id === userData?.id)
	const userIncrement = postsRating.find(
		item => item.user.id === userData?.id
	)?.increment

	useEffect(() => {
		// Обновить состояние стилей при изменении рейтинга
		if (userHasRated && userIncrement === 1) {
			setUserRatedUp(true)
			setUserRatedDown(false)
		} else if (userHasRated && userIncrement === -1) {
			setUserRatedUp(false)
			setUserRatedDown(true)
		} else {
			setUserRatedUp(false)
			setUserRatedDown(false)
		}
	}, [userHasRated, userIncrement])

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
					className={`${styles.ratingUp} ${styles.ratingUp_counter} 
					${userRatedUp ? styles.userRatedUp : ''}`}
					onClick={() => handleRatingChange(1)}
				>
					<ArrowUpIcon style={{ width: 25, height: 25 }} />
				</IconButton>
				{currentRating}
				<IconButton
					className={`${styles.ratingDown} ${styles.ratingDown_counter}
					${userRatedDown ? styles.userRatedDown : ''}`}
					onClick={() => handleRatingChange(-1)}
				>
					<ArrowDownIcon style={{ width: 25, height: 25 }} />
				</IconButton>
			</div>
		</div>
	)
}
