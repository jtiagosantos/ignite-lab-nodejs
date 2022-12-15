import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification.entity';
import { makeNotification } from '@test/factories/notification.factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications.repository';
import { NotificationNotFoundError } from '../errors/notification-not-found.error';
import { CancelNotificationUseCase } from './cancel-notification.use-case';

describe('Cancel notification use case', () => {
  it('should be able to cancel a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotificationUseCase = new CancelNotificationUseCase(
      notificationRepository,
    );

    const notification = makeNotification();

    await notificationRepository.create(notification);

    await cancelNotificationUseCase.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotificationUseCase = new CancelNotificationUseCase(
      notificationRepository,
    );

    expect(() =>
      cancelNotificationUseCase.execute({
        notificationId: 'fake-notification-id',
      }),
    ).rejects.toThrow(NotificationNotFoundError);
  });
});
