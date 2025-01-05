import { registerAs } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { Secret } from '@attract/smart-resources/helpers';

// To generate keys for local development run ./src/generate-keys.sh
// Before usage; chmod +x generate-keys.sh
// That will create a new pair of keys.
export default registerAs('auth', () => ({
  // Public key for asymmetric key algorithms
  public_key: new Secret(process.env.APP_AUTHENTICATION_PUBLIC_KEY),

  // Private key for asymmetric key algorithms
  private_key: new Secret(process.env.APP_AUTHENTICATION_PRIVATE_KEY),

  // Amount of days for token lifetime.
  token_lifetime: process.env.APP_AUTHENTICATION_TOKEN_LIFETIME,

  // Settings for jwt generation.
  jwt_settings: {
    expiresIn: process.env.APP_AUTHENTICATION_TOKEN_LIFETIME + 'd',
    algorithm: 'RS256',
    issuer: 'Lucius',
    audience: 'default',
    header: {
      alg: 'RS256',
      typ: 'JWT',
    },
  } as jwt.SignOptions,

  // Length of primary key for token generation.
  id_length: 128,
}));
