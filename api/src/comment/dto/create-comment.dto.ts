import {CommentEntity} from "../entities/comment.entity";
import {IsNotEmpty, IsOptional, IsString, Length, Matches, ValidateNested} from "class-validator";
import {ApiProperty, OmitType} from "@nestjs/swagger";


export class CreateCommentDto extends OmitType(CommentEntity, ["id", "createdAt", "author"] as const) {
  
  @IsNotEmpty()
  @IsString()
  @Length(5, 15)
  @Matches(/^[a-zA-Z\d]*$/)
  @ApiProperty({
    description: "Le username auquel rattacher le commentaire. S'il n'existe pas, il sera créé en base de données.",
    format: "/^[a-zA-Z\d]*$/",
    example: "myAwesomeUsername",
    maxLength: 15,
    minLength: 5,
  })
  username: string;
  
  @IsOptional()
  "g-recaptcha-response"?: string
  
  @IsOptional()
  @ApiProperty({
    description: "La réponse de verification reCAPTCHA",
    required: true,
    example: "03AIIukziM7HFY0n1Caihb3zRGnR6tNIr3QihbGQ6t6WuMrznmMfQDV12Z2gRILeyXQcK16BITwze-j_UiYpD0ydxFaVwweW2Hhr59MufSQA-eMUtJ0YDB7tnB8q5F9wxDTnzYesjOGbksHUMDlbqPnT1WOME6J_2p483X_-TWURXLhqhsHMz5LPYSeEdnUOgdHnsauxtsSXdbJ7upjc3bm_aNSWKIk34Zb-OxDBQ6XfoxkXgZ_63AJN3Qf14A9msE3foTjpj5Ho4XSSH2_SYv_Aw7iaLukmMVM1DP9uKyZLl65BtkJQGbTPjpwQjj51UGKUgeDg7Z782kGtxtJswLBYuk_yv5YWTYEhZ546eTcb1kIlhsM3E_ILahATHBMBglVBDN78hBaVAWgUpqmEDnpG8vWmmVx1tNsJq4-eWgd1OfhDDoiOHcnBzCvi3tr8XUcoBuMwFxGWDoRQLfdFyEMl7L1_ByTVE3n8Vwkwu-litHCwD3iqhD_GW0bMMWUI6rmboZgjbbc11qMOA9s23vLL57eZqfUOAf1PD-QIUjz4mQgVxmXQyD8LSUxMIYeec_ypTgbWIcuwr6au8Eqv5ynxTSfhUjnoCscA"
  })
  grecaptcha?:string;
}
