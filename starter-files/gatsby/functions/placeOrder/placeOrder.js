const nodemailer = require('nodemailer');

function generateOrderEmail(order, total) {
  return `<div>
    <h2>Your Recent Order for ${total}</h2>
    <p>Please start walking over, we will have your order ready in next 20mins.</p>

    <ul>
      ${order
        .map(
          (item) => `<li>
        <img width="150" height="150" src="${item.thumbnail}" alt="${item.name}"/>
        ${item.size} ${item.name} - ${item.price}
      </li>`
        )
        .join('')}
    </ul>

    <p>Your total is <strong>

    ${total} due at pickup</p>
    </strong>
    <style>
        ul {
          list-style: none;

        }
    </style>
  </div>`;
}

// create a transport  for nodemailer

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.handler = async (event, context) => {
  // validate data coming in is correct
  const body = JSON.parse(event.body);

  // check if honeypot is filled
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Boop Beep Bop zzssstt Good Bye!!!' }),
    };
  }

  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `OOPS! You are missing the ${field} field`,
        }),
      };
    }
  }
  // send email

  // send succes or error message

  // Test send email

  const info = await transporter.sendMail({
    from: 'Blaze Pizzas <blaze@example.com>',
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New Order!',
    html: generateOrderEmail(body.order, body.total),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
