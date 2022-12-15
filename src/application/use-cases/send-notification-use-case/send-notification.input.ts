export class SendNotificationInput {
  constructor(
    public readonly recipientId: string,
    public readonly category: string,
    public readonly content: string,
  ) {}
}
