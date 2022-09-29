import {FindAllDto} from "./dto/find-all.dto";
import {DeepPartial, FindManyOptions, Like, Repository} from "typeorm";
import {BadRequestException, NotFoundException} from "@nestjs/common";
import {BaseEntity} from "./entity/base.entity";


export abstract class BaseService<T extends BaseEntity> {
  
  protected abstract readonly allowedOrderBy: Array<keyof T>;
  
  
  protected abstract readonly defaultSearchKey: string;
  
  
  protected abstract readonly repository: Repository<T>;
  
  
  async findAll (query: FindAllDto) {
    const options: FindManyOptions<T> = {
      skip: query.perPage * (query.page - 1),
      take: query.perPage,
    };
    
    if (query.orderBy) {
      if (!this.allowedOrderBy.includes(query.orderBy as keyof T))
        throw new BadRequestException({
          statusCode: 400,
          message: [
            `orderBy must be one of the following values ${this.allowedOrderBy.join(" | ")}`
          ],
          error: "Bad Request"
        });
      
      options.order = {};
      options.order[query.orderBy] = query.order;
    }
    
    if (query.search) {
      options.where = {};
      // @ts-ignore
      options.where[this.defaultSearchKey] = Like(`%${query.search}%`);
    }
    
    const [results, count] = await this.repository.findAndCount(options);
    
    return {
      data: results,
      page: query.page,
      pageTotal: Math.ceil(count / query.perPage),
      total: count,
    };
  }
  
  
  async create (createDto: DeepPartial<T>) {
    return await this.repository.save(createDto);
  }
  
  
  async findOne (id: number) {
    // @ts-ignore
    const result = await this.repository.findOne({where: {id}});
    if (!result)
      throw new NotFoundException(`There is no ${this.constructor.name} with this id ${id}`);
    
    return result;
  }
  
  
  async update (id: number, updateDto: DeepPartial<T>) {
    // @ts-ignore
    const existing = await this.repository.findOne({where: {id}});
    const merged = this.repository.merge(existing, updateDto);
    
    return this.repository.save(merged);
  }
  
  
  async remove (id: number) {
    // @ts-ignore
    await this.repository.delete({id: id});
  }
}