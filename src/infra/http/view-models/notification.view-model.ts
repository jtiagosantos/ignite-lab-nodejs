import { Notification } from '@application/entities/notification.entity';

export class NotificationViewModal {
  public static toHTTP(notification: Notification) {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      content: notification.content.value,
      category: notification.category,
    };
  }
}
