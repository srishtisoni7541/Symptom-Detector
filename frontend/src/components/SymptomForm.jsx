import { useState } from 'react';
import axios from 'axios';

const SymptomsForm = () => {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!symptoms.trim()) {
      setError('Please describe your symptoms');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/symptoms', {
        symptoms
      });
      
      setResult(response.data.data.response);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
      console.error('Error submitting symptoms:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">AI Symptom Checker</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-1">
            Describe your symptoms in detail
          </label>
          <textarea
            id="symptoms"
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Example: I've had a headache for two days, especially behind my eyes, and feel slightly dizzy when standing up quickly."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          ></textarea>
        </div>
        
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Check Symptoms'}
        </button>
      </form>
      
      {loading && (
        <div className="mt-6 text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Analyzing your symptoms...</p>
        </div>
      )}
      
      {result && !loading && (
        <div className="mt-8 bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-blue-800">Analysis Result</h3>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: result.replace(/\n/g, '<br />') }}></div>
        </div>
      )}
      
      <div className="mt-8 text-xs text-gray-500 text-center">
        Note: This tool provides general information and is not a substitute for professional medical advice.
        Always consult a healthcare provider for medical concerns.
      </div>
    </div>
  );
};

export default SymptomsForm;