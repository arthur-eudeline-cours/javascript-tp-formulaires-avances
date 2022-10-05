import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "../../user/entities/user.entity";
import {IsInt, IsOptional, IsString, Length, Max, Min, ValidateNested} from "class-validator";
import {BaseEntity} from "../../common/entity/base.entity";
import {Type} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";


@Entity()
export class CommentEntity extends BaseEntity {
  
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5)
  @Column()
  @ApiProperty({
    description: "La note entre 1 et 5 (entier) du commentaire produit",
    required: true,
    format: "int",
    example: 4,
  })
  rating: number;
  
  @IsString()
  @Length(0, 150)
  @IsOptional()
  @Column({nullable: true})
  @ApiProperty({
    description: "Le contenu du commentaire",
    required: false,
    example: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda doloremque expedita facilis libero, magnam nobis non numquam, odio perferendis porro quibusdam quisquam reprehenderit rerum saepe sequi, sint soluta velit vero."
  })
  content?: string;
  
  @ManyToOne(() => UserEntity, (user) => user.comments, {eager: true})
  
  author: UserEntity;
}