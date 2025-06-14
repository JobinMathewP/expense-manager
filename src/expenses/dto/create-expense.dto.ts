import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsOptional,
  IsDateString,
  IsArray,
} from 'class-validator';
import { PaymentMethod } from '../../enums/payment-method.enum';

export class CreateExpenseDto {
  @ApiProperty({
    example: 'Lunch at Restaurant',
    description: 'Title of the expense',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 500, description: 'Amount of the expense' })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 'INR', description: 'Currency code of the expense' })
  @IsNotEmpty()
  currency: string;

  @ApiProperty({ example: 'CARD', description: 'Payment method used' })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiProperty({
    example: '2024-10-08T14:30:00Z',
    description: 'Date and time of the expense in ISO 8601 format',
  })
  @IsDateString() // Ensures the format is ISO 8601
  date: string;

  @ApiProperty({
    example: 'user-id',
    description: 'ID of the user who paid for the expense',
  })
  @IsNotEmpty()
  paidBy: string;

  @ApiProperty({
    example: ['Food', 'Restaurant'],
    description: 'Categories associated with the expense',
  })
  @IsArray()
  @IsOptional()
  categories: string[];

  @ApiProperty({
    example: 'group-activity-id',
    description: 'ID of the related group activity',
    required: false,
  })
  @IsOptional()
  groupActivityId?: string;

  @ApiProperty({
    example: 'Note',
    description: 'Additional notes',
    required: false,
  })
  @IsOptional()
  note?: string;
}
