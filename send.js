import "dotenv/config";
import AWS from "aws-sdk";

AWS.config.update({ region: process.env.AWS_REGION });

const sqs = new AWS.SQS({ apiVersion: process.env.SQS_API_VERSION });

const accountId = process.env.ACCOUNT_ID;
const queueName = process.env.QUEUE_NAME;

// Sample consumer list
const consumers = [
  {
    consumer_id: 123,
    connections: [
      {
        connection_id: 1,
      },
      {
        connection_id: 2,
      },
      {
        connection_id: 3,
      },
      {
        connection_id: 4,
      }
    ]
  },
  {
    consumer_id: 456,
    connections: [
      {
        connection_id: 1,
      },
      {
        connection_id: 2,
      },
      {
        connection_id: 3,
      }
    ]
  },
  {
    consumer_id: 789,
    connections: [
      {
        connection_id: 1,
      },
      {
        connection_id: 2,
      },
      {
        connection_id: 3,
      }
    ]
  },
  {
    consumer_id: 112,
    connections: [
      {
        connection_id: 1,
      },
      {
        connection_id: 2,
      }
    ]
  }
];

consumers.forEach((consumer) => {
  const connections = consumer.connections;

  connections.forEach((connection) => {
    const params = {
      MessageBody: JSON.stringify({
        consumer_id: consumer.consumer_id,
        connection_id: connection.connection_id,
        date: new Date().toISOString(),
      }),
      QueueUrl: `https://sqs.${process.env.AWS_REGION}.amazonaws.com/${accountId}/${queueName}`,
    };

    sqs.sendMessage(params, (err, data) => {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Successfully added message", data.MessageId);
      }
    });
  });
});
