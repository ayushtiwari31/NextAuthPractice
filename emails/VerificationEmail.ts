interface VerificationEmailProps {
    username: string;
    otp: string;
  }
  
  export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verification Code</title>
          <style>
              body {
                  font-family: 'Roboto', Verdana, sans-serif;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  border: 1px solid #ddd;
                  border-radius: 10px;
                  text-align: center;
              }
              .otp {
                  font-size: 20px;
                  font-weight: bold;
                  color: #ff4500;
              }
              .btn {
                  display: inline-block;
                  background-color: #007bff;
                  color: #ffffff;
                  padding: 10px 20px;
                  border-radius: 5px;
                  text-decoration: none;
                  margin-top: 20px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h2>Hello ${username},</h2>
              <p>Thank you for registering. Use the following verification code:</p>
              <p class="otp">${otp}</p>
              <p>If you did not request this, please ignore this email.</p>
              <a href="https://yourdomain.com/verify?otp=${otp}" class="btn">Verify Account</a>
          </div>
      </body>
      </html>
    `;
  }
  