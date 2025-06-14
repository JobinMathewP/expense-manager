import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'Name of the user' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '+918822334477',
    description: 'Phone number of the user',
  })
  @IsPhoneNumber(null)
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the user',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email: string | null;
}
