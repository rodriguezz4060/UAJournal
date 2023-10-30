import React from 'react'
import { Avatar } from '@material-ui/core'
import { parseCookies } from 'nookies'


interface UsersFollowInfoProps {
  following: string
  followers: string
  userId: number
}

export const UsersFollowInfo: React.FC<UsersFollowInfoProps> = ({ following, followers, userId }) => {

  const handleFollow = async () => {
    try {
      const cookies = parseCookies()
      const token = cookies.rtoken

      await fetch(`http://localhost:7777/users/${userId}/follow`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // Дополнительный код после успешной подписки
    } catch (error) {
      console.error('Ошибка при подписке:', error)
    }
  }

  const handleUnfollow = async () => {
    try {
      const cookies = parseCookies()
      const token = cookies.rtoken

      await fetch(`http://localhost:7777/users/${userId}/unfollow`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // Дополнительный код после успешного отписывания
    } catch (error) {
      console.error('Ошибка при отписке:', error)
    }
  }

  return (
    <> <b>Подписчики</b>

      {followers.map(item => (
        <li key={item.id}>{item.fullName}</li>
      ))}

      <b>Подписки</b>

      <div className='d-flex mt-15'>
        {following.map(item => (
          <Avatar key={item.id}>{item.fullName[0]} </Avatar>

        ))}
        <button onClick={handleFollow}>Follow</button>
        <button onClick={handleUnfollow}>Unfollow</button>
      </div>
    </>
  )
}
