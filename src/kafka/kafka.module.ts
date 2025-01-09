import { Module } from "@nestjs/common";
import { KafkaProducerService } from "./kafka.producer.service";
import { KafkaConsumerService } from "./kafka.consumer.service";

@Module({
  providers: [KafkaProducerService, KafkaConsumerService],
  exports: [KafkaProducerService],
})
export class KafkaModule {}
