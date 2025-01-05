import { PipeTransform } from '@nestjs/common';
import * as v from 'valibot';
import { ObjectSchema, SchemaWithPipe, SchemaWithPipeAsync } from 'valibot';
import { ObjectLiteral } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import ValidationException, {
  BaseIssue,
  SchemaPipe,
  SchemaPipeAsync,
} from '../../exceptions/ValidationException';
import { ObjectSchemaAsync } from 'valibot/dist';
import { toFixed } from '../number';

export default abstract class DefaultValidationPipe implements PipeTransform {
  /**
   * Localisation service.
   *
   * @protected
   */
  protected abstract i18n: I18nService;

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
    | ObjectSchema<ObjectLiteral, any>
    | ObjectSchemaAsync<ObjectLiteral, any>
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
      : v.safeParse(rules as ObjectSchema<ObjectLiteral, any>, input);

    if (!result.success) {
      throw new ValidationException().withErrors(result.issues);
    }

    return input as v.InferOutput<typeof rules>;
  }

  /**
   * Translate given rule and field validation arguments.
   *
   * @param attribute
   * @param rule
   * @param args
   * @param translationBase
   * @protected
   */
  public trans(
    attribute: string,
    rule: string,
    args: BaseIssue,
    translationBase: string = 'validation',
  ): string {
    const attributeKey = 'validation.attributes.' + attribute;
    const attrTranslation = this.i18n.t(attributeKey) as string;

    args.field = attribute;
    args.attribute =
      attributeKey !== attrTranslation ? attrTranslation : attribute;

    if (rule == 'max.file') {
      args.requirement = toFixed(
        (args.requirement as number) / (1024 * 1024),
        0,
      );
    }

    return this.i18n.t(`${translationBase}.` + rule, { args });
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
