import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      //check if user already exists
      const existingUser = await this.userService.findAll();
      if (existingUser.some((user) => user.email === createUserDto.email)) {
        return {
          statusCode: 400,
          message: 'User with this email already exists',
        };
      }
      //create user
      if (!createUserDto.email || !createUserDto.name) {
        return {
          statusCode: 400,
          message: 'Email and password are required',
        };
      }

      await this.userService.create(createUserDto);

      return {
        statusCode: 201,
        message: 'User created successfully',
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Internal server error',
        error: error,
      };
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
