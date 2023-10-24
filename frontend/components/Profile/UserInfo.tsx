import React from 'react'
import Link from 'next/link'
import {
	SettingsOutlined as SettingsIcon,
	TextsmsOutlined as MessageIcon
} from '@material-ui/icons'
import styles from './Porfile.module.scss'
import { useAppSelector } from '../../redux/hooks'
import { selectUserData } from '../../redux/slices/user'

import moment from 'moment'
import 'moment/locale/ru'
moment.locale('ru')

interface UserInfoProps {}

export const UserInfo: React.FC<UserInfoProps> = () => {
	const userData = useAppSelector(selectUserData)

	const ratingClassName =
		userData?.rating > 0
			? styles.numberChange__positive
			: userData?.rating < 0
			? styles.numberChange__negative
			: ''

	return (
		<div className={styles.headerWithActions}>
			<div className={styles.header__title}>
				<div className={styles.headerTitle}>
					<div className={styles.headerTitle_main}>{userData?.fullName}</div>
				</div>
			</div>
			<div className={styles.header__description}>
				<div className={styles.headerDescription}>
					{userData?.description}
					<div className={styles.headerDescription__edit}>
						<Link href='#' className={styles.linkInline}>
							Изменить описание
						</Link>
					</div>
				</div>
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
						<div className={`${styles.numberChange} ${ratingClassName}`}>
							{userData?.rating > 0
								? `+${userData?.rating}`
								: userData?.rating < 0
								? `-${Math.abs(userData?.rating)}`
								: userData?.rating}
						</div>
					</div>
					<Link href='/profile/#' className={styles.headerStat}>
						2 подписчика
					</Link>
				</div>
				<div className={styles.header__stat}>
					На проекте с {moment(userData.createdAt).format('D MMM YYYY')}
				</div>
			</div>
		</div>
	)
}
