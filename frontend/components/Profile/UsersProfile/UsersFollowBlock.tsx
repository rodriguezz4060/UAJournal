import React from 'react'
import { Avatar } from '@material-ui/core'
import { ResponseUser } from '../../../utils/api/types'

interface UsersFollowInfoProps {
	following: number[]
	followers: number[]
	userId: ResponseUser
}

export const UsersFollowInfo: React.FC<UsersFollowInfoProps> = ({
	following,
	followers,
	userId
}) => {
	return (
		<>
			<div className='d-flex mt-15'>
				<b>Подписчики</b>
				{followers.map(item => (
					<div key={item.id}>
						{item.avatarUrl !== '' ? (
							<Avatar src={item.avatarUrl} />
						) : (
							<Avatar>{item.fullName[0]}</Avatar>
						)}
					</div>
				))}
			</div>
			<b>Подписки</b>
			<div className='d-flex mt-15'>
				{following.map(item => (
					<Avatar key={item.id}>{item.fullName[0]}</Avatar>
				))}
			</div>
		</>
	)
}
