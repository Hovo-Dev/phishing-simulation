import * as argon2 from 'argon2';
import { ConfigService } from '@nestjs/config';
import HashingDriver from "../enums/hashing-driver.enum";
import hashingConfig from "../config/hashing.config";

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
      return argon2.hash(raw);
    }

    throw new Error('Unsupported hashing driver.');
  }

  /**
   * Verify given strings to be encoded by same way.
   *
   * @param raw
   * @param encoded
   */
  public async verify(raw: string, encoded: string): Promise<boolean> {
    const driver: HashingDriver =
      this.configService.get<HashingDriver>('driver');

    if (driver == HashingDriver.ARGON) {
      return argon2.verify(encoded, raw);
    }

    throw new Error('Unsupported hashing driver: `' + driver + '`.');
  }
}
