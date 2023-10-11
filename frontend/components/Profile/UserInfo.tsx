import React from 'react'
import Link from 'next/link'
import {
	SettingsOutlined as SettingsIcon,
	TextsmsOutlined as MessageIcon
} from '@material-ui/icons'
import styles from './Porfile.module.scss'

interface UserInfoProps {}

export const UserInfo: React.FC<UserInfoProps> = () => {
	return (
		<div className={styles.headerWithActions}>
			<div className={styles.header__title}>
				<div className={styles.headerTitle}>
					<div className={styles.headerTitle_main}>Bender Rodriguez</div>
				</div>
			</div>
			<div className={styles.header__description}>
				<div className={styles.headerDescription}>
					[ Steam: steamcommunity.com/id/BenderRodriguezz/ ]||[ Телеграм канал с
					мемасами t.me/memes_Rodriguez ]
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
