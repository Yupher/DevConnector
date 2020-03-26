const sendgrid = require('@sendgrid/mail')
const key = require('./keys').sendgridKey
sendgrid.setApiKey(key)

module.exports = async function sendVerificationEmail(email,verification,user_id){
  const msg = {
    to: email,
    from: 'hamzabouhadjila@gmail.com',
    subject: 'Email verification',
    text:`click this linkto confirm your adress: http://localhost:5000/api/users/verification/${verification}/${user_id}`,
    html: `<strong>
      click this linkto confirm your adress:<a href= 'http://localhost:5000/api/users/verification/${verification}/${user_id}'> Confirm email </a>
     </strong>`,
  };
  await sendgrid.send(msg);
}