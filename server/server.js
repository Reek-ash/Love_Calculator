const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS
const fs = require('fs');
const { createObjectCsvWriter } = require('csv-writer');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Use CORS middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' folder

// Setup the CSV writer
const csvWriter = createObjectCsvWriter({
    path: 'love_data.csv',
    header: [
        { id: 'yourName', title: 'Your Name' },
        { id: 'loverName', title: 'Lover\'s Name' },
        { id: 'percentage', title: 'Love Percentage' }
    ],
    append: true // So that it doesn't overwrite the file every time
});

// Endpoint to handle love calculation
app.post('/api/calculate-love', (req, res) => {
    const { yourName, loverName } = req.body;

    // Simple love percentage logic (random for now)
    const lovePercentage = Math.floor(Math.random() * 100) + 1;

    // Data to write to CSV
    const data = [
        {
            yourName: yourName,
            loverName: loverName,
            percentage: lovePercentage
        }
    ];

    // Write to CSV file
    csvWriter.writeRecords(data)
        .then(() => {
            console.log('Data written to CSV file successfully.');
            res.json({ percentage: lovePercentage });
        })
        .catch(error => {
            console.error('Error writing to CSV:', error);
            res.status(500).json({ message: 'Error calculating love percentage.' });
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Love Calculator app listening at http://localhost:${port}`);
});
