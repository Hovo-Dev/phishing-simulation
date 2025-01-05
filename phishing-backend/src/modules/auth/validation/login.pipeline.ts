import * as v from 'valibot';
import { I18nService } from 'nestjs-i18n';
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
    protected i18n: I18nService,
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
        v.string((issue) => this.trans('email', 'required', issue)),
        v.trim(),
        v.toLowerCase(),
        v.checkAsync(modelExistsRule('email', this.userRepository), (issue) =>
          this.trans('email', 'user_not_found', issue, 'auth'),
        ),
      ),
      password: v.string((issue) => this.trans('password', 'required', issue)),
    });
  }
}
