import express from '../node_modules/express/lib/express.js';
import { urlencoded, json } from 'body-parser';
import nodemailer from '../node_modules/nodemailer/lib/nodemailer.js';

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

app.post('/submit-form', (req, res) => {
  const { fullName, email, telephone, message } = req.body;
    //ethreal mail?
  const transporter = nodemailer.createTransport({
    service: 'smtp.ethereal.email', // email service
    port: 587,
    auth: {
      user: 'orion.oconnell45@ethereal.email', // Ethreal SMTP? 
      pass: 'ycCnUrC4yTWqD4p3Ng' //Do i need some pw?
    }
  });

  const mailOptions = {
    from: email,
    to: 'Robin.Palatas@gmail.com', // replace with Tom's email
    subject: 'Objednání fotografování',
    text: `
      Name: ${fullName}\n
      Email: ${email}\n
      Telephone: ${telephone}\n
      Message: ${message}
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Email se nepodařilo odeslat, zkuste to prosím znova.');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email byl odeslán.');
    }
  });
});

app.listen(3000, () => console.log('Server started on port 3000'));