import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginFormSchema } from '../../../utils/validations'
import { FormField } from '../../FormField'
import { LoginDto } from '../../../utils/api/types'
import { setCookie } from 'nookies'
import { useAppDispatch } from '../../../redux/hooks'
import { setUserData } from '../../../redux/slices/user'
import { Api } from '../../../utils/api'
import { Button } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

interface LoginFormProps {
	onOpenRegister: () => void
}

// Предполагаем, что интерфейс ApiError описывает ошибку, возвращаемую сервером
interface ApiError {
	response: {
		data: {
			message: string
		}
	}
}

export const LoginForm: React.FC<LoginFormProps> = ({ onOpenRegister }) => {
	const dispatch = useAppDispatch()
	const [errorMessage, setErrorMessage] = React.useState('')
	const form = useForm<LoginDto>({
		mode: 'onChange',
		resolver: yupResolver(LoginFormSchema)
	})

	const onSubmit = async (dto: LoginDto) => {
		try {
			const data = await Api().user.login(dto)
			setCookie(null, 'rtoken', data.token, {
				maxAge: 30 * 24 * 60 * 60,
				path: '/'
			})
			setErrorMessage('')
			dispatch(setUserData(data))
		} catch (err) {
			// Теперь мы можем безопасно обращаться к err.response.data.message
			console.warn('Register error', err)
			if ((err as ApiError).response) {
				setErrorMessage((err as ApiError).response.data.message)
			} else {
				setErrorMessage('Произошла ошибка при входе в систему.')
			}
		}
	}

	return (
		<div>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField name='email' label='Почта' />
					<FormField name='password' label='Пароль' />
					{errorMessage && (
						<Alert severity='error' className='mb-20'>
							{errorMessage}
						</Alert>
					)}
					<div className='d-flex align-center justify-between'>
						<Button
							disabled={!form.formState.isValid || form.formState.isSubmitting}
							type='submit'
							color='primary'
							variant='contained'
						>
							Войти
						</Button>
						<Button onClick={onOpenRegister} color='primary' variant='text'>
							Регистрация
						</Button>
					</div>
				</form>
			</FormProvider>
		</div>
	)
}
