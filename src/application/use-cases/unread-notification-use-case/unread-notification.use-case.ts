import { Injectable } from '@nestjs/common';
import { UnreadNotificationInput } from './unread-notification.input';
import { NotificationRepository } from '@application/repositories/notification.repository';
import { NotificationNotFoundError } from '../errors/notification-not-found.error';

@Injectable()
export class UnreadNotificationUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  public async execute(input: UnreadNotificationInput): Promise<void> {
    const { notificationId } = input;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.unread();

    await this.notificationRepository.save(notification);
  }
}
