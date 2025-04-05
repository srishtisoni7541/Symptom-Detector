const { model } = require('../config/geminiConfig');
const { buildSymptomPrompt } = require('../utils/promptBuilder');
const History = require('../models/historyModel');

/**
 * Process user symptoms and get AI response
 */
const processSymptoms = async (req, res) => {
  try {
    const { symptoms } = req.body;
    
    if (!symptoms || symptoms.trim() === '') {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide symptoms description' 
      });
    }
    
    const prompt = buildSymptomPrompt(symptoms);
    
    // Generate content with Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textResponse = response.text();
    
    // Save to history if user is authenticated
    // This is optional and can be implemented later
    /*
    if (req.user) {
      await History.create({
        userId: req.user._id,
        symptoms,
        response: textResponse,
        date: new Date()
      });
    }
    */
    
    res.status(200).json({
      success: true,
      data: {
        response: textResponse
      }
    });
    
  } catch (error) {
    console.error('Error processing symptoms:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error processing symptoms', 
      error: error.message 
    });
  }
};

module.exports = { processSymptoms };