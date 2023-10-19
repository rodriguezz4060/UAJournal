import React, { useState } from 'react'
import { Avatar } from '@material-ui/core'
import styles from '../Porfile.module.scss'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { useAppSelector } from '../../../redux/hooks'
import { selectUserData, setUserData } from '../../../redux/slices/user'
import UsersProfileHeaderCover from './UsersProfileHeaderCover'
import { ResponseUser } from '../../../utils/api/types'

interface AvatarUploaderProps {
	user: ResponseUser
}

const UsersProfileAvatar = ({ user }: AvatarUploaderProps) => {
	return (
		<div className={styles.pageWrapper}>
			<style>
				{`
          :root {
            --wrapper-padding-top: 40px;
            --max-width-container: 900px
          }
        `}
			</style>
			<UsersProfileHeaderCover user={user} />
			<div>
				<div className={styles.header__avatar}>
					<div className={styles.headerAvatar}>
						<div className={styles.headerAvatar__media}>
							<Avatar
								style={{ width: 120, height: 120, borderRadius: 6 }}
								src={user?.avatarUrl}
								aria-controls='avatar-menu'
								aria-haspopup='true'
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UsersProfileAvatar
