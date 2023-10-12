import styles from './Settings.module.scss'
import Link from 'next/link'
import { MainLayout } from '../../../layouts/MainLayout'
import ArrowBackIcon from '@material-ui/icons/ArrowBackIosOutlined'
import { TextField } from '@material-ui/core'
import { useState } from 'react'

interface SettingsMainProps {
	id: string
	fullName: string
}

const SettingsMain: React.FC<SettingsMainProps> = ({ id, fullName }) => {
	const [userName, setUserName] = useState(fullName)

	const handleUserNameChange = event => {
		setUserName(event.target.value) // Обновление значения имени пользователя
	}

	return (
		<div>
			<style>
				{`
          :root {
            --wrapper-padding-top: 70px;
            --max-width-container: 900px
          }
        `}
			</style>
			<MainLayout>
				<div
					className={`${styles.page} ${styles.userSettings} ${styles.page__contentSidebar}`}
				>
					<div className={styles.page__content}>
						<div
							className={`${styles.userSettings__content} ${styles.islandBg} ${styles.islandRound} ${styles.island}`}
						>
							<Link
								className={`${styles.settingsHeader} ${styles.userSettings__header}`}
								href={`/profile/${id}`}
							>
								<ArrowBackIcon
									style={{ width: 15, height: 15 }}
									className={`${styles.settingsHeader__icon} ${styles.icon} ${styles.icon__arrow_left}`}
								/>
							</Link>
							<div className={styles.userSettings__container}>
								<div className={styles.userProfile}>
									<div className={styles.formSection}>
										<label className={styles.formSection__label}>
											Отображаемое имя
										</label>
										<TextField
											size='small'
											label=''
											variant='outlined'
											fullWidth
											required
											InputLabelProps={{ shrink: false }}
											value={userName} // Используйте состояние userName вместо fullName
											onChange={handleUserNameChange} // Обработчик изменения значения имени пользователя
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div
						className={`${styles.userSettings__sidebar} ${styles.userSettings__sidebar}`}
					>
						<div className={`${styles.userSettings__stickyContainer}`}>
							<div
								className={`${styles.islandBg} ${styles.island} ${styles.islandRound} ${styles.sidebarNavigation__desktop}`}
							></div>
						</div>
					</div>
				</div>
			</MainLayout>
		</div>
	)
}

export default SettingsMain
