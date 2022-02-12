const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);
const msg = {
  to: "ram2rakhi@gmail.com", // Change to your recipient
  from: "test@example.com", // Change to your verified sender
  subject: "Sending with SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};
module.exports = sgMail.send(msg);
