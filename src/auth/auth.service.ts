import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;

    // Check if user already exists
    const existingUser = await this.prisma.auth.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User already exists'); // this throws a 409 error
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user

    await this.prisma.auth.create({
      data: {
        ...createAuthDto,
        password: hashedPassword,
      },
    });
  }

  async login(email: string, password: string) {
    const user = await this.prisma.auth.findUnique({
      where: { email },
    });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user.id, email: user.email });
    return { token };
  }
}
