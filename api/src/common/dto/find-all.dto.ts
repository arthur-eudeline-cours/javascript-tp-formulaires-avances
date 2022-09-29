import {IsIn, IsInt, IsOptional, IsPositive, IsString} from "class-validator";
import {Type} from "class-transformer";


export class FindAllDto {
  
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @IsPositive()
  page: number = 1;
  
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  @IsInt()
  perPage: number = 10;
  
  @IsString()
  @IsOptional()
  search?: string;
  
  @IsOptional()
  @IsString()
  orderBy?: string = "createdAt";
  
  @IsString()
  @IsOptional()
  @IsIn(["ASC", "DESC"])
  order?: string = "DESC";
}