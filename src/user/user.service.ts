import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import * as bcrypt from "bcrypt";

import { BlogPostUser, BlogPostUserDocument } from "../schemas/user.schema";
import { RegisterUserDto } from "@/auth/dto/register-user.dto";
import { UpdateUserDto } from "../auth/dto/update-user.dto";
import { LoginUserDto } from "@/auth/dto/login-user.dto";

@Injectable()
export class UserService {
  constructor(@InjectModel(BlogPostUser.name) private userModel: Model<BlogPostUser>) {}

  public async register(registerUserDto: RegisterUserDto): Promise<Partial<BlogPostUser>> {
    const { username, password, email, name } = registerUserDto;
    const existingUser = await this.userModel.findOne({ $or: [{ username }, { email }] }).exec();
    if (existingUser) {
      throw new ConflictException("User with this username or email already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      username,
      password: hashedPassword,
      email,
      name,
    });
    const savedUser = await newUser.save();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = savedUser.toObject();
    return userWithoutPassword;
  }

  public async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async findByUsername(username: string): Promise<BlogPostUserDocument> {
    return await this.userModel.findOne({ username }).exec();
  }

  async findByUsernameOrEmail(identifier: string): Promise<BlogPostUserDocument> {
    return await this.userModel.findOne({ $or: [{ username: identifier }, { email: identifier }] }).exec();
  }

  async findById(userId: string): Promise<BlogPostUserDocument> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async validateUser(loginUserDto: LoginUserDto): Promise<BlogPostUserDocument> {
    const user = await this.findByUsernameOrEmail(loginUserDto.email ?? loginUserDto.username);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    const passwordMatches = await this.comparePassword(loginUserDto.password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException("Invalid password");
    }
    return user;
  }

  public async updateUserName(userId: mongoose.Types.ObjectId, updateUserDto: UpdateUserDto): Promise<Partial<BlogPostUser>> {
    const { name } = updateUserDto;

    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException("User not found");
    }

    user.name = name; // Update the user's name
    const updatedUser = await user.save();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = updatedUser.toObject();
    return userWithoutPassword;
  }
}
