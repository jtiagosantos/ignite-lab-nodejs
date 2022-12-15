import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import { CreateNotificationDto } from '../dtos/create-notification-dto';
import { NotificationViewModal } from '../view-models/notification.view-model';
import { SendNotificationUseCase } from '@application/use-cases/send-notification-use-case/send-notification.use-case';
import { ReadNotificationUseCase } from '@application/use-cases/read-notification-use-case/read-notification.use-case';
import { CancelNotificationUseCase } from '@application/use-cases/cancel-notification-use-case/cancel-notification.use-case';
import { UnreadNotificationUseCase } from '@application/use-cases/unread-notification-use-case/unread-notification.use-case';
import { CountRecipientNotificationsUseCase } from '@application/use-cases/count-recipient-notifications-use-case/count-recipient-notifications.use-case';
import { FindRecipientNotificationsUseCase } from '@application/use-cases/find-recipient-notifications-use-case/find-recipient-notifications.use-case';

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly sendNotificationUseCase: SendNotificationUseCase,
    private readonly cancelNotificationUseCase: CancelNotificationUseCase,
    private readonly readNotificationUseCase: ReadNotificationUseCase,
    private readonly unreadNotificationUseCase: UnreadNotificationUseCase,
    private readonly countRecipientNotificationsUseCase: CountRecipientNotificationsUseCase,
    private readonly findRecipientNotificationsUseCase: FindRecipientNotificationsUseCase,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotificationUseCase.execute({
      notificationId: id,
    });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotificationsUseCase.execute({
      recipientId,
    });

    return {
      count,
    };
  }

  @Get('from/:recipientId')
  async findFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } =
      await this.findRecipientNotificationsUseCase.execute({
        recipientId,
      });

    return {
      notifications: notifications.map(NotificationViewModal.toHTTP),
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotificationUseCase.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotificationUseCase.execute({
      notificationId: id,
    });
  }

  @Post()
  async createOneNotification(@Body() body: CreateNotificationDto) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotificationUseCase.execute({
      recipientId,
      category,
      content,
    });

    return {
      notification: NotificationViewModal.toHTTP(notification),
    };
  }
}
