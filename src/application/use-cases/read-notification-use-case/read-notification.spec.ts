import { makeNotification } from '@test/factories/notification.factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications.repository';
import { NotificationNotFoundError } from '../errors/notification-not-found.error';
import { ReadNotificationUseCase } from './read-notification.use-case';

describe('Read notification use case', () => {
  it('should be able to read a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const readNotificationUseCase = new ReadNotificationUseCase(
      notificationRepository,
    );

    const notification = makeNotification();

    await notificationRepository.create(notification);

    await readNotificationUseCase.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const readNotificationUseCase = new ReadNotificationUseCase(
      notificationRepository,
    );

    expect(() =>
      readNotificationUseCase.execute({
        notificationId: 'fake-notification-id',
      }),
    ).rejects.toThrow(NotificationNotFoundError);
  });
});
