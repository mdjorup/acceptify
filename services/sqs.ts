import { SQS, SendMessageCommandInput } from '@aws-sdk/client-sqs';

interface ISQS {
  sendMessage(
    params: SendMessageCommandInput,
  ): Promise<{ MessageId: string | undefined }>;
}

// Define the real SQS class
class AWSSQS implements ISQS {
  sqs: SQS;

  constructor() {
    this.sqs = new SQS();
  }

  async sendMessage(
    params: SendMessageCommandInput,
  ): Promise<{ MessageId: string | undefined }> {
    // Implement the real send message logic here
    const result = await this.sqs.sendMessage(params);

    const { MessageId } = await this.sqs.sendMessage(params);

    return { MessageId };
  }
}

// Define the mock SQS class
class MockSQS implements ISQS {
  async sendMessage(
    params: SendMessageCommandInput,
  ): Promise<{ MessageId: string }> {
    return Promise.resolve({ MessageId: 'mockMessageId' });
  }
}

// Define the SQS factory
export class SQSFactory {
  static create(): ISQS {
    if (process.env.NODE_ENV === 'development') {
      return new MockSQS();
    }
    return new AWSSQS();
  }
}
