import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { UserEntity } from './user/entities/user.entity'
import { PostModule } from './post/post.module'
import { PostEntity } from './post/entities/post.entity'
import { CommentModule } from './comment/comment.module'
import { CommentEntity } from './comment/entities/comment.entity'
import { AuthModule } from './auth/auth.module'
import { AwsController } from './aws/aws.controller'
import { AwsModule } from './aws/aws.module'
import { ConfigModule } from '@nestjs/config'
import { RatingEntity } from './post/entities/rating.entity'
import { RatingModule } from './rating/rating.module'
import { FollowingEntity } from './user/entities/following.entity'

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: '94.241.173.93',
			port: 5432,
			username: 'gen_user',
			password: 'Myangels9bb',
			database: 'default_db',
			entities: [
				UserEntity,
				PostEntity,
				CommentEntity,
				RatingEntity,
				FollowingEntity
			],
			synchronize: true
		}),
		UserModule,
		PostModule,
		CommentModule,
		AuthModule,
		AwsModule,
		ConfigModule.forRoot(),
		RatingModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
