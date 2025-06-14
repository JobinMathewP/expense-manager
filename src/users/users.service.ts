import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Create a new user.
   * @param createUserDto The data needed to create the user.
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if user with the same phone number or email already exists
    const existingUser = await this.userRepository.findOne({
      where: [
        { phoneNumber: createUserDto.phoneNumber },
        { email: createUserDto.email },
      ],
    });

    if (existingUser) {
      throw new ConflictException(
        'User with this phone number or email already exists.',
      );
    }

    // Create and save the user
    const user = this.userRepository.create({
      ...createUserDto,
      firebaseUID: createUserDto.phoneNumber,
    });
    return this.userRepository.save(user);
  }

  /**
   * Get all users.
   */
  async findAll(): Promise<User[]> {
    return this.userRepository.find({ where: { isDeleted: false } }); // Exclude soft-deleted users
  }

  /**
   * Get a user by their ID.
   * @param id The ID of the user.
   */
  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id, isDeleted: false });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  /**
   * Get a user by their Firebase UID.
   * @param firebaseUid The Firebase UID of the user.
   */
  async findOneByFirebaseUid(firebaseUid: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { firebaseUID: firebaseUid, isDeleted: false },
    });
    if (!user) {
      throw new NotFoundException(
        `User with Firebase UID ${firebaseUid} not found`,
      );
    }
    return user;
  }

  /**
   * Update a user by their ID.
   * @param id The ID of the user.
   * @param updateUserDto The new data for the user.
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id); // Find the user and ensure they exist

    // Update fields only if provided
    Object.assign(user, updateUserDto);

    return this.userRepository.save(user); // Save the updated user
  }

  /**
   * Soft delete a user (set isDeleted = true).
   * @param id The ID of the user.
   */
  async remove(id: string): Promise<void> {
    const user = await this.findOne(id); // Find the user and ensure they exist
    user.isDeleted = true; // Mark the user as deleted
    await this.userRepository.save(user); // Save the soft delete action
  }
}
