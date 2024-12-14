import express from 'express';
import cors from 'cors';
import { getCoordinatesForString } from './coordinateHandler.js';
import pixelData from './pixelData.js';
import crypto from 'crypto';
import admin from 'firebase-admin';
import fs from 'fs';

const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));

// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();

app.use(express.json());
app.use(cors());

function generateHashKey(input, length = 8) {
    const hash = crypto.createHash('sha256').update(input).digest('hex');
    return hash.substring(0, length);
}

function renderPixelatedText(inputString) {
    const inputCharacters = inputString.toUpperCase().split("");
    const renderedRows = Array(6).fill("");

    inputCharacters.forEach((char) => {
        const charPixels = pixelData[char] || Array(6).fill("          "); // Default to blank
        for (let i = 0; i < 6; i++) {
            renderedRows[i] += charPixels[i] + "  ";
        }
    });

    return renderedRows;
}

app.get('/retrieve-coordinates', async (req, res) => {
    const { input } = req.query;

    if (!input || typeof input !== 'string') {
        return res.status(400).json({ error: 'Please provide a valid input key.' });
    }

    try {
        const doc = await db.collection('coordinates').doc(input).get();

        if (!doc.exists) {
            throw new Error(`Key '${input}' not found.`);
        }

        const data = doc.data();

        res.json({
            message: `Coordinates for '${input}' retrieved successfully.`,
            coordinates: data.coordinates,
        });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

app.post('/render-pixelated-text', (req, res) => {
    const { input } = req.body;

    if (!input || typeof input !== 'string') {
        return res.status(400).json({ error: 'Invalid input' });
    }

    try {
        const renderedText = renderPixelatedText(input);
        res.json({
            message: `Pixelated text for '${input}' rendered successfully.`,
            renderedText,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/generate-secret-message', async (req, res) => {
    const { input } = req.body;

    if (!input || typeof input !== 'string') {
        return res.status(400).json({ error: 'Please provide a valid input string.' });
    }

    try {
        const uniqueKey = generateHashKey(input);
        const coordinates = getCoordinatesForString(input);

        console.log(`Generated unique key: ${uniqueKey} for input: ${input}`);

        await db.collection('coordinates').doc(uniqueKey).set({ input, coordinates });

        res.json({
            message: `Coordinates for '${input}' saved successfully.`,
            key: uniqueKey,
            coordinates,
        });
    } catch (error) {
        console.error('Error generating secret message:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});
