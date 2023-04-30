require('dotenv').config()

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database');
const cors = require('cors');

app.use(cors());

// Set up environment variables
// const config = {
//     user: 'ben',
//     password: '',
//     host: '34.85.227.21',
//     database: 'ec'
// };

app.get('/', (req, res) => {
    connection.query('SELECT * FROM Owned_CD', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.get('/vinyls', (req, res) => {
    connection.query('SELECT * FROM Owned_Vinyl', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.get('/cds', (req, res) => {
    connection.query('SELECT * FROM Owned_CD', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.get('/cassettes', (req, res) => {
    connection.query('SELECT * FROM Owned_Cassette', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.get('/all', (req, res) => {
    connection.query('SELECT * FROM Owned_CD UNION SELECT * FROM Owned_Vinyl UNION SELECT * FROM Owned_Cassette', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
   console.log(`App is running at: http://localhost:${port}`);
});
