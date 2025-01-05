import { registerAs } from '@nestjs/config';

export default registerAs(
  'app',
  () => ({
    user_secret: process.env.JWT_USER_SECRET,
    user_expires_in: process.env.JWT_USER_TOKEN_EXPIRES_IN,
    port: parseInt(process.env.PORT, 10) || 3000,
    database_url: process.env.DATABASE_URL,
    debug: true,
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
  }),
);

