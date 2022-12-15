import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications.repository';
import { FindRecipientNotificationsUseCase } from './find-recipient-notifications.use-case';
import { makeNotification } from '@test/factories/notification.factory';

describe('find recipient notifications use case', () => {
  it('should be able to find recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const findRecipientNotificationsUseCase =
      new FindRecipientNotificationsUseCase(notificationRepository);

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { notifications } = await findRecipientNotificationsUseCase.execute({
      recipientId: 'recipient-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
      ]),
    );
  });
});
