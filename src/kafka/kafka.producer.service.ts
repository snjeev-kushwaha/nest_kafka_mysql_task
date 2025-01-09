import { Injectable, OnModuleInit, Logger } from "@nestjs/common";
import { Kafka } from "kafkajs";
import kafkaConfig from "../config/kafka.config";

@Injectable()
export class KafkaProducerService implements OnModuleInit {
  private readonly kafka = new Kafka(kafkaConfig);
  private readonly producer = this.kafka.producer();
  private readonly logger = new Logger(KafkaProducerService.name);

  async onModuleInit() {
    try {
      await this.producer.connect();
      this.logger.log("Kafka producer connected successfully");
    } catch (error) {
      this.logger.error("Failed to connect to Kafka", error);
    }
  }

  async produce(topic: string, message: any) {
    try {
      await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
      });
      this.logger.log(
        `Message sent to topic ${topic}: ${JSON.stringify(message)}`
      );
    } catch (error) {
      this.logger.error(`Failed to send message to topic ${topic}`, error);
    }
  }
}
