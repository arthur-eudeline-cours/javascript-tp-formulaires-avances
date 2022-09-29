import {Injectable} from '@nestjs/common';
import {BaseService} from "../common/base.service";
import {CommentEntity} from "./entities/comment.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {UserService} from "../user/user.service";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {FindAllDto} from "../common/dto/find-all.dto";

@Injectable()
export class CommentService extends BaseService<CommentEntity> {
  protected readonly allowedOrderBy: Array<keyof CommentEntity> = ["id", "createdAt", "rating"];
  protected readonly defaultSearchKey: string = "content";
  
  constructor (
    @InjectRepository(CommentEntity)
    protected readonly repository: Repository<CommentEntity>,
    private readonly userService: UserService,
  ) {
    super();
  }
  
  
  async create (createDto: CreateCommentDto) {
    const username = createDto.username;
    delete createDto.username;
    return super.create({
      ...createDto,
      author: await this.userService.create({
        username,
        imageUrl: this.userService.getRandomUserImageUrl()
      })
    });
  }
  
  
  async findAll (query: FindAllDto) {
    if (!query.orderBy)
      query.orderBy = "createdAt";
    
    if (!query.order)
      query.order = "DESC"
    
    return super.findAll(query);
  }
}
