import { Injectable, OnModuleInit, Logger } from "@nestjs/common";
import { Kafka } from "kafkajs";
import kafkaConfig from "../config/kafka.config";

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
  private readonly kafka = new Kafka(kafkaConfig);
  private readonly consumer = this.kafka.consumer({
    groupId: kafkaConfig.groupId,
  });
  private readonly logger = new Logger(KafkaConsumerService.name);

  async onModuleInit() {
    try {
      await this.consumer.connect();
      this.logger.log("Kafka consumer connected successfully");

      await this.consumer.subscribe({
        topic: "project_created",
        fromBeginning: true,
      });
      this.logger.log(`Subscribed to topic "project_created"`);

      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            console.log(
              `Received message on topic "${topic}":`,
              message.value.toString()
            );
          } catch (processingError) {
            this.logger.error(
              `Error processing message: ${processingError.message}`,
              processingError.stack
            );
          }
        },
      });
    } catch (error) {
      this.logger.error(
        "Failed to connect to Kafka or subscribe to topic",
        error
      );
    }
  }
}
