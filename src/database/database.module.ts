import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CustomTypeOrmLogger } from 'src/common/loggers/typeorm-logger';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                type: 'postgres',
                host: config.get('database.host'),
                port: config.get('database.port'),
                username: config.get('database.username'),
                password: config.get('database.password'),
                database: config.get('database.name'),
                entities: [__dirname + '/../**/*.entity.{js,ts}'],
                migrations: [__dirname + '/../migrations/*.{js,ts}'],
                logging: true,
                logger: new CustomTypeOrmLogger(),
                maxQueryExecutionTime: 200
            })
        })
    ]
})
export class DatabaseModule {}
