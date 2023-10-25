import React from 'react'
import Link from 'next/link'
import {
	SettingsOutlined as SettingsIcon,
	TextsmsOutlined as MessageIcon
} from '@material-ui/icons'
import styles from '../Porfile.module.scss'
import { ResponseUser } from '../../../utils/api/types'

import moment from 'moment'
import 'moment/locale/ru'
moment.locale('ru')

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
				<div className={styles.headerDescription}>
					{user?.description && (
						<div
							dangerouslySetInnerHTML={{
								__html: user.description
									.replace(
										/(https?:\/\/[^\s]+)/g,
										(match, url) =>
											`<a href="${url}" target="_blank">${url}</a>`
									)
									.replace(
										/(^|\s)([a-zA-Z0-9]+\.([a-zA-Z]{2,}\/[^\s]+))/g,
										(match, space, url) =>
											`${space}<a href="https://${url}" target="_blank">${url}</a>`
									)
							}}
						/>
					)}
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
						<div
							className={`${styles.numberChange} ${styles.numberChange__positive}`}
						>
							{user?.rating}
						</div>
					</div>
					<Link href='/profile/#' className={styles.headerStat}>
						2 подписчика
					</Link>
				</div>
				<div className={styles.header__stat}>
					На проекте с {moment(user.createdAt).format('D MMM YYYY')}
				</div>
			</div>
		</div>
	)
}
