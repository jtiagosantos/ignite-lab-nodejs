import { Injectable } from '@nestjs/common';
import { FindRecipientNotificationsInput } from './find-recipient-notifications.input';
import { NotificationRepository } from '@application/repositories/notification.repository';
import { Notification } from '@application/entities/notification.entity';

interface IFindRecipientNotificationsResponse {
  notifications: Array<Notification>;
}

@Injectable()
export class FindRecipientNotificationsUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  public async execute(
    input: FindRecipientNotificationsInput,
  ): Promise<IFindRecipientNotificationsResponse> {
    const { recipientId } = input;

    const notifications =
      await this.notificationRepository.findManyByRecipientId(recipientId);

    return {
      notifications,
    };
  }
}
