import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config({path: './.env.local'});

const getAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run() {
    const model = getAI.getGenerativeModel({model: 'gemini-pro'});

    const prompt = 'A beautiful sunset over the city';

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log(text);
}

run();  