import { MiddlewareConsumer, Module, NestModule, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import databaseConfig from "./config/database.config"
import jwtConfig from "./config/jwt.config"
import { DatabaseModule } from "./database/database.module"
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { RequestIdMiddleware } from './common/middleware/request-id.middleware';
import { SeedModule } from './database/seed/seed.module';
import { AdminSeed } from './database/seed/admin.seed';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig],
    }),
    DatabaseModule,
    ProductsModule,
    AuthModule,
    SeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit, NestModule {
  constructor(private readonly adminSeed: AdminSeed) {}

  async onModuleInit() {
    await this.adminSeed.run()
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes("*")
  }
  
}
