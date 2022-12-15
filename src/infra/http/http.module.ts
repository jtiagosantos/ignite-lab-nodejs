import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { NotificationController } from './controllers/notification.controller';
import { SendNotificationUseCase } from '@application/use-cases/send-notification-use-case/send-notification.use-case';
import { ReadNotificationUseCase } from '@application/use-cases/read-notification-use-case/read-notification.use-case';
import { CancelNotificationUseCase } from '@application/use-cases/cancel-notification-use-case/cancel-notification.use-case';
import { UnreadNotificationUseCase } from '@application/use-cases/unread-notification-use-case/unread-notification.use-case';
import { CountRecipientNotificationsUseCase } from '@application/use-cases/count-recipient-notifications-use-case/count-recipient-notifications.use-case';
import { FindRecipientNotificationsUseCase } from '@application/use-cases/find-recipient-notifications-use-case/find-recipient-notifications.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [
    SendNotificationUseCase,
    ReadNotificationUseCase,
    CancelNotificationUseCase,
    UnreadNotificationUseCase,
    CountRecipientNotificationsUseCase,
    FindRecipientNotificationsUseCase,
  ],
})
export class HttpModule {}
