import React from 'react'
import avatarStyles from '../Porfile.module.scss'
import styles from './Settings.module.scss'

interface SaveButtonProps {}

const SaveButton: React.FC<SaveButtonProps> = ({}) => {
	return (
		<div
			className={`${styles.scrollFooter} ${styles.settingsFooter} ${styles.islandBg}`}
		>
			<button
				className={`${styles.userPlus__saveButton} ${avatarStyles.button} ${avatarStyles.buttonBlue} ${avatarStyles.buttonSizeDefault}`}
			>
				<span className={styles.button__label}>Сохранить</span>
			</button>
		</div>
	)
}

export default SaveButton
