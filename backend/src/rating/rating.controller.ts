import { Controller, Get } from '@nestjs/common'
import { RatingService } from './rating.service'
import { RatingEntity } from '../post/entities/rating.entity'

@Controller('rating')
export class RatingController {
	constructor(private readonly ratingService: RatingService) {}

	@Get()
	async getAllRatings(): Promise<RatingEntity[]> {
		return this.ratingService.getAllRatings()
	}
}
