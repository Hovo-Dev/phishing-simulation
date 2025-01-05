import * as v from 'valibot';
import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';
import UserRepository from '../../database/repositories/user.repository';
import modelUniqueRule from '../../../libraries/validation/model-unique.rule';
import DefaultValidationPipe from '../../../libraries/validation/validation.pipeline';
import { emailRegExp, passwordRegExp } from '../../../constants/regexp.constants';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  password_confirmation: string;
}

@Injectable()
export default class RegisterValidationPipe extends DefaultValidationPipe {
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
    return v.pipeAsync(
      v.objectAsync({
        name: v.pipe(
          v.string((issue) => this.trans('name', 'required', issue)),
          v.trim(),
          v.minLength(3, (issue) => this.trans('name', 'min.string', issue)),
          v.maxLength(50, (issue) => this.trans('name', 'max.string', issue)),
        ),
        email: v.pipeAsync(
          v.string((issue) => this.trans('email', 'required', issue)),
          v.trim(),
          v.toLowerCase(),
          v.regex(emailRegExp, (issue) => this.trans('email', 'email', issue)),
          v.checkAsync(modelUniqueRule('email', this.userRepository), (issue) =>
            this.trans('email', 'unique', issue),
          ),
        ),
        password: v.pipe(
          v.string((issue) => this.trans('password', 'required', issue)),
          v.minLength(12, (issue) =>
            this.trans('password', 'min.string', issue),
          ),
          v.maxLength(30, (issue) =>
            this.trans('password', 'max.string', issue),
          ),
          v.regex(passwordRegExp, (issue) =>
            this.trans('password', 'password', issue),
          ),
        ),
        password_confirmation: v.string((issue) =>
          this.trans('password_confirmation', 'required', issue),
        ),
      }),
      v.forward(
        // @ts-ignore
        v.partialCheck(
          [['password'], ['password_confirmation']],
          (input) => input.password === input.password_confirmation,
          (issue) => this.trans('password', 'confirmed', issue),
        ),
        ['password'],
      ),
    );
  }
}
