import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { ProductModule } from "./products/products.module";
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: "mysql",
        host: configService.get<string>("DB_HOST"),
        port: configService.get<number>("DB_PORT"),
        username: configService.get<string>("USER_NAME"),
        password: configService.get<string>("USER_PASSWORD"),
        database: configService.get<string>("DB_NAME"),
        autoLoadModels: true,
        synchronize: true,
      }),
    }),
    ProductModule,
    KafkaModule,
  ],
})
export class AppModule {}
