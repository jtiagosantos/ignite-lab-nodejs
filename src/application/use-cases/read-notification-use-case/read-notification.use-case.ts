import { Injectable } from '@nestjs/common';
import { ReadNotificationInput } from './read-notification.input';
import { NotificationRepository } from '@application/repositories/notification.repository';
import { NotificationNotFoundError } from '../errors/notification-not-found.error';

@Injectable()
export class ReadNotificationUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  public async execute(input: ReadNotificationInput): Promise<void> {
    const { notificationId } = input;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.read();

    await this.notificationRepository.save(notification);
  }
}
