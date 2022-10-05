import {IsIn, IsInt, IsOptional, IsPositive, IsString} from "class-validator";
import {Type} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";


export class FindAllDto {
  
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @IsPositive()
  @ApiProperty({
    description: "Numéro de la page de résultats que vous voulez afficher.",
    default: 1,
    example: 1,
    required: false,
  })
  page: number = 1;
  
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  @IsInt()
  @ApiProperty({
    description: "Le nombre de résultats à afficher par page",
    default: 10,
    example: 20,
    required: false,
  })
  perPage: number = 10;
  
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Une phrase utiliser pour filtrer les commentaires",
    example: "massa id",
    required: false,
  })
  search?: string;
  
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: "Sur quelle propriété se baser pour ordonner les résultats",
    default: "createdAt",
    required: false,
  })
  orderBy?: string = "createdAt";
  
  @IsString()
  @IsOptional()
  @IsIn(["ASC", "DESC"])
  @ApiProperty({
    description: "L'ordre dans lequel ordonner les résultats",
    required: false,
    default: "DESC"
  })
  order?: string = "DESC";
}