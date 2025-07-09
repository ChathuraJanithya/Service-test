import { IsString, IsEmail, MinLength, IsPhoneNumber } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsString()
  @MinLength(1)
  address: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
