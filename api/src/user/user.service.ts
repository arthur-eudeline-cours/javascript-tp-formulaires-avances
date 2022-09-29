// noinspection JSUnusedGlobalSymbols

import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {
  Repository
} from "typeorm";
import {UserEntity} from "./entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {BaseService} from "../common/base.service";


@Injectable()
export class UserService extends BaseService<UserEntity> {
  
  protected readonly allowedOrderBy: (keyof UserEntity)[] = ["createdAt", "id", "username"];
  
  
  protected readonly defaultSearchKey: string = "search";
  
  private profilePictureIndex = 0;
  private readonly profilePictures = [
    "http://localhost:3030/profil-bender.jpg",
    "http://localhost:3030/profil-fry.jpg",
    "http://localhost:3030/profil-nibbler.gif",
    "http://localhost:3030/profil-zoidberg.jpeg",
  ];
  
  constructor (
    @InjectRepository(UserEntity)
    readonly repository: Repository<UserEntity>
  ) {
    super();
  }
  
  async findByIdOrUsername( idOrUsername: number | string ) {
    const options = {where : {}}
    options.where[typeof idOrUsername === "number" ? "id" : "username"] = idOrUsername;
    
    const result = await this.repository.findOne(options);
    if (!result)
      throw new NotFoundException(`There is no user with the id or username ${idOrUsername}`);
    
    return result;
  }
  
  async getOrCreate(createDto: CreateUserDto) {
    try {
      return await this.findByIdOrUsername(createDto.username);
    } catch (e) {
      return await this.create(createDto);
    }
  }
  
  async create (createDto: CreateUserDto) {
    try {
      return await super.create(createDto);
    } catch (e) {
      if ("errno" in e && e.errno === 19)
        throw new ConflictException({
          statusCode: 409,
          message: [
            "you already have published a review for this product"
          ],
          error: "Conflict"
        });
      throw e;
    }
  }
  
  getRandomUserImageUrl(): string {
    this.profilePictureIndex += 1;
    return this.profilePictures[this.profilePictureIndex % this.profilePictures.length];
  }
}
