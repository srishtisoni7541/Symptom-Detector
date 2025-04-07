import React from 'react';
import { useChecker } from '../context/CheckerContext';
import PreviousButton from '../components/PreviousButton';
import ContinueButton from '../components/ContinueButton';
import './conditionPage.css';

const ConditionsPage = () => {
  const { userData, updateUserData } = useChecker();
  const [selectedCondition, setSelectedCondition] = React.useState(
    userData.selectedCondition || null
  );
  
  const handleConditionSelect = (condition) => {
    setSelectedCondition(condition);
    updateUserData({ selectedCondition: condition });
  };
  
  const handleContinue = async () => {
    // In a real app, you would fetch details about the selected condition
    // For now, we'll simulate with mock data
    const mockDetails = {
      overview: "This condition is caused by a virus and typically affects the upper respiratory system.",
      causes: "Viral infection that spreads through respiratory droplets.",
      riskFactors: ["Weakened immune system", "Close contact with infected individuals", "Winter season"],
      complications: ["Sinus infection", "Ear infection", "Bronchitis"],
      prevention: ["Frequent handwashing", "Avoiding close contact with sick people", "Getting adequate rest"]
    };
    
    // In production, call your API:
    // const details = await api.getConditionDetails(selectedCondition.id);
    
    updateUserData({ details: mockDetails });
    return true;
  };
  
  return (
    <div className="conditions-page">
      <div className="user-info">
        <div className="info-item">
          <span className="label">Age:</span> {userData.age}
        </div>
        <div className="info-item">
          <span className="label">Sex:</span> {userData.sex}
        </div>
      </div>
      
      <div className="symptoms-summary">
        <h3>Based on your symptoms:</h3>
        <p className="symptom-text">{userData.symptoms}</p>
      </div>
      
      <div className="conditions-list">
        <h2>Possible Conditions</h2>
        <p className="instruction">Select a condition to learn more details</p>
        
        {userData.conditions && userData.conditions.map((condition) => (
          <div 
            key={condition.id}
            className={`condition-card ${selectedCondition?.id === condition.id ? 'selected' : ''}`}
            onClick={() => handleConditionSelect(condition)}
          >
            <div className="condition-header">
              <h3>{condition.name}</h3>
              <span className={`probability ${condition.probability.toLowerCase()}`}>
                {condition.probability} Probability
              </span>
            </div>
            <p className="condition-description">{condition.description}</p>
          </div>
        ))}
      </div>
      
      <div className="buttons-container">
        <PreviousButton />
        <ContinueButton 
          onClick={handleContinue} 
          disabled={!selectedCondition} 
        />
      </div>
    </div>
  );
};

export default ConditionsPage;