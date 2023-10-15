import styles from './Settings.module.scss'
import Link from 'next/link'
import { MainLayout } from '../../../layouts/MainLayout'
import ArrowBackIcon from '@material-ui/icons/ArrowBackIosOutlined'
import ArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import {
	InputAdornment,
	MenuItem,
	Popover,
	TextField,
	ClickAwayListener,
	Grow,
	MenuList,
	Paper,
	Popper,
	makeStyles,
	Theme,
	createStyles,
	Button
} from '@material-ui/core'
import { useState } from 'react'
import React from 'react'
import avatarStyles from '../Porfile.module.scss'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex'
		},
		paper: {
			marginRight: theme.spacing(2)
		}
	})
)

interface SettingsMainProps {
	id: string
	fullName: string
}
const SettingsMain: React.FC<SettingsMainProps> = ({ id, fullName }) => {
	const [userName, setUserName] = useState(fullName)
	const [description, setDescription] = useState('')
	const [selectedOption, setSelectedOption] = useState('Популярное')
	const [error, setError] = useState('')
	const [focused, setFocused] = useState(false)
	const classes = useStyles()
	const [open, setOpen] = React.useState(false)
	const [openSvg, setOpenSvg] = useState(false)
	const anchorRef = React.useRef<HTMLButtonElement>(null)

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

	const handleChange = e => {
		const inputValue = e.target.value
		setDescription(inputValue)
	}

	const handleToggle = () => {
		setOpen(prevOpen => !prevOpen)
	}

	const handleClose = event => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return
		}

		setOpen(false)
	}

	const handleListKeyDown = event => {
		if (event.key === 'Tab') {
			event.preventDefault()
			setOpen(false)
		}
	}

	const handleMenuItemClick = option => {
		setSelectedOption(option)
		setOpen(false)
	}

	const prevOpen = React.useRef(open)
	React.useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current!.focus()
		}

		prevOpen.current = open
	}, [open])

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
													)
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
												multiline
												minRows={2}
												variant='outlined'
												fullWidth
												InputLabelProps={{ shrink: true }}
												InputProps={{
													placeholder: 'Пара слов о себе',
													inputProps: { maxLength: 160 },
													endAdornment:
														description.length <= 150 ? null : (
															<InputAdornment position='end'>
																{160 - description.length}
															</InputAdornment>
														)
												}}
												value={description}
												onChange={handleChange}
											/>
										</form>
									</div>
									<div className={styles.formSection}>
										<label className={styles.formSection__label}>
											Лента по умолчанию
										</label>
										<form>
											<div
												ref={anchorRef}
												aria-controls={open ? 'menu-list-grow' : undefined}
												aria-haspopup='true'
												onClick={handleToggle}
												fullWidth
												className={styles.textarea}
											>
												<TextField
													size='small'
													label=''
													variant='outlined'
													fullWidth
													InputLabelProps={{
														shrink: true,
														style: { cursor: 'pointer' }
													}}
													value={selectedOption}
													onChange={() => {}}
													inputProps={{
														ref: anchorRef,
														style: { cursor: 'pointer' },
														readOnly: true
													}}
													onFocus={() => {
														setFocused(true)
														setOpenSvg(true)
													}}
													onBlur={() => {
														setFocused(false)
														setOpenSvg(false)
													}}
													InputProps={{
														endAdornment: (
															<InputAdornment position='end'>
																{focused ? (
																	<ArrowUpIcon
																		style={{ width: 20, height: 20 }}
																	/>
																) : (
																	<ArrowDownIcon
																		className={styles.arrowIco}
																		style={{ width: 20, height: 20 }}
																	/>
																)}
															</InputAdornment>
														)
													}}
												/>
											</div>
											<Popper
												open={open}
												anchorEl={anchorRef.current}
												role={undefined}
												transition
												disablePortal
												style={{ width: anchorRef.current?.clientWidth }}
											>
												{({ TransitionProps }) => (
													<Grow {...TransitionProps}>
														<Paper
															className={avatarStyles.menuForm}
															style={{ width: '100%', margin: '8px 0' }}
														>
															<ClickAwayListener onClickAway={handleClose}>
																<div className={avatarStyles.avatar_menu__item}>
																	<MenuList
																		autoFocusItem={open}
																		id='menu-list-grow'
																		onKeyDown={handleListKeyDown}
																	>
																		<div
																			className={avatarStyles.avatar_menu__item}
																		>
																			<MenuItem
																				selected={
																					selectedOption === 'Популярное'
																				}
																				onClick={() =>
																					handleMenuItemClick('Популярное')
																				}
																			>
																				Популярное
																			</MenuItem>
																		</div>
																		<div
																			className={avatarStyles.avatar_menu__item}
																		>
																			<MenuItem
																				selected={selectedOption === 'Новое'}
																				onClick={() =>
																					handleMenuItemClick('Новое')
																				}
																			>
																				Новое
																			</MenuItem>
																		</div>
																		<div
																			className={avatarStyles.avatar_menu__item}
																		>
																			<MenuItem
																				selected={
																					selectedOption === 'Моя лента'
																				}
																				onClick={() =>
																					handleMenuItemClick('Моя лента')
																				}
																			>
																				Моя лента
																			</MenuItem>
																		</div>
																	</MenuList>
																</div>
															</ClickAwayListener>
														</Paper>
													</Grow>
												)}
											</Popper>
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
