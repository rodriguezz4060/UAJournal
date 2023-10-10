import React from 'react'
import { Button, Link, Typography } from '@material-ui/core'
import {
  SettingsOutlined as SettingsIcon,
  TextsmsOutlined as MessageIcon,
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
          [ Steam: steamcommunity.com/id/BenderRodriguezz/ ]||[ Телеграм канал с мемасами
          t.me/memes_Rodriguez ]
          <div className={styles.headerDescription__edit}>
            <a href='#' className={styles.linkInline}>
              Изменить описание
            </a>
          </div>
        </div>
      </div>

      <div className={`${styles.header__actions} ${styles.headerActions}`}>
        <Link href='/profile/settings'>
          <Button>
            <SettingsIcon />
          </Button>
        </Link>
        <button className={`${styles.button} ${styles.buttonBlue} ${styles.buttonSize_default}`}>
          <div className={styles.button__icon}>
            <MessageIcon className={styles.svgMessage} />
          </div>
          <span className={styles.button__lable}>Написать</span>
        </button>
      </div>
      <div>
        <div className='d-flex mb-10 mt-10'>
          <Typography style={{ fontWeight: 'bold', color: '#35AB66' }} className='mr-15'>
            +208
          </Typography>
          <Typography>2 подписчика</Typography>
        </div>
        <Typography>На проекте с 15 сен 2016</Typography>
      </div>
    </div>
  )
}
