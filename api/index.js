const AWS = require('aws-sdk'),
  SES = new AWS.SES(),
  TO_EMAIL = process.env.TO_EMAIL,
  SUBJECT = process.env.SUBJECT,
  UTF8CHARSET = 'UTF-8';

exports.handler = async (event) => {
  const done = (err, res) => {
    return {
      statusCode: err ? '400' : '200',
      body: err ? err.message : JSON.stringify(res),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers':
          'Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Origin': process.env.CORS_ORIGIN,
        'Access-Control-Max-Age': '86400',
      },
    };
  };

  if (event.httpMethod === 'POST') {
    const emailData = JSON.parse(event.body);

    if (!emailData.name || !emailData.sender || !emailData.message) {
      return done({ message: 'Missing required parameters' });
    }

    const body =
      emailData.message && isHTML(emailData.message)
        ? {
            Html: {
              Charset: UTF8CHARSET,
              Data: `From: ${emailData.name}<br>Message:${emailData.message}`,
            },
          }
        : {
            Text: {
              Charset: UTF8CHARSET,
              Data: `From: ${emailData.name}\nMessage:${emailData.message}`,
            },
          };

    const emailParams = {
      Destination: {
        ToAddresses: [TO_EMAIL],
      },
      Message: {
        Body: body,
        Subject: {
          Charset: UTF8CHARSET,
          Data: SUBJECT,
        },
      },
      Source: TO_EMAIL,
      ReplyToAddresses: [emailData.sender],
    };
    try {
      await SES.sendEmail(emailParams).promise();
      return done(null, body);
    } catch (err) {
      const errorResponse = `Error: Execution update, caused a SES error, please look at your logs.`;
      return done({ message: errorResponse });
    }
  } else {
    return done({
      message: `Unsupported method "${event.httpMethod}"`,
    });
  }
};

function isHTML(value) {
  value = value.trim();
  return (
    value.startsWith('<') &&
    value.endsWith('>') &&
    (value.includes('<body') ||
      value.includes('<div') ||
      value.includes('<s') ||
      value.includes('<h') ||
      value.includes('<p'))
  );
}
