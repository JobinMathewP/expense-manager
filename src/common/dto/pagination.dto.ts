import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ description: 'The cursor for pagination', required: false })
  @IsOptional()
  cursor?: string;

  @ApiProperty({
    description: 'Number of items to return per page',
    default: 10,
  })
  limit: number;
}
