require('dotenv').config()
const sgMail = require('@sendgrid/mail')

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
      headers: { Allow: 'POST' },
    }
  }

  const data = JSON.parse(event.body)
  if (!data.name || !data.email || !data.service) {
    return { statusCode: 422, body: 'Name, email, and service are required.' }
  }

  // using Twilio SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: 'ryosuke.san.hana@gmail.com',
    from: 'contact@whoisryosuke.com',
    subject: `whoisryosuke.com Contact Form - ${data.service}`,
    text: `Greetings my name is ${data.name} and I'm looking for help with ${data.service}. You can reach me at ${data.email}.`,
    html: `Greetings my name is ${data.name} and I'm looking for help with ${data.service}. You can reach me at <a href="mailto:${data.email}">${data.email}</a>.`,
  }
  try {
    await sgMail.send(msg)
  } catch (e) {
    return { statusCode: e.response.code, body: e.response.body }
  } finally {
    return { statusCode: 200, body: 'Email sent successfully' }
  }
}
