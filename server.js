// Filename: server.js
const express = require('express');
const { createTransport } = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/send-email', (req, res) => {
    const { name, message, email } = req.body;

    // Validate the input
    if (!name || !message || !email) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Create a transporter object
    let transporter = createTransport({
        service: 'gmail',
        auth: {
            user: 'manoranjan301998@gmail.com', // Your email address
            pass: 'vavw mmzc sdno mumn'   // Your email password
        }
    });

    // Define the email options
    let mailOptions = {
        from: email, // User's email address
        to: 'manoranjan301998@gmail.com', // Your email address
        subject: `Message from ${name}`,
        text: `Message from: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Failed to send email' });
        }
        res.json({ success: true, message: 'Email sent successfully' });
    });
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
