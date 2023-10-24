import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('postRating')
export class RatingEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	postId: number

	@Column()
	userId: number

	@Column()
	increment: number
}
