import styles from './Settings.module.scss'
import Link from 'next/link'
import { MainLayout } from '../../../layouts/MainLayout'
import ArrowBackIcon from '@material-ui/icons/ArrowBackIosOutlined'
import {
  InputAdornment,
  TextField,
} from '@material-ui/core'
import { useState } from 'react'

interface SettingsMainProps {
  id: string
  fullName: string
}

const SettingsMain: React.FC<SettingsMainProps> = ({ id, fullName }) => {
  const [userName, setUserName] = useState(fullName)

  const [error, setError] = useState('')

  const handleUserNameChange = event => {
    const value = event.target.value
    if (value.length <= 30) {
      setUserName(value)
      if (/[<>{}"№'`^*[\]@]/.test(value)) {
        setError('Неподходящая длина или формат никнейма')
      } else {
        setError('')
      }
    } else {
      setError('Неподходящая длина или формат никнейма')
    }
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
                  <div className={styles.formSection}>
                    <label className={styles.formSection__label}>
                      Отображаемое имя
                    </label>
                    <form className={styles.textFieldStyles}>
                      <TextField
                        size='small'
                        label=''
                        variant='outlined'
                        fullWidth
                        required
                        InputLabelProps={{ shrink: false }}
                        error={!!error}
                        helperText={error}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              {30 - userName.length}
                            </InputAdornment>
                          ),
                        }}
                        value={userName} // Используйте состояние userName вместо fullName
                        onChange={handleUserNameChange} // Обработчик изменения значения имени пользователя
                      />
                    </form>
                  </div>
                  <div className={styles.formSection}>
                    <label className={styles.formSection__label}>
                      Описание к блогу
                    </label>
                    <form>
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
                    </form>
                  </div>
                  <div className={styles.formSection}>
                    <label className={styles.formSection__label}>
                      Лента по умолчанию
                    </label>
                    <form>
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
                    </form>
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
