
const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
const app = express();
const PORT = 5500;

app.use(express.static('my_portfolio'));
//parse incoming data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/my_portfolio/index.html');
});

app.post('/', (req, res) => {
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    service: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'orion.oconnell45@ethereal.email',
      pass: 'ycCnUrC4yTWqD4p3Ng'
    }
  });

  const mailOptions = {
    from: req.body.email,
    to: 'Robin.Palatas@gmail.com',
    subject: 'from personal website',
    text: `
    Name: ${req.body.fullName}\n
    Email: ${req.body.email}\n
    Telephone: ${req.bodytelephone}\n
    Message: ${req.body.message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});