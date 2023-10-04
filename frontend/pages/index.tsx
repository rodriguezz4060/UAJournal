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
          incut={obj.body.filter(item => item.type === 'incut').map(item => item.data.text)}
          quote={obj.body.filter(item => item.type === 'quote').map(item => item.data.text)}
          caption={obj.body.filter(item => item.type === 'quote').map(item => item.data.caption)}
          video={obj.body.filter(item => item.type === 'video').map(item => item.data.file.url)}
          description={obj.description}
          images={obj.body.filter(item => item.type === 'image').map(item => item.data.file.url)}
          user={obj.user}
          createdAt={obj.createdAt}
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
