// const CheckupSession = require('../models/CheckupSession');
// const geminiService = require('../services/geminiService');

// // Analyze symptoms using Gemini AI
// exports.analyzeSymptoms = async (req, res) => {
//   try {
//     const { age, sex, symptoms } = req.body;

//     // Validate input
//     if (!age || !sex || !symptoms) {
//       return res.status(400).json({ message: 'Please provide age, sex, and symptoms' });
//     }

//     // Use Gemini AI to analyze symptoms
//     const analysisResult = await geminiService.analyzeSymptoms(age, sex, symptoms);

//     // Return the analysis results
//     res.status(200).json(analysisResult);
//   } catch (error) {
//     console.error('Error analyzing symptoms:', error);
//     res.status(500).json({ message: 'Failed to analyze symptoms', error: error.message });
//   }
// };

// // Get detailed information about a condition
// exports.getConditionDetails = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { condition } = req.query;

//     if (!condition) {
//       return res.status(400).json({ message: 'Please provide condition name' });
//     }

//     // Use Gemini AI to get condition details
//     const details = await geminiService.getConditionDetails(condition);

//     res.status(200).json(details);
//   } catch (error) {
//     console.error('Error getting condition details:', error);
//     res.status(500).json({ message: 'Failed to get condition details', error: error.message });
//   }
// };

// // Get treatment options for a condition
// exports.getTreatments = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { condition } = req.query;

//     if (!condition) {
//       return res.status(400).json({ message: 'Please provide condition name' });
//     }

//     // Use Gemini AI to get treatment options
//     const treatments = await geminiService.getTreatmentOptions(condition);

//     res.status(200).json(treatments);
//   } catch (error) {
//     console.error('Error getting treatment options:', error);
//     res.status(500).json({ message: 'Failed to get treatment options', error: error.message });
//   }
// };

// // Save the checkup session data (optional)
// exports.saveCheckupSession = async (req, res) => {
//   try {
//     const sessionData = req.body;
    
//     // Create a new session
//     const session = new CheckupSession(sessionData);
//     await session.save();
    
//     res.status(201).json({ message: 'Session saved successfully', sessionId: session._id });
//   } catch (error) {
//     console.error('Error saving session:', error);
//     res.status(500).json({ message: 'Failed to save session', error: error.message });
//   }
// };



const {
  analyzeSymptoms,
  getConditionDetails,
  getTreatmentOptions,
} = require("../services/geminiService");

exports.getDiagnosis = async (req, res) => {
  try {
    const { age, gender, symptoms } = req.body;
    const result = await analyzeSymptoms(age, gender, symptoms);
    res.status(200).json({ success: true, diagnosis: result });
  } catch (err) {
    console.error("Diagnosis Error:", err);
    res.status(500).json({ success: false, message: "Diagnosis failed" });
  }
};

exports.conditionDetails = async (req, res) => {
  try {
    const { condition } = req.body;
    const result = await getConditionDetails(condition);
    res.status(200).json({ success: true, details: result });
  } catch (err) {
    console.error("Condition Details Error:", err);
    res.status(500).json({ success: false, message: "Condition details failed" });
  }
};

exports.treatmentInfo = async (req, res) => {
  try {
    const { condition } = req.body;
    const result = await getTreatmentOptions(condition);
    res.status(200).json({ success: true, treatment: result });
  } catch (err) {
    console.error("Treatment Error:", err);
    res.status(500).json({ success: false, message: "Treatment generation failed" });
  }
};
