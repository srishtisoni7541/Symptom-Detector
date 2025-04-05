/**
 * Builds a structured prompt for the Gemini API based on user symptoms
 * @param {string} symptoms - User's symptoms description
 * @returns {string} - Structured prompt for Gemini
 */
function buildSymptomPrompt(symptoms) {
    return `Act as a medical information assistant helping a user understand their symptoms. 
    The user reports the following symptoms: "${symptoms}"
    
    Please provide a structured response with the following sections:
    
    1. POSSIBLE CAUSES: Provide 2-3 common possible causes for these symptoms (keep this brief).
    
    2. HOME REMEDIES: Suggest 3-4 safe home remedies or self-care tips that might help alleviate the symptoms.
    
    3. MEDICAL ADVICE: Indicate whether the user should:
       - Monitor symptoms and practice self-care
       - Call their doctor within a few days
       - Seek medical attention immediately
       Explain briefly why you recommend this course of action.
    
    4. DISCLAIMER: Include a brief disclaimer that this is not professional medical advice and should not replace consultation with a healthcare provider.
    
    Keep each section concise. Format the output in clear sections with headers.`;
  }
  
  module.exports = { buildSymptomPrompt };