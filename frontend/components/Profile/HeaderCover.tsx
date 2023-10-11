import React, { useEffect, useState } from 'react'
import styles from './Porfile.module.scss'
import axios from 'axios'
import SettingsIcon from '@material-ui/icons/SettingsOutlined'
import DeleteIcon from '@material-ui/icons/ClearOutlined'
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternateOutlined'

interface HeaderCoverProps {
  headerCoverUrl: string | null
  headerCoverPosition: string | null
}

const HeaderCover = ({ headerCoverUrl, headerCoverPosition }: HeaderCoverProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadedCoverUrl, setUploadedCoverUrl] = useState<string | null>(
    headerCoverUrl,
  )

  const [backgroundPosition, setBackgroundPosition] = useState<string>(headerCoverPosition || '50% 50%')

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      setSelectedFile(file)

      try {
        const formData = new FormData()
        formData.append('file', file)

        const token = document.cookie.replace(
          /(?:(?:^|.*;\s*)rtoken\s*=\s*([^;]*).*$)|^.*$/,
          '$1',
        )

        await axios.patch('http://localhost:7777/users/me', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        })

        setPreviousCoverUrl(uploadedCoverUrl)
        setUploadedCoverUrl(URL.createObjectURL(file))

        console.log('Обложка успешно загружена')
      } catch (error) {
        console.error('Ошибка загрузки обложки:', error)
      }
    }
  }

  const handleSaveButtonClick = () => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)rtoken\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    )

    axios
      .patch('http://localhost:7777/users/me', {
        headerCoverPosition: backgroundPosition,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        console.log('Данные о позиции картинки успешно отправлены на сервер')
        setIsChangesSaved(true)
        setIsEditing(false) // Закрываем окно редактора после сохранения
      })
      .catch(error => {
        console.error('Ошибка при отправке данных о позиции картинки на сервер:', error)
      })
  }

  const handleUploadClick = () => {
    document.getElementById('upload-header-cover').click()
  }

  const handleHeaderCoverMouseMove = e => {
    if (isEditing && isMouseDown) {
      const headerCover = document.querySelector(`.${styles.headerCover}`)
      const headerCoverRect = headerCover.getBoundingClientRect()
      const headerCoverTop = headerCoverRect.top
      const offsetY = e.clientY - headerCoverTop

      const newPosition = Math.floor((offsetY / headerCoverRect.height) * 100)

      requestAnimationFrame(() => {
        setBackgroundPosition(`50% ${newPosition}%`)
      })
    }
  }

  const handleHeaderCoverMouseDown = () => {
    setIsMouseDown(true)
  }


  const handleWindowMouseUp = () => {
    if (isMouseDown) {
      setIsMouseDown(false)
    }
  }

  const handleHeaderCoverMouseLeave = () => {
    if (isMouseDown) {
      setIsMouseDown(false)
    }
  }

  const handleHeaderCoverMouseUp = () => {
    setIsMouseDown(false)
  }

  const handleHeaderCoverClick = () => {
    if (!isEditing) {
      setIsChangesSaved(false)
    }
  }
  const handleSettingsButtonClick = () => {
    setIsEditing(true)
  }

  const handleCloseClick = () => {
    setIsEditing(false)
    setUploadedCoverUrl(previousCoverUrl)
    setBackgroundPosition(headerCoverPosition || '50% 50%')
    setIsChangesSaved(true)
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleHeaderCoverMouseMove)
    window.addEventListener('mouseup', handleWindowMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleHeaderCoverMouseMove)
      window.removeEventListener('mouseup', handleWindowMouseUp)
    }
  }, [])

  const [isMouseDown, setIsMouseDown] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isChangesSaved, setIsChangesSaved] = useState(true)
  const [previousCoverUrl, setPreviousCoverUrl] = useState<string | null>(headerCoverUrl)

  return (
    <div>
      <div
        className={`${styles.headerCover} ${styles.header__cover} `}
        style={{
          backgroundImage: `url(${uploadedCoverUrl})`,
          backgroundPosition: backgroundPosition,
        }}
        onMouseMove={handleHeaderCoverMouseMove}
        onMouseDown={handleHeaderCoverMouseDown}
        onMouseLeave={handleHeaderCoverMouseLeave}
        onMouseUp={handleHeaderCoverMouseUp}
        onClick={handleHeaderCoverClick}
      >
        <div
          className={`${styles.headerCoverManage} ${
            isEditing ? styles.isEditing : ''
          }`}
        >
          <div className={styles.headerCoverManage__item}>

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
            onClick={handleSettingsButtonClick}
          >
            <div className={`${styles.button__icon} `}>
              <SettingsIcon style={{ height: 20, width: 20 }} />
            </div>
            <span className={styles.button__lable}>Настроить</span>
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

          {isEditing && (
            <>
              <button
                className={`${styles.button} ${styles.buttonDefault} ${styles.buttonSize_default} ${styles.headerCoverManage__item}`}
                onClick={handleSaveButtonClick}
              >
                <div className={`${styles.button__icon} `}>
                  <SettingsIcon style={{ height: 20, width: 20 }} />
                </div>
                <span
                  className={styles.button__lable}
                >
								Сохранить
							</span>
              </button>
              <button
                className={`${styles.button} ${styles.buttonDefault} ${styles.buttonSize_default} ${styles.headerCoverManage__item}`}
                onClick={handleCloseClick}
              >
                <div className={`${styles.button__icon} `}>
                  <SettingsIcon style={{ height: 20, width: 20 }} />
                </div>
                <span
                  className={styles.button__lable}
                >
								Закрыть
							</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default HeaderCover
