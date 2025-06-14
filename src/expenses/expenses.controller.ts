import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
// import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';

@ApiTags('expenses')
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new expense' })
  @ApiResponse({ status: 201, description: 'Expense created successfully.' })
  @ApiResponse({ status: 400, description: 'Validation error.' })
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all expenses with cursor-based pagination' })
  @ApiResponse({ status: 200, description: 'List of expenses.' })
  @ApiResponse({ status: 400, description: 'Validation error.' })
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.expensesService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an expense by ID' })
  @ApiResponse({ status: 200, description: 'Expense found.' })
  @ApiResponse({ status: 404, description: 'Expense not found.' })
  async findOne(@Param('id') id: string) {
    const expense = await this.expensesService.findOne(id);
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
    return expense;
  }

  // @Patch(':id')
  // @ApiOperation({ summary: 'Update an expense by ID' })
  // @ApiResponse({ status: 200, description: 'Expense updated successfully.' })
  // @ApiResponse({ status: 404, description: 'Expense not found.' })
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateExpenseDto: UpdateExpenseDto,
  // ) {
  //   const expense = await this.expensesService.update(id, updateExpenseDto);
  //   if (!expense) {
  //     throw new NotFoundException(`Expense with ID ${id} not found`);
  //   }
  //   return expense;
  // }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete an expense by ID' })
  @ApiResponse({
    status: 204,
    description: 'Expense soft deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Expense not found.' })
  async remove(@Param('id') id: string) {
    const result = await this.expensesService.remove(id);
    if (!result) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
  }
}
