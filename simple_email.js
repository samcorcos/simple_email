if (Meteor.isClient) {
  Template.emailForm.events({
    'click button': function(e,t) { // We can't send emails from the client! We have to send them from the server. So this is another good place for a meteor method.
      var to = t.find("#to").value;
      var subject = t.find("#subject").value;
      var text = t.find("#text").value;

      Meteor.apply("sendEmail", [to, subject, text]);
    }
  });
}

if (Meteor.isServer) {
  Meteor.methods({
    sendEmail: function(to,subject,text) {
      Email.send({ // To send an email after you've installed the email package is super easy! Just use Email.send({}) and pass in an object. The only required parameter is "from"
        from: "samcorcos@gmail.com",
        to: to, // "to" can be a string, or an array of strings
        // You can also include "cc", "bcc", or "replyTo" fields
        subject: subject,
        text: text
        // html: html if you want to send an html email.
      })
    }
  })
}
// Meteor doesn't actually have an SMTP server. We would have to set that up on our own.
// If you don't have an SMTP server set up, it will still output the email to the server console.
// We can use a number of services, including gmail, as our SMTP server.

// To set an SMTP server, all you have to do is run the following in the command line:
// MAIL_URL="smtp://USERNAME:PASSWORD@HOST:PORT" meteor
// obviously, use the username, passord and port that you have for your account. For example:

// MAIL_URL="smtp://samcorcos:password@smtp@gmail.com:587" meteor

// believe it or not, that will allow you to send emails from your gmail account. 
