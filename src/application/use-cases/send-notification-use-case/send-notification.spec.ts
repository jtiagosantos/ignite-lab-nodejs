import { SendNotificationUseCase } from './send-notification.use-case';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications.repository';

describe('Send notification use case', () => {
  it('should be able to send a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const sendNotificationUseCase = new SendNotificationUseCase(
      notificationRepository,
    );

    const { notification } = await sendNotificationUseCase.execute({
      recipientId: 'example-recipient-id',
      category: 'social',
      content: 'This is a notification',
    });

    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notificationRepository.notifications[0]).toEqual(notification);
  });
});
