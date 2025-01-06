import * as v from 'valibot';
import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import UserRepository from '../../database/repositories/user.repository';
import modelExistsRule from '../../../libraries/validation/model-exists.rule';
import DefaultValidationPipe from '../../../libraries/validation/validation.pipeline';

export class LoginDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

@Injectable()
export default class LoginValidationPipe extends DefaultValidationPipe {
  constructor(
    private readonly userRepository: UserRepository,
  ) {
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
      email: v.pipeAsync(
        v.string(),
        v.trim(),
        v.toLowerCase(),
        v.checkAsync(
          modelExistsRule('email', this.userRepository),
          () => 'User Not Found',
        ),
      ),
      password: v.pipe(
          v.string(),
          v.minLength(8),
          v.maxLength(30),
      ),
    });
  }
}
