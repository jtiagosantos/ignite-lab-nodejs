import {
  Notification,
  INotificationProps,
} from '@application/entities/notification.entity';
import { Content } from '@application/entities/content';

type TOverride = Partial<INotificationProps>;

export function makeNotification(override: TOverride = {}) {
  return new Notification({
    recipientId: 'recipient-1',
    category: 'social',
    content: new Content('Nova solicitação de amizade'),
    ...override,
  });
}
