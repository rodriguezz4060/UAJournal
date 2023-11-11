import {
	Avatar,
	Link,
	Paper,
	TableBody,
	TableCell,
	TableRow,
	makeStyles
} from '@material-ui/core'
import { NextPage } from 'next'
import { ResponseUser } from '../../utils/api/types'
import { FollowButton } from '../FollowButton'
import styles from './RatingPage.module.scss'

interface UsersRatingPageProps {
	users: ResponseUser[]
}

const useStyles = makeStyles({
	paper: {
		borderRadius: 0
	}
})

const UsersRating: NextPage<UsersRatingPageProps> = ({ users }) => {
	const classes = useStyles()

	const sortedUsers = users.sort((a, b) => b.rating - a.rating)

	return (
		<Paper className={`${classes.paper} ${styles.table}`} elevation={0}>
			<div
				className={`${styles.table__row} ${styles.table__row__header} ${styles.islandA} `}
			>
				<div className={styles.table__cell}>
					<strong>Пользователи</strong>
				</div>
				<div className={styles.table__cell}>
					<small>Рейтинг</small>
				</div>
				<div className={styles.table__cell}></div>
			</div>
			<div className={styles.table__content}>
				{sortedUsers.map((obj, index) => (
					<div className={`${styles.table__row} ${styles.islandA}`}>
						<div className={styles.table__cell}>
							<Link href={`/profile/${obj.id}`} className={styles.subsite}>
								<span className={styles.subsite__rank}>
									<small>{index + 1}</small>
								</span>

								<Avatar
									className={styles.subsite__avatar}
									src={obj.avatarUrl}
								/>
								<div className={styles.subsite__name}>
									<strong>{obj.fullName}</strong>
								</div>
							</Link>
						</div>
						<div className={styles.table__cell}>
							<small>
								<span>{obj.rating}</span>
							</small>
						</div>
						<div className={styles.table__cell}>
							<small>
								<span>{obj.rating}</span>
							</small>
						</div>
					</div>
				))}
			</div>
		</Paper>
	)
}

export default UsersRating
