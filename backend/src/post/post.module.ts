import { Module } from '@nestjs/common'
import { PostService } from './post.service'
import { PostController } from './post.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostEntity } from './entities/post.entity'
import { RatingEntity } from './entities/rating.entity'

@Module({
	imports: [TypeOrmModule.forFeature([PostEntity, RatingEntity])],
	controllers: [PostController],
	providers: [PostService]
})
export class PostModule {}
