import React from 'react'
import {
  Button,
  DialogContent,
  Dialog,
  DialogContentText,
  Typography,
  TextField,
  Divider,
} from '@material-ui/core'
import MailIcon from '@mui/icons-material/MailOutline'
import AppleIcon from '@mui/icons-material/Apple'
import styles from './AuthDialog.module.scss'

interface AuthDialogProps {
  visible: boolean
  onClose: () => void
}

export const AuthDialog: React.FC<AuthDialogProps> = ({ onClose, visible }) => {
  const [formType, setFormType] = React.useState<'main' | 'email'>('main')

  return (
    <Dialog open={visible} onClose={onClose} maxWidth='xs' fullWidth>
      <DialogContent>
        <DialogContentText>
          <div className={styles.content}>
            <Typography className={styles.title}>Вход в UAJ</Typography>
            {formType === 'main' && (
              <>
                <div>
                  <Button
                    onClick={() => setFormType('email')}
                    className='mb-10'
                    variant='contained'
                    fullWidth
                  >
                    <MailIcon />
                    Через почту
                  </Button>
                  <Button className='mb-10' variant='contained' fullWidth>
                    <img
                      src='https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg'
                      alt='Google'
                    />
                    Google
                  </Button>
                  <Button className='mb-10' variant='contained' fullWidth>
                    <AppleIcon />
                    Apple
                  </Button>
                </div>
                <div className={styles.miniButtons}>
                  <Button className='mb-10' variant='contained' fullWidth>
                    <MailIcon />
                  </Button>
                  <Button className='mb-10' variant='contained' fullWidth>
                    <img
                      src='https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg'
                      alt='Google'
                    />
                  </Button>
                  <Button className='mb-10' variant='contained' fullWidth>
                    <AppleIcon />
                  </Button>
                </div>
              </>
            )}
            {formType === 'email' && (
              <div>
                <form>
                  <TextField
                    className='mb-20'
                    size='small'
                    label='Почта'
                    variant='outlined'
                    fullWidth
                    required
                  />
                  <TextField
                    className='mb-20'
                    size='small'
                    label='Пароль'
                    variant='outlined'
                    type='password'
                    fullWidth
                    required
                  />
                  <TextField size='small' label='Пароль' variant='outlined' fullWidth required />
                  <Divider className='mt-30 mb-20' />
                  <Button color='primary' variant='contained'>
                    Сохранить изменения
                  </Button>
                </form>
              </div>
            )}
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}
