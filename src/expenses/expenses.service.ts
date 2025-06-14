import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from '../entities/expense.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly expensesRepository: Repository<Expense>,
  ) {}

  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    const user = await this.expensesRepository.manager
      .getRepository(User)
      .findOneBy({ id: createExpenseDto.paidBy });
    const expense = this.expensesRepository.create({
      ...createExpenseDto,
      categories: null,
      paidBy: user,
    });
    return this.expensesRepository.save(expense);
  }

  async findAll(paginationDto: PaginationDto): Promise<any> {
    const { cursor, limit } = paginationDto;
    const qb = this.expensesRepository.createQueryBuilder('expense');

    if (cursor) {
      qb.where('expense.id > :cursor', { cursor });
    }

    const expenses = await qb
      .orderBy('expense.id', 'ASC')
      .limit(limit)
      .getMany();

    const nextCursor =
      expenses.length === limit ? expenses[expenses.length - 1].id : null;

    return {
      data: expenses,
      nextCursor,
    };
  }

  async findOne(id: string): Promise<Expense | undefined> {
    return this.expensesRepository.findOneBy({ id });
  }

  //   async update(
  //     id: string,
  //     updateExpenseDto: UpdateExpenseDto,
  //   ): Promise<Expense | undefined> {
  //     await this.expensesRepository.update(id, updateExpenseDto);
  //     return this.findOne(id);
  //   }

  async remove(id: string): Promise<boolean> {
    const expense = await this.findOne(id);
    if (!expense) return false;
    expense.isDeleted = true;
    await this.expensesRepository.save(expense);
    return true;
  }
}
