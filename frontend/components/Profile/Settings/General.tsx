import { useState } from 'react'
import {
	TextField,
	Button,
	InputAdornment,
	IconButton
} from '@material-ui/core'
import axios from 'axios'
import { parseCookies } from 'nookies'
import styles from './Settings.module.scss'
import { useAppSelector } from '../../../redux/hooks'
import { selectUserData, setUserData } from '../../../redux/slices/user'
import { useDispatch } from 'react-redux'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import React from 'react'

interface GeneralProps {}

const General: React.FC<GeneralProps> = ({}) => {
	const userData = useAppSelector(selectUserData)
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const dispatch = useDispatch()

	const handleSubmit = async () => {
		try {
			const cookies = parseCookies()
			const token = cookies.rtoken
			const formData = {
				password: password
			}

			const response = await axios.patch(
				'http://localhost:7777/users/me',
				formData,
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			)
			if (response.data && response.data.fullName) {
				setPassword(response.data.password)
				setError('')
				dispatch(setUserData(response.data))
			}
		} catch (error) {
			setError('Ошибка при сохранении данных')
			console.error(error)
		}
	}

	const [showPassword, setShowPassword] = useState(false)

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword)
	}

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault()
	}

	return (
		<>
			<div className={styles.formSection}>
				<label className={styles.formSection__label}>Почта</label>
				<form className={styles.textFieldStyles}>
					<TextField
						size='small'
						label=''
						variant='outlined'
						fullWidth
						required
						InputLabelProps={{ shrink: false }}
						inputProps={{
							readOnly: true
						}}
						value={userData.email}
					/>
				</form>
			</div>
			<div className={styles.formSection}>
				<label className={styles.formSection__label}>Пароль</label>
				<form className={styles.textFieldStyles}>
					<TextField
						size='small'
						label=''
						variant='outlined'
						fullWidth
						required
						type='password'
						InputLabelProps={{ shrink: false }}
						inputProps={{
							readOnly: true
						}}
						value={userData.password}
					/>
				</form>
			</div>
			<div className={styles.formSection}>
				<label className={styles.formSection__label}>Новый пароль</label>
				<form className={styles.textFieldStyles}>
					<TextField
						size='small'
						label=''
						variant='outlined'
						fullWidth
						required
						type={showPassword ? 'text' : 'password'}
						InputLabelProps={{ shrink: false }}
						error={!!error}
						helperText={error}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
									>
										{showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							)
						}}
						value={password}
						onChange={event => setPassword(event.target.value)}
					/>
				</form>
			</div>
			<Button variant='contained' color='primary' onClick={handleSubmit}>
				Сохранить изменения
			</Button>
		</>
	)
}
export default General
