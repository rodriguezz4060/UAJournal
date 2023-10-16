import styles from './Settings.module.scss'
import Link from 'next/link'
import { MainLayout } from '../../../layouts/MainLayout'
import ArrowBackIcon from '@material-ui/icons/ArrowBackIosOutlined'
import ProfileIcon from '@material-ui/icons/PersonOutline'
import { useState } from 'react'
import React from 'react'

import Profile from './Profile'
import SettingsMenu from './SettingsMenu'
import General from './General'

interface SettingsMainProps {
	id: string
	fullName: string
}

const SettingsMain: React.FC<SettingsMainProps> = ({ id, fullName }) => {
	const [activeTab, setActiveTab] = useState('profile')

	const handleTabChange = tab => {
		setActiveTab(tab)
	}

	return (
		<div>
			<style>
				{`
          :root {
      --wrapper-padding-top: 70px;
			.content {
				--max-width-content: 960px;
			}
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
									{activeTab === 'profile' && <Profile fullName={fullName} />}
									{activeTab === 'general' && <General />}
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
							>
								<SettingsMenu
									activeTab={activeTab}
									onTabChange={handleTabChange}
								/>
							</div>
						</div>
					</div>
				</div>
			</MainLayout>
		</div>
	)
}

export default SettingsMain
