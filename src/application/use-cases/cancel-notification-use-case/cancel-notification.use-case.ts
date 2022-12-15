import { Injectable } from '@nestjs/common';
import { CancelNotificationInput } from './cancel-notification.input';
import { NotificationRepository } from '@application/repositories/notification.repository';
import { NotificationNotFoundError } from '../errors/notification-not-found.error';

@Injectable()
export class CancelNotificationUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  public async execute(input: CancelNotificationInput): Promise<void> {
    const { notificationId } = input;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.cancel();

    await this.notificationRepository.save(notification);
  }
}
