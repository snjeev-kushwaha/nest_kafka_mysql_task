import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ProductService } from "./products.service";
import { ProductController } from "./products.controller";
import { Product } from "./entities/product.entity";
import { KafkaModule } from "../kafka/kafka.module";

@Module({
  imports: [SequelizeModule.forFeature([Product]), KafkaModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
