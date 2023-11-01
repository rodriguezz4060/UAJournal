import React, { useState } from 'react'
import { Avatar } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { selectFollowers } from '../../../redux/slices/usersFollowersSlice'

interface UsersFollowInfoProps {
	following: string[]
	followers: string[]
	userId: number
	avatar: string
}

export const UsersFollowInfo: React.FC<UsersFollowInfoProps> = ({
	following,
	userId,
	avatar
}) => {
	const followers = useSelector(selectFollowers)

	return (
		<>
			<b>Подписчики</b>
			{followers.map(item => (
				<Avatar key={item.id} src={avatar} />
			))}
			<b>Подписки</b>
			<div className='d-flex mt-15'>
				{following.map(item => (
					<Avatar key={item.id}>{item.fullName[0]}</Avatar>
				))}
			</div>
		</>
	)
}
