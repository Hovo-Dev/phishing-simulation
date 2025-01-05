import { registerAs } from '@nestjs/config';
import { argon2i, Options } from 'argon2';
import HashingDriver from '../enums/hashing-driver.enum';
import { Secret } from '@attract/smart-resources/helpers';

export default registerAs('hashing', () => ({
  // Current project driver
  driver: HashingDriver.ARGON,

  // Secret key to sign generated hashes.
  secret: new Secret(Buffer.from(process.env.APP_KEY)),

  // List of available drivers.
  drivers: {
    [HashingDriver.ARGON]: {
      type: argon2i,
      memoryCost: 65536,
      parallelism: 1,
      timeCost: 4,
    },
  } as Partial<Options>,
}));
