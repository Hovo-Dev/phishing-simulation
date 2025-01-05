import * as v from 'valibot';
import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import UserRepository from '../../database/repositories/user.repository';
import modelUniqueRule from '../../../libraries/validation/model-unique.rule';
import {emailRegExp, passwordRegExp} from "../../../constants/regexp.constants";
import DefaultValidationPipe from '../../../libraries/validation/validation.pipeline';

export class RegisterDto {
  @ApiProperty()
  full_name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

@Injectable()
export default class RegisterValidationPipe extends DefaultValidationPipe {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  /**
   * Return whether parsing should do async.
   *
   * @protected
   */
  protected isAsync = true;

  /**
   * Return schema rules for validation.
   *
   * @protected
   */
  protected rules() {
    return v.objectAsync({
        full_name: v.pipe(
            v.string(),
            v.trim(),
            v.minLength(3),
            v.maxLength(50),
        ),
        email: v.pipeAsync(
            v.string(),
            v.trim(),
            v.toLowerCase(),
            v.regex(emailRegExp),
            v.checkAsync(modelUniqueRule('email', this.userRepository), () => "Email is already taken")
        ),
        password: v.pipe(
            v.string(),
            v.minLength(8),
            v.maxLength(30),
            v.regex(passwordRegExp)
        )
    });
  }
}
