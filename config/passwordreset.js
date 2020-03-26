const sendgrid = require('@sendgrid/mail')
const key = require('./keys').sendgridKey
sendgrid.setApiKey(key)

module.exports = async function sendVerificationEmail(email,verification,user_id){
  const msg = {
    to: email,
    from: 'hamzabouhadjila@gmail.com',
    subject: 'password update request',
    text:`click this link to confirm password reset request: http://localhost:5000/api/users/reset/${verification}/${user_id}`,
    html: `<strong>
      to confirm password update request click the link:<a href= 'http://localhost:5000/api/users/reset/${verification}/${user_id}'> Confirm password update </a>
     </strong>`,
  };
  await sendgrid.send(msg);
}