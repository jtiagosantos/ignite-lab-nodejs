import { Injectable } from '@nestjs/common';
import { CountRecipientNotificationsInput } from './count-recipient-notifications.input';
import { NotificationRepository } from '@application/repositories/notification.repository';

interface ICountRecipientNotificationsResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotificationsUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  public async execute(
    input: CountRecipientNotificationsInput,
  ): Promise<ICountRecipientNotificationsResponse> {
    const { recipientId } = input;

    const count = await this.notificationRepository.countManyByRecipientId(
      recipientId,
    );

    return {
      count,
    };
  }
}
