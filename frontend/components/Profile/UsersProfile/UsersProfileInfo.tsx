import React from 'react'
import Link from 'next/link'
import {
	SettingsOutlined as SettingsIcon,
	TextsmsOutlined as MessageIcon
} from '@material-ui/icons'
import styles from '../Porfile.module.scss'
import { ResponseUser } from '../../../utils/api/types'

interface UsersProfileInfoProps {
	user: ResponseUser
}

export const UsersProfileInfo: React.FC<UsersProfileInfoProps> = ({ user }) => {
	return (
		<div className={styles.headerWithActions}>
			<div className={styles.header__title}>
				<div className={styles.headerTitle}>
					<div className={styles.headerTitle_main}>{user?.fullName}</div>
				</div>
			</div>
			<div className={styles.header__description}>
				<div className={styles.headerDescription}>{user?.description}</div>
			</div>

			<div className={`${styles.header__actions} ${styles.headerActions}`}>
				<Link
					href='/profile/settings'
					className={`${styles.button} ${styles.buttonDefault} ${styles.buttonSize_default}`}
				>
					<div className={styles.button__icon}>
						<SettingsIcon />
					</div>
				</Link>
				<button
					className={`${styles.button} ${styles.buttonBlue} ${styles.buttonSize_default}`}
				>
					<div className={styles.button__icon}>
						<MessageIcon className={styles.svgMessage} />
					</div>
					<span className={styles.button__lable}>Написать</span>
				</button>
			</div>
			<div className={styles.header__stats}>
				<div className={styles.header__stat}>
					<div className={styles.headerStat}>
						<div
							className={`${styles.numberChange} ${styles.numberChange__positive}`}
						>
							+208
						</div>
					</div>
					<Link href='/profile/#' className={styles.headerStat}>
						2 подписчика
					</Link>
				</div>
				<div className={styles.header__stat}>На проекте с 15 сен 2016</div>
			</div>
		</div>
	)
}