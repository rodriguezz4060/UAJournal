import React from "react";
import {Paper, Typography} from "@material-ui/core";
import styles from './FullPost.module.scss';
import {PostAction} from "../PostActions";

export const FullPost = () => {
    return (
        <div>
            <Paper elevation={0} className={styles.paper}>
                <div style={{margin: '0 auto', width: 680}}>
                    <Typography variant="h4" className={styles.title}>Оценки Starfield — 88 баллов из 100 на
                        Metacritic</Typography>
                    <div>
                        <Typography>
                            31 августа 2023 года, за несколько часов до открытия раннего доступа к Starfield, ведущие
                            издания
                            опубликовали обзоры игры. На Metacritic средняя оценка научно-фантастической RPG составила
                            88
                            баллов
                            из 100 на базе 42 рецензий.
                        </Typography>
                    </div>
                    <div>
                        <Typography>
                            На агрегаторе OpenCritic средний рейтинг составил 87 баллов из 100 на основе 76 рецензий.
                            93%
                            журналистов порекомендовали игру к прохождению.
                        </Typography>
                    </div>
                    <div>
                        <Typography>
                            Журналисты сошлись во мнении, что Starfield — одна из самых масштабных и увлекательных игр
                            за
                            последние годы. В неё можно погрузиться на множество десятков часов, исследуя сотни планет и
                            проходя многочисленные квесты. Делать это по-настоящему увлекательно в том числе за счёт
                            отличной и глубокой системы прокачки навыков.
                        </Typography>
                    </div>
                    <div>
                        <Typography>
                            Журналисты сошлись во мнении, что Starfield — одна из самых масштабных и увлекательных игр
                            за
                            последние годы. В неё можно погрузиться на множество десятков часов, исследуя сотни планет и
                            проходя многочисленные квесты. Делать это по-настоящему увлекательно в том числе за счёт
                            отличной и глубокой системы прокачки навыков.
                        </Typography>
                        <div style={{width: 250, marginLeft: -14}}>
                            <PostAction/>
                        </div>
                        <div className={styles.userInfo}>
                            <img
                                src="https://leonardo.osnova.io/0a8758f4-966c-5e4f-bf7d-c798f83ee4a6/-/scale_crop/64x64/-/format/webp/"
                                alt="Avatar"/>
                            <b>Bender Rodriguez</b>
                            <span>+506</span>
                        </div>
                    </div>
                </div>
            </Paper>
        </div>
    )
}