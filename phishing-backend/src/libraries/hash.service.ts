import { ConfigService } from '@nestjs/config';
import { ObjectLiteral } from 'typeorm';
import hashingConfig from '../config/hashing';
import * as argon2 from 'argon2';
import HashingDriver from '../enums/hashing-driver.enum';
import { Secret } from '@attract/smart-resources/helpers';

export class HashService {
  /**
   * Config service for service operations.
   *
   * @protected
   */
  protected configService: ConfigService;

  /**
   * Class constructor.
   */
  constructor() {
    this.configService = new ConfigService(hashingConfig());
  }

  /**
   * Hash given string.
   *
   * @param raw
   */
  public async hash(raw: string) {
    const driver: HashingDriver =
      this.configService.get<HashingDriver>('driver');

    if (driver == HashingDriver.ARGON) {
      return argon2.hash(raw, this.getValidConfig());
    }

    throw new Error('Unsupported hashing driver.');
  }

  /**
   * Verify given strings to be encoded by same way.
   *
   * @param raw
   * @param encoded
   */
  public async verify(raw: string, encoded: string) {
    const driver: HashingDriver =
      this.configService.get<HashingDriver>('driver');

    if (driver == HashingDriver.ARGON) {
      return argon2.verify(encoded, raw, {
        secret: this.getValidConfig().secret,
      });
    }

    throw new Error('Unsupported hashing driver: `' + driver + '`.');
  }

  /**
   * Fetch valid config from config service.
   *
   * @private
   */
  private getValidConfig() {
    const driver = this.configService.get<HashingDriver>('driver');
    const config = this.configService.get<ObjectLiteral>(`drivers.${driver}`);

    return {
      ...config,
      secret: this.configService.get<Secret<Buffer>>('secret').release(),
    };
  }
}
