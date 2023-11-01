import React, { useEffect, useState } from 'react'
import { Avatar } from '@material-ui/core'
import { useUserFollowers } from '../../../hooks/useFollows'
import { ResponseUser } from '../../../utils/api/types'
import { selectFollowers, updateFollowers } from '../../../redux/slices/usersFollowersSlice'
import { useDispatch, useSelector } from 'react-redux'

interface UsersFollowInfoProps {
  following: string[]
  followers: string[]
  userId: ResponseUser
}

export const UsersFollowInfo: React.FC<UsersFollowInfoProps> = ({
                                                                  following,
                                                                  followers,
                                                                  userId,

                                                                }) => {
  return (
    <>
      <div className='d-flex mt-15'><b>Подписчики</b>
        {followers.map(item => (

          <Avatar key={item.id} src={item.avatarUrl} />
        ))}</div>
      <b>Подписки</b>
      <div className='d-flex mt-15'>
        {following.map(item => (
          <Avatar key={item.id}>{item.fullName[0]}</Avatar>
        ))}
      </div>
    </>
  )
}
