const dotenv=require('dotenv');
dotenv.config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
console.log(process.env.GEMINI_API_KEY)

// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Get the model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

module.exports = { model };