import React from 'react'
import styles from './Settings.module.scss'
import { TextField } from '@material-ui/core'

interface GeneralProps {}

const General: React.FC<GeneralProps> = ({}) => {
	return (
		<div>
			<div className={styles.formSection}>
				<label className={styles.formSection__label}>Отображаемое имя</label>
				<form className={styles.textFieldStyles}>
					<TextField
						size='small'
						label=''
						variant='outlined'
						fullWidth
						required
						InputLabelProps={{ shrink: false }}
					/>
				</form>
			</div>
			<div className={styles.formSection}>
				<label className={styles.formSection__label}>Отображаемое имя</label>
				<form className={styles.textFieldStyles}>
					<TextField
						size='small'
						label=''
						variant='outlined'
						fullWidth
						required
						InputLabelProps={{ shrink: false }}
					/>
				</form>
			</div>
		</div>
	)
}

export default General
