import React from 'react'
import styles from './Settings.module.scss'
import { TextField } from '@material-ui/core'
import SaveButton from './SaveButton'

interface GeneralProps {}

const General: React.FC<GeneralProps> = ({}) => {
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
						InputLabelProps={{ shrink: false }}
						type='password'
						inputProps={{
							readOnly: true
						}}
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
						type='password'
						InputLabelProps={{ shrink: false }}
					/>
				</form>
			</div>
		</>
	)
}

export default General
