import { registerAs } from '@nestjs/config';
import { argon2i, Options } from 'argon2';
import HashingDriver from '../enums/hashing-driver.enum';

export default registerAs('hashing', () => ({
  // Current project driver
  driver: HashingDriver.ARGON,

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
