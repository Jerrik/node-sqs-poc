# POC-QUEUE-WORKERS
POC that handles sending messages to AWS SQS

# Requirements
You must have an AWS account, your Account ID noted and a valid AWS credentials file setup on your system.

# Usage
You must have node installed on your system or a node docker alias. If using docker you should make sure you map your local ~/.aws file so it's available in the correct path inside docker.

To send a message:
```
node send.js
```

To receive a message:
```
node receive.js
```
