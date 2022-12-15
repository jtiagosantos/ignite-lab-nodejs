import { Notification as RawNotification } from '@prisma/client';
import { Notification } from '@application/entities/notification.entity';
import { Content } from '@application/entities/content';

export class PrismaNotificationMapper {
  public static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      category: notification.category,
      content: notification.content.value,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
    };
  }

  public static toDomain(raw: RawNotification): Notification {
    return new Notification(
      {
        category: raw.category,
        content: new Content(raw.content),
        recipientId: raw.recipientId,
        readAt: raw.readAt,
        canceledAt: raw.canceledAt,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
