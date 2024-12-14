import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import pixelData from './pixelData.js';

export function getCoordinatesForLetter(letter) {
    const rows = pixelData[letter.toUpperCase()];
    if (!rows) {
        throw new Error(`No pixel data found for letter: ${letter}`);
    }

    const coordinates = [];
    rows.forEach((row, y) => {
        [...row].forEach((char, x) => {
            if (char !== " ") {
                coordinates.push({ x, y, character: char });
            }
        });
    });

    return coordinates;
}

export function getCoordinatesForString(input) {
    const allCoordinates = [];
    let xOffset = 0;

    input.toUpperCase().split("").forEach((char) => {
        const letterCoordinates = getCoordinatesForLetter(char);

        letterCoordinates.forEach(({ x, y, character }) => {
            allCoordinates.push({
                x: x + xOffset,
                y,
                character
            });
        });

        xOffset += pixelData[char][0].length + 2;
    });

    return allCoordinates;
}

export function updateCoordinatesJson(input, coordinates) {
    const filePath = path.resolve(__dirname, 'pixelCoordinates.json');

    let currentData = {};
    try {
        const fileContent = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '{}';
        currentData = JSON.parse(fileContent || '{}');
    } catch (error) {
        console.warn('pixelCoordinates.json is missing or invalid. Initializing new file.');
        currentData = {};
    }

    const uniqueId = uuidv4();

    console.log('Updating pixelCoordinates.json at:', filePath);
    console.log('Current data before update:', currentData);
    currentData[uniqueId] = { input: input.toUpperCase(), coordinates };

    try {
        fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2));
        console.log('File updated successfully');
        return uniqueId;
    } catch (error) {
        console.error('Error writing to pixelCoordinates.json:', error.message);
        throw error;
    }
}

export function getCoordinatesFromJson(inputKey) {
    const filePath = path.resolve(__dirname, 'pixelCoordinates.json');

    if (!fs.existsSync(filePath)) {
        throw new Error('pixelCoordinates.json does not exist.');
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);

    const key = inputKey.toUpperCase();
    if (!data[key]) {
        throw new Error(`No data found for key: ${key}`);
    }
    return data[key];
}
