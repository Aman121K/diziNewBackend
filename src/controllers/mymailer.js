// const SibApiV3Sdk = require('sib-api-v3-sdk');
// let defaultClient = SibApiV3Sdk.ApiClient.instance;

// let apiKey = defaultClient.authentications['api-key'];
// apiKey.apiKey = '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';

// let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// module.exports.send=({to,subject,body,attachment=[]})=>{

//     let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

//     sendSmtpEmail.subject = subject;
//     sendSmtpEmail.htmlContent = body;
//     sendSmtpEmail.sender = {"name":"Name","email":"support@domain.com"};
//     sendSmtpEmail.to = to;
//     sendSmtpEmail.replyTo = {"email":"help@domain.com","name":"Support"};
//     if(attachment.length > 0)
//     sendSmtpEmail.attachment = attachment

//     apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
      
//       }, function(error) {
//         console.error(error);
//       });
// }