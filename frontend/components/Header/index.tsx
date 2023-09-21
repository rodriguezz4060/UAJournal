import React from 'react'
import { Button, Paper, IconButton, Avatar, List, ListItem } from '@material-ui/core'
import styles from './Header.module.scss'
import SearchIcon from '@mui/icons-material/Search'
import Link from 'next/link'
import CreateIcon from '@mui/icons-material/CreateOutlined'
import MessageIcon from '@mui/icons-material/SmsOutlined'
import NotificationIcon from '@mui/icons-material/NotificationsOutlined'
import Menu from '@mui/icons-material/MenuOutlined'
import ArrowBottom from '@mui/icons-material/KeyboardArrowDownOutlined'
import logo from '/pages/static/img/logo.svg'
import Image from 'next/image'
import { AuthDialog } from '../AuthDialog'
import UserIcon from '@mui/icons-material/AccountCircleOutlined'
import { useAppSelector } from '../../redux/hooks'
import { selectUserData } from '../../redux/slices/user'
import { PostItem } from '../../utils/api/types'
import { Api } from '../../utils/api'

export const Header: React.FC = () => {
  const userData = useAppSelector(selectUserData)
  const [authVisible, setAuthVisible] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState('')
  const [posts, setPosts] = React.useState<PostItem>([])

  const openAuthDialog = () => {
    setAuthVisible(true)
  }

  const closeAuthDialog = () => {
    setAuthVisible(false)
  }

  React.useEffect(() => {
    if (authVisible && userData) {
      setAuthVisible(false)
    }
  }, [authVisible, userData])

  const handleChangeInput = async e => {
    setSearchValue(e.target.value)
    try {
      const { items } = await Api().post.search({ title: e.target.value })
      setPosts(items)
    } catch (e) {
      console.warn(e)
    }
  }

  return (
    <Paper classes={{ root: styles.root }} elevation={0}>
      <div className='d-flex align-center'>
        <IconButton>
          <Menu />
        </IconButton>
        <Link href='/'>
          <Image className={styles.logo} src={logo} alt='Logo' />
        </Link>

        <div className={styles.searchBlock}>
          <SearchIcon />
          <input value={searchValue} onChange={handleChangeInput} placeholder='Поиск' />
          {posts.length > 0 && (
            <Paper className={styles.searchBlockPopup}>
              <List>
                {posts.map(obj => (
                  <Link key={obj.id} href={`/news/${obj.id}`}>
                    <ListItem button>{obj.title}</ListItem>
                  </Link>
                ))}
              </List>
            </Paper>
          )}
        </div>

        <Link href={'/write'}>
          <Button variant='contained' className={styles.penBottom}>
            <CreateIcon /> Написать
          </Button>
        </Link>
      </div>

      <div className='d-flex align-center'>
        <IconButton>
          <MessageIcon />
        </IconButton>
        <IconButton>
          <NotificationIcon />
        </IconButton>
        {userData ? (
          <Link href='/profile/1' className='d-flex align-center'>
            <Avatar
              className={styles.avatar}
              alt='Remy Sharp'
              src='https://leonardo.osnova.io/84acaa93-a48a-5e08-ba4f-79be1c92a724/-/scale_crop/108x108/-/format/webp/'
            />
            <ArrowBottom />
          </Link>
        ) : (
          <div className={styles.loginButton} onClick={openAuthDialog}>
            <UserIcon />
            Войти
          </div>
        )}
      </div>
      <AuthDialog onClick={closeAuthDialog} onClose={closeAuthDialog} visible={authVisible} />
    </Paper>
  )
}
