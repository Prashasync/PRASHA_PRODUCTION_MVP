const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");
require("dotenv").config();
const logger = require("../utils/logger");

// AWS SQS setup
const sqsClient = new SQSClient({ region: process.env.AWS_REGION });

exports.sendOTP = async (to, otp, method = "email") => {
  try {
    const otpId = Math.random().toString(36).substr(2, 9);

    const messageBody = {
      to,
      otp,
      method,
      otpId,
      type: "otp_verification",
    };

    const command = new SendMessageCommand({
      QueueUrl: process.env.SQS_QUEUE_URL,
      MessageBody: JSON.stringify(messageBody),
    });

    await sqsClient.send(command);
    logger.info(`OTP message pushed to SQS for: ${to}, OTP ID: ${otpId}`);

    return otpId;
  } catch (error) {
    logger.error(`Failed to queue OTP message: ${error.message}`);
    throw new Error("OTP queueing failed");
  }
};

