const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve the front-end files

// API Endpoint
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // For now, we will just save the data to a file (contact-data.json)
    const contactData = { name, email, message };
    const data = JSON.stringify(contactData, null, 2);

    fs.writeFile('contact-data.json', data, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to save data.' });
        }
        res.status(200).json({ message: 'Thank you for your message!' });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
