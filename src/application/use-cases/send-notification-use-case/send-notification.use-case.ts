import { Injectable } from '@nestjs/common';
import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification.entity';
import { SendNotificationInput } from './send-notification.input';
import { NotificationRepository } from '@application/repositories/notification.repository';

interface ISendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotificationUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  public async execute(
    input: SendNotificationInput,
  ): Promise<ISendNotificationResponse> {
    const { recipientId, category, content } = input;

    const notification = new Notification({
      recipientId,
      category,
      content: new Content(content),
    });

    await this.notificationRepository.create(notification);

    return {
      notification,
    };
  }
}
