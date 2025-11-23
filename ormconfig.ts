import { DataSource } from "typeorm";
import * as dotenv from "dotenv"
import * as path from 'path';

dotenv.config();

export default new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [path.join(__dirname, 'src/**/*.entity.ts')],
    migrations: [path.join(__dirname, 'migrations/*.ts')]
})