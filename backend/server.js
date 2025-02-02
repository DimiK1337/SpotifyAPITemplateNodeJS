require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/auth/login', (req, res) => {
    const scope = 'user-read-private user-read-email';
    res.redirect(
        `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${scope}&redirect_uri=${REDIRECT_URI}`
    );
});

app.get('/auth/callback', async (req, res) => {
    const code = req.query.code;

    const fetchAuthData = async () => {
        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            method: 'post',
            params: {
                code,
                redirect_uri: REDIRECT_URI,
                grant_type: 'authorization_code',
            },
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        const response = await axios(authOptions);
        return response.data;
    };

    try {

        console.log("Code: ", code);
        console.log("Fetching auth data");
        const { access_token } = await fetchAuthData();

        // Step 4: Use the access token to query Spotify API
        const userResponse = await axios.get('https://api.spotify.com/v1/me', {
            headers: { 'Authorization': `Bearer ${access_token}` },
        });

        res.send(`Hello, ${userResponse.data.display_name}!`);
    } catch (error) {
        res.status(500).send('Authentication failed');
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
