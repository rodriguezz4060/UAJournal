import React, { useState } from 'react'
import styles from './Porfile.module.scss'
import axios from 'axios'
import SettingsIcon from '@material-ui/icons/SettingsOutlined'
import DeleteIcon from '@material-ui/icons/ClearOutlined'
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternateOutlined'

interface HeaderCoverProps {
	headerCoverUrl: string | null
}

const HeaderCover = ({ headerCoverUrl }: HeaderCoverProps) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [uploadedCoverUrl, setUploadedCoverUrl] = useState<string | null>(
		headerCoverUrl
	)

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (event.target.files && event.target.files.length > 0) {
			const file = event.target.files[0]
			setSelectedFile(file)

			try {
				const formData = new FormData()
				formData.append('file', file)

				const token = document.cookie.replace(
					/(?:(?:^|.*;\s*)rtoken\s*=\s*([^;]*).*$)|^.*$/,
					'$1'
				)

				await axios.patch('http://localhost:7777/users/cover', formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${token}`
					}
				})

				// Обновляем URL аватарки
				setUploadedCoverUrl(URL.createObjectURL(file))

				console.log('Аватарка успешно загружена')
			} catch (error) {
				console.error('Ошибка загрузки аватарки:', error)
			}
		}
	}

	const handleUploadClick = () => {
		document.getElementById('upload-header-cover').click()
	}

	return (
		<div>
			<div
				className={`${styles.headerCover} ${styles.header__cover}`}
				style={{
					backgroundImage: uploadedCoverUrl
						? `url(${uploadedCoverUrl})`
						: 'none'
				}}
			>
				<div className={styles.headerCoverManage}>
					<div className={styles.headerCoverManage__item}>
						<label
							className={`${styles.button} ${styles.buttonDefault} ${styles.buttonSize_default}`}
						>
							<div className={styles.button__icon}>
								<AddPhotoIcon style={{ height: 16, width: 16 }} />
							</div>
							<span className={styles.button__lable}>
								<input
									type='file'
									id='upload-header-cover'
									style={{ display: 'none' }}
									onChange={handleFileChange}
								/>
								Сменить обложку
							</span>
						</label>
					</div>
					<button
						className={`${styles.button} ${styles.buttonDefault} ${styles.buttonSize_default} ${styles.headerCoverManage__item}`}
					>
						<div className={`${styles.button__icon} `}>
							<SettingsIcon style={{ height: 20, width: 20 }} />
						</div>
						<span className={styles.button__lable}>Настроить</span>
					</button>
					<button
						className={`${styles.button} ${styles.buttonDefault} ${styles.buttonSize_default} ${styles.headerCoverManage__item}`}
					>
						<div className={`${styles.button__icon} `}>
							<DeleteIcon style={{ height: 18, width: 18 }} />
						</div>
						<span className={styles.button__lable}>Удалить</span>
					</button>
				</div>
			</div>
		</div>
	)
}

export default HeaderCover
