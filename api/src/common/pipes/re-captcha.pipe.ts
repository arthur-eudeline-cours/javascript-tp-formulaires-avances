import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  PipeTransform,
  UnauthorizedException
} from '@nestjs/common';
import fetch from 'node-fetch';
import FormData = require("form-data");

@Injectable()
export class ReCaptchaPipe implements PipeTransform {
  
  constructor (
    private readonly required: boolean = true
  ) {
  }
  
  
  async verifyRecaptchaToken (token: string, key:string): Promise<true | never> {
    
    if (!process.env['RECAPTCHA_SECRET_KEY']) {
      throw new InternalServerErrorException({
        statusCode: 500,
        message: [
          `You forgot to set RECAPTCHA_SECRET_KEY key in your .env file at the project root. If you have not .env file, just copy and rename .env.sample to .env and set the value !`
        ],
        error: "Internal Server Error"
      })
    }
    
    const formData = new FormData();
    formData.append("secret", process.env['RECAPTCHA_SECRET_KEY']);
    formData.append("response", token);
    
    // noinspection SpellCheckingInspection
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      body: formData
    });
    
    const check = (await response.json()).success;
    if (check !== true)
      throw new UnauthorizedException({
        statusCode: 401,
        message: [
          `${key} : you have failed your the reCAPTCHA challenge`
        ],
        error: "unauthorized"
      });
    
    return true;
  }
  
  
  async transform (value: any, metadata: ArgumentMetadata) {
    if ("grecaptcha" in value) {
      await this.verifyRecaptchaToken(value["grecaptcha"], "grecaptcha");
      delete(value["grecaptcha"]);
    }
    
    return value;
  }
}
