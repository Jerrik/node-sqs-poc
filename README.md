# NODE-SQS-POC

POC that handles sending and retrieving messages to/from AWS SQS

## Requirements

- AWS account
- Account ID
- Valid AWS credentials file setup on your system.
- Node

## Usage

Setup a .env file with the following

```sh
ACCOUNT_ID=""
QUEUE_NAME=""
SQS_API_VERSION="2012-11-05"
AWS_REGION=""
```

To send a message:

```sh
node send.js
```

To process a message:

```sh
node process.js
```
