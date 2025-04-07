const dotenv = require("dotenv");
dotenv.config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Init Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ===============================
// 🔹 Helper: Delay for retry (429)
// ===============================
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ===============================
// 🔹 PROMPT HELPERS
// ===============================

const createSymptomAnalysisPrompt = (age, gender, symptoms) => {
  let symptomList = [];

  if (Array.isArray(symptoms)) {
    // If it's an array of objects like [{symptom: "fever"}]
    if (symptoms.length && typeof symptoms[0] === "object") {
      symptomList = symptoms.map((s) => s.symptom?.trim()).filter(Boolean);
    } else {
      symptomList = symptoms.map((s) => s.trim?.() ?? s);
    }
  } else if (typeof symptoms === "string") {
    symptomList = symptoms.split(",").map((s) => s.trim());
  } else if (typeof symptoms === "object" && symptoms !== null) {
    // Convert object to string values if possible
    symptomList = Object.values(symptoms).map((s) => s.toString().trim());
  } else {
    throw new TypeError(`Symptoms must be an array, object, or comma-separated string. Got: ${typeof symptoms}`);
  }

  return `
You are a medical symptom analyzer. Analyze the following patient's symptoms 
and suggest 3 to 5 possible medical conditions.

Patient:
- Age: ${age}
- Gender: ${gender}
- Symptoms: ${symptomList.join(", ")}

For each condition include:
- Name
- Probability (High/Medium/Low)
- Brief description

Return your response in JSON format:
{
  "conditions": [
    {
      "name": "Condition Name",
      "probability": "High/Medium/Low",
      "description": "Brief description"
    }
  ]
}
`;
};


const createConditionDetailsPrompt = (condition) => `
You are a medical expert. Provide a detailed overview of the condition: "${condition}".

Return in JSON format:
{
  "overview": "General overview",
  "causes": "What causes it",
  "riskFactors": ["Factor 1", "Factor 2"],
  "complications": ["Complication 1", "Complication 2"],
  "prevention": ["Prevention method 1", "Prevention method 2"]
}
`;

const createTreatmentOptionsPrompt = (condition) => `
You are a medical expert. Provide treatment options for: "${condition}".

Return in JSON format:
{
  "medications": [
    {
      "name": "Medicine Name",
      "description": "Short description"
    }
  ],
  "homeCare": ["Method 1", "Method 2"],
  "lifestyle": ["Tip 1", "Tip 2"],
  "whenToSeeDoctor": ["Warning 1", "Warning 2"]
}
`;

// ===============================
// 🔹 Extract JSON from Gemini
// ===============================

const extractJsonFromResponse = (responseText) => {
  try {
    const match = responseText.match(/```json\s*([\s\S]*?)```|({[\s\S]*})/);
    const jsonString = match?.[1] || match?.[2];
    if (!jsonString) throw new Error("No JSON found in response");
    return JSON.parse(jsonString.trim());
  } catch (err) {
    console.error("Failed to parse AI response:", err.message);
    throw new Error("Invalid response format from AI");
  }
};

// ===============================
// 🔹 Main AI Methods
// ===============================

const getAIResponse = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return extractJsonFromResponse(text);
  } catch (error) {
    if (error.status === 429) {
      console.warn("Rate limit hit. Retrying in 5 seconds...");
      await delay(5000);
      return getAIResponse(prompt); // Retry once
    }
    console.error("Gemini API Error:", error.message || error);
    throw error;
  }
};

exports.analyzeSymptoms = async (age, gender, symptoms) => {
  console.log(`[Analyze Symptoms] Age: ${age}, Gender: ${gender}, Symptoms:`, symptoms);
  const prompt = createSymptomAnalysisPrompt(age, gender, symptoms);
  return await getAIResponse(prompt);
};

exports.getConditionDetails = async (condition) => {
  console.log(`[Condition Details] Condition: ${condition}`);
  const prompt = createConditionDetailsPrompt(condition);
  return await getAIResponse(prompt);
};

exports.getTreatmentOptions = async (condition) => {
  console.log(`[Treatment Options] Condition: ${condition}`);
  const prompt = createTreatmentOptionsPrompt(condition);
  return await getAIResponse(prompt);
};
