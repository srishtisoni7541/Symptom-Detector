
const dotenv=require('dotenv');
dotenv.config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
console.log(process.env.GEMINI_API_KEY);


// Initialize Generative AI with API key
const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

// Helper function to structure the prompt for symptom analysis
const createSymptomAnalysisPrompt = (age, sex, symptoms) => {
  return `
    You are a medical symptom analyzer. Based on the following patient information, analyze the symptoms 
    and provide possible conditions that match these symptoms. For each condition, include a probability 
    (High, Medium, or Low) and a brief description.

    Patient Information:
    - Age: ${age}
    - Sex: ${sex}
    - Symptoms: ${symptoms}

    Please provide your analysis in JSON format with the following structure:
    {
      "conditions": [
        {
          "name": "Condition Name",
          "probability": "High/Medium/Low",
          "description": "Brief description of the condition"
        }
      ]
    }

    Limit your response to the 3-5 most likely conditions.
  `;
};

// Helper function to structure the prompt for condition details
const createConditionDetailsPrompt = (condition) => {
  return `
    You are a medical information provider. Please provide detailed information about the following medical condition:
    
    Condition: ${condition}
    
    Please provide your response in JSON format with the following structure:
    {
      "overview": "General overview of the condition",
      "causes": "What causes this condition",
      "riskFactors": ["Risk factor 1", "Risk factor 2", ...],
      "complications": ["Possible complication 1", "Possible complication 2", ...],
      "prevention": ["Prevention method 1", "Prevention method 2", ...]
    }
  `;
};

// Helper function to structure the prompt for treatment options
const createTreatmentOptionsPrompt = (condition) => {
  return `
    You are a medical information provider. Please provide treatment options for the following medical condition:
    
    Condition: ${condition}
    
    Please provide your response in JSON format with the following structure:
    {
      "medications": [
        {
          "name": "Medication name",
          "description": "Brief description of the medication"
        }
      ],
      "homeCare": ["Home care method 1", "Home care method 2", ...],
      "lifestyle": ["Lifestyle change 1", "Lifestyle change 2", ...],
      "whenToSeeDoctor": ["Warning sign 1", "Warning sign 2", ...]
    }
  `;
};

// Extract JSON from the Gemini response
const extractJsonFromResponse = (responseText) => {
  try {
    // Find the JSON part of the response (might be wrapped in markdown code blocks)
    const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```|(\{[\s\S]*\})/);
    
    if (jsonMatch) {
      const jsonString = jsonMatch[1] || jsonMatch[2];
      return JSON.parse(jsonString.trim());
    }
    
    // If no code block found, try to parse the entire response
    return JSON.parse(responseText.trim());
  } catch (error) {
    console.error('Error extracting JSON from response:', error);
    throw new Error('Failed to parse AI response');
  }
};

// Analyze symptoms using Gemini AI
exports.analyzeSymptoms = async (age, sex, symptoms) => {
  try {
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    
    // Create the prompt
    const prompt = createSymptomAnalysisPrompt(age, sex, symptoms);
    
    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();
    
    // Extract and return the JSON part
    return extractJsonFromResponse(responseText);
  } catch (error) {
    console.error('Error in Gemini service (analyzeSymptoms):', error);
    throw error;
  }
};

// Get details about a condition using Gemini AI
exports.getConditionDetails = async (condition) => {
  try {
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    
    // Create the prompt
    const prompt = createConditionDetailsPrompt(condition);
    
    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();
    
    // Extract and return the JSON part
    return extractJsonFromResponse(responseText);
  } catch (error) {
    console.error('Error in Gemini service (getConditionDetails):', error);
    throw error;
  }
};

// Get treatment options for a condition using Gemini AI
exports.getTreatmentOptions = async (condition) => {
  try {
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    
    // Create the prompt
    const prompt = createTreatmentOptionsPrompt(condition);
    
    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();
    
    // Extract and return the JSON part
    return extractJsonFromResponse(responseText);
  } catch (error) {
    console.error('Error in Gemini service (getTreatmentOptions):', error);
    throw error;
  }
};