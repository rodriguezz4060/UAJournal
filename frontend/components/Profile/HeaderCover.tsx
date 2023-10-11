import React, { useEffect, useState } from 'react'
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

	useEffect(() => {
		window.addEventListener('mouseup', handleWindowMouseUp)
		return () => {
			window.removeEventListener('mouseup', handleWindowMouseUp)
		}
	}, [])

	const handleHeaderCoverMouseMove = e => {
		if (isEditing && isMouseDown) {
			const headerCover = document.querySelector(`.${styles.headerCover}`)
			const headerCoverRect = headerCover.getBoundingClientRect()
			const headerCoverHeight = headerCoverRect.height
			const offsetY = e.clientY - headerCoverRect.top

			const newPosition = (offsetY / headerCoverHeight) * 100

			headerCover.style.backgroundPositionY = `${newPosition}%`
		}
	}

	const handleHeaderCoverMouseLeave = () => {
		const headerCover = document.querySelector(`.${styles.headerCover}`)
		headerCover.style.cursor = 'default'
	}

	const handleHeaderCoverMouseDown = () => {
		setIsMouseDown(true)
	}

	const handleWindowMouseUp = () => {
		setIsMouseDown(false)
		const headerCover = document.querySelector(`.${styles.headerCover}`)
		setIsEditing(headerCover.classList.contains(styles.isEditing))
	}

	const handleHeaderCoverMouseUp = () => {
		setIsMouseDown(false)
	}

	const handleHeaderCoverMouseEnter = () => {
		const headerCover = document.querySelector(`.${styles.headerCover}`)
		headerCover.style.cursor = 'grab'
	}

	const handleSaveButtonClick = () => {
		const headerCover = document.querySelector(`.${styles.headerCover}`)
		headerCover.classList.remove(styles.isEditing)
		setIsEditing(false)
	}

	const handleHeaderCoverClick = () => {
		const headerCover = document.querySelector(`.${styles.headerCover}`)
		headerCover.classList.add(styles.isEditing)
		setIsEditing(true)
	}

	const [isMouseDown, setIsMouseDown] = useState(false)
	const [isEditing, setIsEditing] = useState(false)

	return (
		<div>
			<div
				className={`${styles.headerCover} ${styles.header__cover} `}
				style={{
					backgroundImage: uploadedCoverUrl
						? `url(${uploadedCoverUrl})`
						: 'none'
				}}
				onMouseMove={handleHeaderCoverMouseMove}
				onMouseEnter={handleHeaderCoverMouseEnter}
				onMouseLeave={handleHeaderCoverMouseLeave}
				onMouseDown={handleHeaderCoverMouseDown}
				onMouseUp={handleHeaderCoverMouseUp}
			>
				<div
					className={`${styles.headerCoverManage} ${
						isEditing ? styles.isEditing : ''
					}`}
				>
					<div className={styles.headerCoverManage__item}>
						<button
							className={`${styles.button} ${styles.buttonDefault} ${styles.buttonSize_default} ${styles.headerCoverManage__item}`}
							style={{ display: isEditing ? '' : 'none' }}
						>
							<div className={`${styles.button__icon} `}>
								<SettingsIcon style={{ height: 20, width: 20 }} />
							</div>
							<span
								className={styles.button__lable}
								onClick={handleSaveButtonClick}
							>
								Сохранить
							</span>
						</button>
						<label
							className={`${styles.button} ${styles.buttonDefault} ${styles.buttonSize_default}`}
							style={{ display: isEditing ? 'none' : '' }}
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
						style={{ display: isEditing ? 'none' : '' }}
					>
						<div className={`${styles.button__icon} `}>
							<SettingsIcon style={{ height: 20, width: 20 }} />
						</div>
						<span
							className={styles.button__lable}
							onClick={handleHeaderCoverClick}
						>
							Настроить
						</span>
					</button>
					<button
						className={`${styles.button} ${styles.buttonDefault} ${styles.buttonSize_default} ${styles.headerCoverManage__item}`}
						style={{ display: isEditing ? 'none' : '' }}
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
