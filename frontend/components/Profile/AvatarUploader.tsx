import React, { useState } from 'react'
import axios from 'axios'
import { Avatar, IconButton, Menu, MenuItem } from '@material-ui/core'
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternateOutlined'

interface AvatarUploaderProps {
  avatarUrl: string | null
  fullName: string
}

const AvatarUploader = ({ avatarUrl, fullName }: AvatarUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadedAvatarUrl, setUploadedAvatarUrl] = useState<string | null>(avatarUrl)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      setSelectedFile(file)

      try {
        const formData = new FormData()
        formData.append('file', file)

        const token = document.cookie.replace(/(?:(?:^|.*;\s*)rtoken\s*=\s*([^;]*).*$)|^.*$/, '$1')

        await axios.patch('http://localhost:7777/users/avatar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        })

        // Обновляем URL аватарки
        setUploadedAvatarUrl(URL.createObjectURL(file))

        console.log('Аватарка успешно загружена')
      } catch (error) {
        console.error('Ошибка загрузки аватарки:', error)
      }
    }
  }

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleUploadClick = () => {
    document.getElementById('upload-avatar').click()
    handleClose() // Добавляем эту строку, чтобы меню закрывалось при клике на кнопку "Изменить"
  }

  return (
    <div>
     <div>
       <input id="upload-avatar" type='file' accept='image/*' onChange={handleFileChange} style={{ display: 'none' }} />
       <IconButton onClick={handleClick}>
         <Avatar
           style={{ width: 120, height: 120, borderRadius: 6 }}
           src={uploadedAvatarUrl ? uploadedAvatarUrl : fullName[0]}
         />
       </IconButton>
     </div>
     <div>
       <Menu
         anchorEl={anchorEl}
         elevation={2}
         open={Boolean(anchorEl)}
         onClose={handleClose}
         keepMounted
         disableScrollLock={true}
         getContentAnchorEl={null}
         anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
       >
         <MenuItem onClick={handleUploadClick}>Изменить</MenuItem>
       </Menu>
     </div>
    </div>
  )
}

export default AvatarUploader
