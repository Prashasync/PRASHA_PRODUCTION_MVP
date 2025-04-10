require('dotenv').config();
const { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } = require('@aws-sdk/client-sqs');
const nodemailer = require('nodemailer');
const logger = require('./logger'); // Optional: add a logger or use console.log

// AWS SQS client
const sqsClient = new SQSClient({ region: process.env.AWS_REGION });

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function processMessages() {
  try {
    const receiveParams = {
      QueueUrl: process.env.SQS_QUEUE_URL,
      MaxNumberOfMessages: 5,
      WaitTimeSeconds: 10,
    };

    const response = await sqsClient.send(new ReceiveMessageCommand(receiveParams));

    const messages = response.Messages;

    if (!messages || messages.length === 0) {
      console.log('No messages to process.');
      return;
    }

    for (const message of messages) {
      const body = JSON.parse(message.Body);
      console.log('Processing message:', body);

      if (body.method === 'email') {
        await sendEmail(body);
      } else if (body.method === 'sms') {
        await sendSMS(body); // Optional: Implement later if needed
      }

      // Delete the message after processing
      const deleteParams = {
        QueueUrl: process.env.SQS_QUEUE_URL,
        ReceiptHandle: message.ReceiptHandle,
      };

      await sqsClient.send(new DeleteMessageCommand(deleteParams));

      console.log(`Message processed and deleted from queue for: ${body.to}`);
    }
  } catch (error) {
    console.error('Error processing messages:', error);
  }
}

async function sendEmail({ to, otp }) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject: 'Your OTP Code',
    html: `<h3>Your OTP is: <strong>${otp}</strong></h3><p>It is valid for 5 minutes.</p>`,
  };

  await transporter.sendMail(mailOptions);
  console.log(`Email sent to ${to}`);
}

// Optional future function
async function sendSMS({ to, otp }) {
  // Integrate Twilio here if needed
  console.log(`(Optional) SMS sent to ${to} with OTP: ${otp}`);
}

// Poll messages every 5 seconds
setInterval(processMessages, 5000);
