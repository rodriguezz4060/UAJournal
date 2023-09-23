import { Post } from '../components/Post'
import { MainLayout } from '../layouts/MainLayout'
import { Api } from '../utils/api'
import { NextPage } from 'next'
import { PostItem, ResponseUser } from '../utils/api/types'
import { useState } from 'react'

interface HomeProps {
  posts: PostItem[]
  user: ResponseUser
}

const Home: NextPage<HomeProps> = ({ posts, user }) => {
  const [postList, setPostList] = useState(posts)

  const handleRemovePost = (id: number) => {
    const updatedList = postList.filter(post => post.id !== id)
    setPostList(updatedList)
  }

  return (
    <MainLayout>
      {postList.map(obj => (
        <Post
          key={obj.id}
          id={obj.id}
          title={obj.title}
          description={obj.description}
          user={obj.user}
          onRemove={handleRemovePost}
        />
      ))}
    </MainLayout>
  )
}

export const getServerSideProps = async ctx => {
  try {
    const posts = await Api().post.getAll()
    return {
      props: {
        posts,
      },
    }
  } catch (err) {
    console.log(err)
  }
  return {
    props: {
      posts: null,
    },
  }
}

export default Home
