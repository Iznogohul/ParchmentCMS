import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcrypt";
import mongoose, { Model } from "mongoose";

import { UpdateUserDto } from "../auth/dto/update-user.dto";
import { BlogPostUser, BlogPostUserDocument } from "../schemas/user.schema";

import { LoginUserDto } from "@/auth/dto/login-user.dto";
import { RegisterUserDto } from "@/auth/dto/register-user.dto";

/**
 * @class UserService
 * UserService is responsible for managing user-related operations,
 * including registration, user information updates and more.
 */
@Injectable()
export class UserService {
  /**
   * Creates an instance of the UserService.
   *
   * @param {Model<BlogPostUser>} userModel - The Mongoose model for the BlogPostUser schema,
   * allowing interaction with the user data in the database.
   */
  constructor(@InjectModel(BlogPostUser.name) private userModel: Model<BlogPostUser>) {}

  /**
   * Registers a new user in the system after validating that
   * the username and email are not already in use.
   *
   * @param {RegisterUserDto} registerUserDto - The data transfer object containing user registration information.
   * @returns {Promise<Partial<BlogPostUser>>} - A promise that resolves to the newly created user data, excluding the password.
   * @throws {ConflictException} - If a user with the same username or email already exists.
   */
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

    const { password: _, ...userWithoutPassword } = savedUser.toObject();
    return userWithoutPassword;
  }

  /**
   * Compares a plain text password with a hashed password.
   *
   * @param {string} password - The plain text password to compare.
   * @param {string} hashedPassword - The hashed password to compare against.
   * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the passwords match.
   */
  public async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  /**
   * Finds a user by their username.
   *
   * @param {string} username - The username of the user to find.
   * @returns {Promise<BlogPostUserDocument>} - A promise that resolves to the user document if found.
   */
  async findByUsername(username: string): Promise<BlogPostUserDocument> {
    return await this.userModel.findOne({ username }).exec();
  }

  /**
   * Finds a user by their username or email.
   *
   * @param {string} identifier - The username or email of the user to find.
   * @returns {Promise<BlogPostUserDocument>} - A promise that resolves to the user document if found.
   */
  async findByUsernameOrEmail(identifier: string): Promise<BlogPostUserDocument> {
    return await this.userModel.findOne({ $or: [{ username: identifier }, { email: identifier }] }).exec();
  }

  /**
   * Finds a user by their ID.
   *
   * @param {string} userId - The ID of the user to find.
   * @returns {Promise<BlogPostUserDocument>} - A promise that resolves to the user document if found.
   * @throws {NotFoundException} - If the user is not found.
   */
  async findById(userId: string): Promise<BlogPostUserDocument> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  /**
   * Validates a user by their login credentials, checking if the user exists and
   * if the password is correct.
   *
   * @param {LoginUserDto} loginUserDto - The data transfer object containing the login credentials.
   * @returns {Promise<BlogPostUserDocument>} - A promise that resolves to the user document if validation is successful.
   * @throws {NotFoundException} - If the user is not found.
   * @throws {UnauthorizedException} - If the password is invalid.
   */
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

  /**
   * Updates the name of a user.
   *
   * @param {mongoose.Types.ObjectId} userId - The ID of the user to update.
   * @param {UpdateUserDto} updateUserDto - The data transfer object containing the new user name.
   * @returns {Promise<Partial<BlogPostUser>>} - A promise that resolves to the updated user data, excluding the password.
   * @throws {NotFoundException} - If the user is not found.
   */
  public async updateUserName(userId: mongoose.Types.ObjectId, updateUserDto: UpdateUserDto): Promise<Partial<BlogPostUser>> {
    const { name } = updateUserDto;

    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException("User not found");
    }

    user.name = name;
    const updatedUser = await user.save();

    const { password: _, ...userWithoutPassword } = updatedUser.toObject();
    return userWithoutPassword;
  }
}
