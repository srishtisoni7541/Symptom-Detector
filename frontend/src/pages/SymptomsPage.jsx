import React, { useState } from 'react';
import { useChecker } from '../context/CheckerContext';
import PreviousButton from '../components/PreviousButton';
import ContinueButton from '../components/ContinueButton';
import './SymptomPage.css';

const SymptomsPage = () => {
  const { userData, updateUserData } = useChecker();
  const [symptoms, setSymptoms] = useState(userData.symptoms || '');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  
  const handleContinue = async () => {
    if (!symptoms.trim()) {
      setError('Please enter your symptoms');
      return false;
    }
    
    updateUserData({ symptoms });
    setIsProcessing(true);
    
    try {
      // In a real application, this would hit your backend API
      // For now, we'll simulate an API response with mock data
      const mockConditions = [
        {
          id: '1',
          name: 'Common Cold',
          probability: 'High',
          description: 'A viral infection of the upper respiratory tract'
        },
        {
          id: '2',
          name: 'Seasonal Allergies',
          probability: 'Medium',
          description: 'An immune response to environmental triggers'
        },
        {
          id: '3',
          name: 'Sinusitis',
          probability: 'Low',
          description: 'Inflammation of the sinuses'
        }
      ];
      
      // In production, you would call your API
      // const response = await api.analyzeSymptoms({ 
      //   age: userData.age, 
      //   sex: userData.sex, 
      //   symptoms 
      // });
      
      setTimeout(() => {
        updateUserData({ conditions: mockConditions });
        setIsProcessing(false);
      }, 2000);
      
      return true;
    } catch (err) {
      setError('Failed to analyze symptoms. Please try again.');
      setIsProcessing(false);
      return false;
    }
  };
  
  return (
    <div className="symptoms-page">
      <div className="user-info">
        <div className="info-item">
          <span className="label">Age:</span> {userData.age}
        </div>
        <div className="info-item">
          <span className="label">Sex:</span> {userData.sex}
        </div>
      </div>
      
      <div className="symptoms-form">
        <h2>What symptoms are you experiencing?</h2>
        <p className="instruction">
          Please describe your symptoms in detail, including when they started, 
          their severity, and any other relevant information.
        </p>
        
        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="E.g., I've had a headache for the past 3 days, along with a fever of 101°F and a sore throat..."
          rows={6}
          className={error ? 'error' : ''}
        />
        
        {error && <div className="error-message">{error}</div>}
      </div>
      
      <div className="buttons-container">
        <PreviousButton />
        <ContinueButton 
          onClick={handleContinue} 
          disabled={isProcessing || !symptoms.trim()} 
        />
      </div>
      
      {isProcessing && <div className="loading">Analyzing your symptoms...</div>}
    </div>
  );
};

export default SymptomsPage;