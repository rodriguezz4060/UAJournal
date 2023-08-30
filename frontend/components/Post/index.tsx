import React from "react"
import { Paper,Typography } from "@material-ui/core"
import styles from './Post.module.scss'
import Image from "next/image"


export const Post: React.FC = () => {
    return (
      <Paper elevation={0} className='p-20' classes={{ root: styles.paper}}> 
      <Typography variant='h5' className={styles.title}>Закончил Deus Ex: Human Revolution</Typography>
      <Typography className='mt-10 mb-15'>
        Однозначно в личный топ величайших залетает. Первый иммерсив сим, который я прошёл до конца с удовольствием. Рад, что длс закончил уже после кампании, ибо оно сильно выбивается из истории и по сути своей ничего толком не несёт кроме подводки к сиквелу, но за Splinter Cell: Chaos theory спасибо. Хорошо, что делюксовое издание сиквела куплено. Гляну, что там. А так 10/10 короче.
      </Typography>
      <Image 
      src="https://leonardo.osnova.io/cd4e1abe-c5ce-56dd-ad11-834f54ba3160/-/preview/700/-/format/webp/" 
      height={300}
      width={600}
      />
      
        </Paper>
)
}
