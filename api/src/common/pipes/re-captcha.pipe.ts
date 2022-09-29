import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform, UnauthorizedException} from '@nestjs/common';
import fetch from 'node-fetch';
import FormData = require("form-data");

@Injectable()
export class ReCaptchaPipe implements PipeTransform {
  
  constructor (
    private readonly required: boolean = true
  ) {
  }
  
  
  async verifyRecaptchaToken (token: string): Promise<true | never> {
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
          "you have failed your the reCAPTCHA challenge"
        ],
        error: "unauthorized"
      });
    
    return true;
  }
  
  
  async transform (value: any, metadata: ArgumentMetadata) {
    if ("g-recaptcha-response" in value) {
      await this.verifyRecaptchaToken(value["g-recaptcha-response"]);
      delete(value["g-recaptcha-response"]);
    } else if ("grecaptcha" in value) {
      await this.verifyRecaptchaToken(value["grecaptcha"]);
      delete(value["grecaptcha"]);
    } else if (this.required) {
      throw new BadRequestException({
        statusCode: 400,
        message: [
          "reCAPTCHA is required"
        ],
        error: "bad request"
      })
    }
    
    return value;
  }
}
