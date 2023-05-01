require('dotenv').config()

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database');
const cors = require('cors');
const axios = require('axios')

app.use(cors());
app.use(bodyParser());
app.use(express.json());

app.get('/', (req, res) => {
    connection.query('SELECT * FROM Owned_CD', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.get('/vinyls', (req, res) => {
    connection.query('SELECT * FROM Owned_Vinyl', (error, results) => {
        if (error) throw error;
        const formattedResults = results.map(result => ({ ...result, format: 'vinyl' }));
        res.json(formattedResults);
    });
});

app.get('/cds', (req, res) => {
    connection.query('SELECT * FROM Owned_CD', (error, results) => {
        if (error) throw error;
        const formattedResults = results.map(result => ({ ...result, format: 'cd' }));
        res.json(formattedResults);
    });
});

app.get('/cassettes', (req, res) => {
    connection.query('SELECT * FROM Owned_Cassette', (error, results) => {
        if (error) throw error;
        const formattedResults = results.map(result => ({ ...result, format: 'cassette' }));
        res.json(formattedResults);
    });
});

app.get('/all', (req, res) => {
    connection.query(
        'SELECT *, "cd" AS format FROM Owned_CD UNION ' +
        'SELECT *, "vinyl" AS format FROM Owned_Vinyl UNION ' +
        'SELECT *, "cassette" AS format FROM Owned_Cassette',
        (error, results) => {
            if (error) throw error;
            res.json(results);
        }
    );
});


app.get('/search', async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).send('Missing query parameter');
    }
    try {
        const response = await axios.get(`https://api.discogs.com/database/search?q=${query}&type=release`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
                'Authorization': `Discogs token=vkiubVAmyxmACaayGANRsLwEMbPlvSsdlzyVBKpi`,
            },
        });
        const data = response.data;
        return res.json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error');
    }
});

app.post('/add-music-item', (req, res) => {
    const { userId, name, artist, genre, format, thumb } = req.body;

    console.log(req.body)

    if (!userId || !name || !artist || !genre || !format || !thumb) {
        return res.status(400).send('Missing required parameters');
    }

    const query = `INSERT INTO Music (userID, Name, Artist, Genre, Thumbnail, Format) VALUES (?, ?, ?, ?, ?, ?)`;

    const values = [userId, name, artist, genre, thumb, format];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Internal server error');
        }
        return res.json({ success: true });
    });

});


const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`App is running at: http://localhost:${port}`);
});
