const mailer = require('nodemailer');

/**
 * Send an email
 * @param address {string} - target address
 * @param subject {string} - message subject
 * @param message {string} - message
 * @param files {*} - pass files to the mailer
 */
function sendEmail(address, subject, message, files = []) {
  const { EMAIL_LOGIN, EMAIL_PASSWORD, EMAIL_SERVICE } = process.env;
  const transporter = mailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
      user: EMAIL_LOGIN,
      pass: EMAIL_PASSWORD,
    },
  });
  const options = {
    from: EMAIL_LOGIN,
    to: address,
    subject,
    html: message,
    attachments: files,
  };
  transporter.sendMail(options, (err, data) => {
    if (err) {
      console.log('MAILER: ERROR', err.stack || err.message || err);
      return console.log('MAILER: OPTIONS', JSON.stringify(options));
    }
    return console.log(`MAILER: sent to ${address} (${data.response})`);
  });
}

module.exports = {
  sendEmail,
};
