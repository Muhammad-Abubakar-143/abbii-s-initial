import express from 'express';
import * as dotenv from 'dotenv';
import { createRequire } from 'module';

dotenv.config();

const require = createRequire(import.meta.url);
const OpenAI = require('openai');

const router = express.Router();

// OpenAI Configuration
const openai = new OpenAI({
    organization: "org-hcDLipwZ7ETYYpGxIh03BILn",
    apiKey: process.env.OPENAI_API_KEY
});

router.route('/').get((req, res) => {
    res.send('Hello from DALL·E routes');
});

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;

        // Create an image using OpenAI's DALL·E API
        const aiResponse = await openai.images.generate({
            prompt: prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });

        // Extract the base64 image
        const image = aiResponse.data[0].b64_json;
        res.status(200).json({ photo: image });
    } catch (error) {
        console.log(error);
        res.status(500).send(error?.response?.data?.error?.message || 'Something went wrong');
    }
});

export default router;
