import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {CommentEntity} from "../../comment/entities/comment.entity";
import {IsOptional, IsString, IsUrl, Length, Matches} from "class-validator";
import {BaseEntity} from "../../common/entity/base.entity";

@Entity()
export class UserEntity extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id:number;
  
  @CreateDateColumn()
  createdAt: Date;
  
  @Length(5, 15)
  @Matches(/^[a-zA-Z\d]*$/)
  @IsString()
  @Column({unique: true})
  username: string;
  
  @IsString()
  @IsUrl()
  @IsOptional()
  @Column()
  imageUrl: string;
  
  @OneToMany(() => CommentEntity, (comment) => comment.author )
  comments: CommentEntity[];
}