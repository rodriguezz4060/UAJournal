import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RatingEntity } from '../post/entities/rating.entity'
import { Repository } from 'typeorm'

@Injectable()
export class RatingService {
	constructor(
		@InjectRepository(RatingEntity)
		private readonly ratingRepository: Repository<RatingEntity>
	) {}

	async getAllRatings(): Promise<RatingEntity[]> {
		return this.ratingRepository.find()
	}
}
