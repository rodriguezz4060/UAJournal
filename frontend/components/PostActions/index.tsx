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
import { RootState } from '../../redux/store'
import { updatePostRating } from '../../redux/slices/postSlice'

interface PostActionsProps {}

export const PostActions: NextPage<PostActionsProps> = ({}) => {
	const dispatch = useDispatch()
	const postRating = useSelector((state: RootState) => state.post.rating)

	const handleRatingUp = () => {
		dispatch(updatePostRating(1))
	}

	const handleRatingDown = () => {
		dispatch(updatePostRating(-1))
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
					onClick={handleRatingUp}
				>
					<ArrowUpIcon style={{ width: 25, height: 25 }} />
				</IconButton>
				{postRating}
				<IconButton
					className={`${styles.ratingDown} ${styles.ratingDown_counter}`}
					onClick={handleRatingDown}
				>
					<ArrowDownIcon style={{ width: 25, height: 25 }} />
				</IconButton>
			</div>
		</div>
	)
}
