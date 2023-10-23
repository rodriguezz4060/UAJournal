import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PostEntity } from './entities/post.entity'
import { SearchPostDto } from './dto/searchg-post.dto'
import { User } from '../decorators/user.decorator'
import { RatingEntity } from './entities/rating.entity'

@Injectable()
export class PostService {
	constructor(
		@InjectRepository(PostEntity)
		private repository: Repository<PostEntity>,
		@InjectRepository(RatingEntity)
		private ratingRepository: Repository<RatingEntity>
	) {}

	async changeRating(
		postId: number,
		increment: number,
		userId: number
	): Promise<void> {
		const post = await this.repository.findOne(postId)
		if (!post) {
			throw new NotFoundException('Пост не найден')
		}

		if (increment === 1 || increment === -1) {
			const rating = await this.ratingRepository.findOne({
				where: { postId, userId }
			})
			if (rating) {
				throw new BadRequestException('Вы уже оценили этот пост')
			}

			post.rating += increment
			await this.repository.save(post)

			const newRating = this.ratingRepository.create({
				postId,
				userId,
				increment
			})
			await this.ratingRepository.save(newRating)
		} else {
			throw new BadRequestException('Неверное значение инкремента рейтинга')
		}
	}

	findAll() {
		return this.repository.find({
			order: {
				createdAt: 'DESC'
			}
		})
	}

	async popular() {
		const qb = this.repository.createQueryBuilder()

		qb.orderBy('views', 'DESC')
		qb.limit(10)

		const [items, total] = await qb.getManyAndCount()

		return {
			items,
			total
		}
	}

	async search(dto: SearchPostDto) {
		const qb = this.repository.createQueryBuilder('p')

		qb.leftJoinAndSelect('p.user', 'user')

		qb.limit(dto.limit || 0)
		qb.take(dto.take || 10)

		if (dto.views) {
			qb.orderBy('views', dto.views)
		}

		if (dto.body) {
			qb.andWhere(`p.body ILIKE :body`)
		}

		if (dto.title) {
			qb.andWhere(`p.title ILIKE :title`)
		}

		if (dto.tag) {
			qb.andWhere(`p.tags ILIKE :tag`)
		}

		qb.setParameters({
			title: `%${dto.title}%`,
			body: `%${dto.body}%`,
			tag: `%${dto.tag}%`,
			views: dto.views || ''
		})

		const [items, total] = await qb.getManyAndCount()

		return { items, total }
	}

	async findOne(id: number) {
		await this.repository
			.createQueryBuilder('posts')
			.whereInIds(id)
			.update()
			.set({
				views: () => 'views + 1'
			})
			.execute()

		return this.repository.findOne(id)
	}

	create(dto: CreatePostDto, userId: number) {
		const firstParagraph = dto.body.find(obj => obj.type === 'paragraph')?.data
			?.text
		return this.repository.save({
			title: dto.title,
			body: dto.body,
			tags: dto.tags,
			user: { id: userId },
			description: firstParagraph || ''
		})
	}

	async update(id: number, dto: UpdatePostDto, userId: number) {
		const find = await this.repository.findOne(+id)

		if (!find) {
			throw new NotFoundException('Статья не найдена')
		}

		const firstParagraph = dto.body.find(obj => obj.type === 'paragraph')?.data
			?.text

		return this.repository.update(id, {
			title: dto.title,
			body: dto.body,
			tags: dto.tags,
			user: { id: userId },
			description: firstParagraph || ''
		})
	}

	async remove(id: number, userId: number) {
		const find = await this.repository.findOne(+id)

		if (!find) {
			throw new NotFoundException('Статья не найдена')
		}

		if (find.user.id !== userId) {
			throw new ForbiddenException('Нет доступа к этой статье!')
		}

		return this.repository.delete(id)
	}
}
