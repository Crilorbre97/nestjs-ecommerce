import { registerAs } from '@nestjs/config'

export default registerAs('jwt', () => ({
    secret: process.env.TOKEN_SECRET_VALUE
}))