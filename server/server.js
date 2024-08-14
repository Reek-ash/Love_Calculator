const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const { createObjectCsvWriter } = require('csv-writer');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Setup the CSV writer
const csvWriter = createObjectCsvWriter({
    path: 'love_data.csv',
    header: [
        { id: 'yourName', title: 'Your Name' },
        { id: 'loverName', title: 'Lover\'s Name' },
        { id: 'percentage', title: 'Love Percentage' }
    ],
    append: true
});

// Endpoint to handle love calculation
app.post('/api/calculate-love', (req, res) => {
    const { yourName, loverName } = req.body;

    const lovePercentage = Math.floor(Math.random() * 100) + 1;

    const data = [
        {
            yourName: yourName,
            loverName: loverName,
            percentage: lovePercentage
        }
    ];

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

module.exports = app;
