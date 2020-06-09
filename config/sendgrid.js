const sendgrid = require('@sendgrid/mail')
const key = require('./keys').sendgridKey
sendgrid.setApiKey(key)

module.exports = async function sendVerificationEmail(email,protocol,url,verification,user_id){
  const msg = {
    to: email,
    from: 'hamzabouhadjila@gmail.com',
    subject: 'Email verification',
    text:`click this linkto confirm your adress: ${protocol}://${url}/api/users/verification/${verification}/${user_id}`,
    html: `<strong>
      click this link to confirm your adress:<a href= '${protocol}://${url}/api/users/verification/${verification}/${user_id}'> Confirm email </a>
     </strong>`,
  };
  await sendgrid.send(msg);
}