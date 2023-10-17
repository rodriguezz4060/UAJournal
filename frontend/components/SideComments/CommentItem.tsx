import React from 'react'
import styles from './SideComments.module.scss'
import Link from 'next/link'
import { PostItem, ResponseUser } from '../../utils/api/types'
import { Avatar } from '@material-ui/core'
import { selectUserData } from '../../redux/slices/user'
import { useAppSelector } from '../../redux/hooks'

interface CommentItemProps {
	user: ResponseUser
	text: string
	post: PostItem
}

export const CommentItem: React.FC<CommentItemProps> = ({
	user,
	text,
	post
}) => {
	const userData = useAppSelector(selectUserData)

	React.useEffect(() => {}, [userData])

	return (
		<div className={styles.commentBlock}>
			<div className={styles.commentItem}>
				<div className={styles.userInfo}>
					<Avatar
						className={styles.userAvatar}
						src={userData.avatarUrl ? userData.avatarUrl : userData.fullName[0]}
					/>
					<Link className={styles.fullName} href={`/profile/${user.id}`}>
						<span>{userData.fullName}</span>
					</Link>
				</div>
				<p className={styles.text}>{text}</p>
				<Link href={`/news/${post.id}`}>
					<span className={styles.postTitle}>{post.title}</span>
				</Link>
			</div>
		</div>
	)
}
