import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Avatar, Button, Menu, MenuItem } from '@material-ui/core'
import makeStyles from '@material-ui/styles/makeStyles'
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternateOutlined'

interface AvatarUploaderProps {
  avatarUrl: string | null
  fullName: string
}

const useStyles = makeStyles({
  popOverRoot: {
    pointerEvents: 'none',
  },
})

const AvatarUploader = ({ avatarUrl, fullName }: AvatarUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadedAvatarUrl, setUploadedAvatarUrl] = useState<string | null>(avatarUrl)

  useEffect(() => {
    if (selectedFile) {
      handleUpload()
    }
  }, [selectedFile])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        const formData = new FormData()
        formData.append('file', selectedFile)

        const token = document.cookie.replace(/(?:(?:^|.*;\s*)rtoken\s*=\s*([^;]*).*$)|^.*$/, '$1')

        await axios.patch('http://localhost:7777/users/avatar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        })

        // Обновляем URL аватарки
        setUploadedAvatarUrl(URL.createObjectURL(selectedFile))

        console.log('Аватарка успешно загружена')
      } catch (error) {
        console.error('Ошибка загрузки аватарки:', error)
      }
    }
  }

  let currentlyHovering = false
  const styles = useStyles()

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget)
    }
  }

  const handleHover = () => {
    currentlyHovering = true
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleCloseHover = () => {
    currentlyHovering = false
    setTimeout(() => {
      if (!currentlyHovering) {
        handleClose()
      }
    }, 50)
  }

  return (
    <div>
      <div
        aria-owns={anchorEl ? 'simple-menu' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
        onMouseOver={handleClick}
        onMouseLeave={handleCloseHover}
      >
        {uploadedAvatarUrl ? (
          <Avatar style={{ width: 120, height: 120, borderRadius: 6 }} src={uploadedAvatarUrl} />
        ) : (
          <Avatar style={{ width: 120, height: 120, borderRadius: 6 }}>{fullName[0]}</Avatar>
        )}
      </div>
      <Menu
        id='simple-menu'
        disableScrollLock={true}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          onMouseEnter: handleHover,
          onMouseLeave: handleCloseHover,
          style: { pointerEvents: 'auto' },
        }}
        getContentAnchorEl={null}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        PopoverClasses={{
          root: styles.popOverRoot,
        }}
      >
        <MenuItem>
          <label htmlFor='file-input'>
            Изменить
            <input
              id='file-input'
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </label>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default AvatarUploader
