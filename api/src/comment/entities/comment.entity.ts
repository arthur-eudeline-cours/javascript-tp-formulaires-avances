import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "../../user/entities/user.entity";
import {IsInt, IsOptional, IsString, Length, Max, Min, ValidateNested} from "class-validator";
import {BaseEntity} from "../../common/entity/base.entity";
import {Type} from "class-transformer";


@Entity()
export class CommentEntity extends BaseEntity {
  
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5)
  @Column()
  rating: number;
  
  @IsString()
  @Length(0, 150)
  @IsOptional()
  @Column({nullable: true})
  content?: string;
  
  @ManyToOne(() => UserEntity, (user) => user.comments, {eager: true})
  author: UserEntity;
}