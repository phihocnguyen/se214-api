const {Resend} = require('resend')
const dotenv = require('dotenv')
require('dotenv').config({path:__dirname+'/./../../.env'})
const resend = new Resend(process.env.RESEND_KEY)

const sendEmail = async (email, token) => {
  try {
    console.log(email)
    const data = await resend.emails.send({
      from: 'SE214 <onboarding@resend.dev>',
      to: [`${email}`],
      subject: 'Verification',
      html: `<p>Hãy nhấp vào <a href ="http://localhost:3000/api/auth/new-verification?token=${token}">liên kết này</a> để tiến hành xác thực email:</p>`
    });
  } catch (error) {
    console.error(error);
  }
}
module.exports = {
  sendEmail
}