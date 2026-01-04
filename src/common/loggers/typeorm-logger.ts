import { Logger } from '@nestjs/common';
import { Logger as TypeOrmLogger, QueryRunner } from 'typeorm';
import { requestContext } from '../context/request-context';

export class CustomTypeOrmLogger implements TypeOrmLogger {
    private readonly logger = new Logger('TypeORM');

    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
        const requestId = requestContext.getStore()?.requestId;
        this.logger.debug(
            `[${requestId}] Query: ${query} -- Params: ${JSON.stringify(parameters)}`,
        );
    }

    logQueryError(error: string | Error, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        const requestId = requestContext.getStore()?.requestId;
        this.logger.error(
            `[${requestId}] Query failed: ${query} -- Params: ${JSON.stringify(parameters)}`,
            error instanceof Error ? error.stack : undefined,
        );
    }

    logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        const requestId = requestContext.getStore()?.requestId;
        this.logger.warn(
            `[${requestId}] SLOW QUERY (${time}ms): ${query} -- ${JSON.stringify(parameters)}`,
        );
    }

    logSchemaBuild(message: string, queryRunner?: QueryRunner) {
        this.logger.log(`Schema Build: ${message}`);
    }

    logMigration(message: string, queryRunner?: QueryRunner) {
        this.logger.log(`Migration: ${message}`);
    }

    log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
        if (level === 'warn') this.logger.warn(message);
        else this.logger.log(message);
    }

}