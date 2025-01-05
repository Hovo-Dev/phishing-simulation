import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  // Amount of days for token lifetime.
  token_lifetime: process.env.APP_AUTHENTICATION_TOKEN_LIFETIME,

  // Length of primary key for token generation.
  id_length: 128,
}));
