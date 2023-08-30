import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css';
import { Header } from '../components/Header';

export default function Home() {
  return (
    <div>
      <Head>
        <title>UAJournal</title>
        <meta name="description" content="UAJournal blog" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
      </Head>
      <Header />
    </div>
  )
}
