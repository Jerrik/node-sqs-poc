import 'dotenv/config';
import AWS from 'aws-sdk';

AWS.config.update({region: process.env.AWS_REGION});

// Create SQS service object
const sqs = new AWS.SQS({apiVersion: process.env.SQS_API_VERSION});

// Replace with your accountid and the queue name you setup
const accountId = process.env.ACCOUNT_ID;
const queueName = process.env.QUEUE_NAME;
const queueUrl = `https://sqs.${process.env.AWS_REGION}.amazonaws.com/${accountId}/${queueName}`;

// Setup the receiveMessage parameters
const params = {
  QueueUrl: queueUrl,
  MaxNumberOfMessages: 1,
  VisibilityTimeout: 0,
  WaitTimeSeconds: 0
};

sqs.receiveMessage(params, (err, data) => {
  if (err) {
    console.log(err, err.stack);
  } else {
    if (!data.Messages) {
		console.log('data',data);
      console.log('Nothing to process');
      return;
    }

    const connectionData = JSON.parse(data.Messages[0].Body);
    console.log('Connection retrieved', connectionData);

    // connectionData is now an object that contains consumer_id, connection_id and date properties
    // Lookup connection data from data storage
    // Execute connection ingestion

    // Now we must delete the message so we don't handle it again
    const deleteParams = {
      QueueUrl: queueUrl,
      ReceiptHandle: data.Messages[0].ReceiptHandle
    };
    sqs.deleteMessage(deleteParams, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log('Successfully deleted message from queue');
      }
    });
  }
});
