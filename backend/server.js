require('dotenv').config()

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database');
const cors = require('cors');

app.use(cors());
app.use(bodyParser());
app.use(express.json());

// Home page
app.get('/', (req, res) => {
    connection.query('SELECT * FROM Owned_CD UNION SELECT * FROM Owned_Vinyl UNION SELECT * FROM Owned_Cassette', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});


// Select all owned vinyls
app.get('/vinyls', (req, res) => {
    connection.query('SELECT * FROM Owned_Vinyl', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// Select all owned CDs
app.get('/cds', (req, res) => {
    connection.query('SELECT * FROM Owned_CD', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// Select all owned cassetes
app.get('/cassettes', (req, res) => {
    connection.query('SELECT * FROM Owned_Cassette', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// Get all owned music items
app.get('/all', (req, res) => {
    connection.query('SELECT * FROM Owned_CD UNION SELECT * FROM Owned_Vinyl UNION SELECT * FROM Owned_Cassette', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// Add user
app.post('/register', (req, res) => {
    const {ProfilePhoto, email} = req.body;
    connection.query("SELECT * FROM Users WHERE email = ?", [email], (error, results, fields) => {
        if (error) throw error;
        if (results.length > 0) {
            res.status(409).send('Email already exists');
        } else {
            connection.query("INSERT INTO Users (ProfilePhoto, email) VALUES (?, ?)", [ProfilePhoto, email], (error, results, fields) => {
                if (error) {
                    console.error(error);
                    res.status(500).send('Error creating user');
                } else {
                    res.send('User created succesfully');
                }
            });
        }
    })
});


// Delete user
app.delete('/deleteUser/:id', (req, res) => {
    const userID = req.params.id;
    connection.query('DELETE FROM Users WHERE ID = ?', userID, (error, results, fields) => {
        if (error) {
          console.error(error);
          res.status(500).send('Error deleting user');
        } else {
          res.send(`User ${userID} deleted successfully`);
        }
      });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
   console.log(`App is running at: http://localhost:${port}`);
});
