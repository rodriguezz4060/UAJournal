import { IsEmail, Length, Validate } from 'class-validator';
import { IsUniqueConstraint } from '../../auth/validations/is-unique-constraint';
import { IsUnique } from '../../auth/validations/is-unique';

export class CreateUserDto {
  @Length(3)
  fullName: string;

  @IsEmail(undefined, { message: 'Неверная почта' })
  // @Validate(IsUniqueConstraint)
  @IsUnique({ tableName: 'users', column: 'email' })
  email: string;

  @Length(6, 32, { message: 'Пароль должен минимум 6 символов' })
  password?: string;
}
