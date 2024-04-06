import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';

dotenv.config({path: './.env.local'});

const getAI = new GoogleGenerativeAI(process.env.API_KEY);

function fileToGenerativePart(path, mimeType) {
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString('base64'),
            mimeType
        }
    }
}

async function run() {
    const model = getAI.getGenerativeModel({model: 'gemini-pro-vision'});

    const prompt = 'give me a description of this image';

    const imageParts = [fileToGenerativePart('./apartment.jpg', 'image/jpeg')];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();

    console.log(text);
}

run();  