import * as v from 'valibot';
import { PipeTransform } from '@nestjs/common';
import { ObjectSchemaAsync } from 'valibot/dist';
import {ObjectEntries, ObjectSchema, SchemaWithPipe, SchemaWithPipeAsync} from 'valibot';
import ValidationException, {
  SchemaPipe,
  SchemaPipeAsync,
} from '../../exceptions/ValidationException';

export default abstract class DefaultValidationPipe implements PipeTransform {
  /**
   * Determine that parsing should do async.
   *
   * @protected
   */
  protected isAsync: boolean;

  /**
   * Method that return validation schema.
   *
   * @param value
   * @protected
   */
  protected abstract rules(
    value: any,
  ):
    | ObjectSchema<any, any>
    | ObjectSchemaAsync<any, any>
    | SchemaWithPipeAsync<SchemaPipeAsync>
    | SchemaWithPipe<SchemaPipe>;

  /**
   * Apply validation for given schema.
   *
   * @param value
   */
  async transform(value: unknown) {
    const input = this.prepareForValidation(value);
    const rules = this.rules(input);
    const result = this.isAsync
      ? await v.safeParseAsync(rules, input)
      : v.safeParse(rules as ObjectSchema<any, any>, input);

    if (!result.success) {
      throw new ValidationException().withErrors(result.issues);
    }

    return input as v.InferOutput<typeof rules>;
  }

  /**
   * Prepare input object for validation.
   *
   * @param value
   */
  public prepareForValidation(value: unknown) {
    return value;
  }
}
