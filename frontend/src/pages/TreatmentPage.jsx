import React from 'react';
import { useChecker } from '../context/CheckerContext';
import PreviousButton from '../components/PreviousButton';
import './TreatmentPage.css';

const TreatmentPage = () => {
  const { userData } = useChecker();
  
  if (!userData.treatments || !userData.selectedCondition) {
    return <div className="loading">Loading treatment information...</div>;
  }
  
  const handleStartOver = () => {
    // In a real app, you might use React Router
    window.location.reload();
  };
  
  return (
    <div className="treatment-page">
      <div className="user-info">
        <div className="info-item">
          <span className="label">Age:</span> {userData.age}
        </div>
        <div className="info-item">
          <span className="label">Sex:</span> {userData.sex}
        </div>
      </div>
      
      <div className="condition-header">
        <h2>{userData.selectedCondition.name} - Treatment Options</h2>
        <span className={`probability ${userData.selectedCondition.probability.toLowerCase()}`}>
          {userData.selectedCondition.probability} Probability
        </span>
      </div>
      
      <div className="disclaimer-banner">
        <div className="disclaimer-icon">⚠️</div>
        <div className="disclaimer-text">
          This information is provided for educational purposes only and is not a substitute 
          for professional medical advice. Always consult with a healthcare provider for 
          diagnosis and treatment.
        </div>
      </div>
      
      <div className="treatments-section">
        <div className="treatment-card">
          <h3>Recommended Medications</h3>
          <ul>
            {userData.treatments.medications.map((medication, index) => (
              <li key={index}>
                <strong>{medication.name}</strong>: {medication.description}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="treatment-card">
          <h3>Home Care</h3>
          <ul>
            {userData.treatments.homeCare.map((care, index) => (
              <li key={index}>{care}</li>
            ))}
          </ul>
        </div>
        
        <div className="treatment-card">
          <h3>Lifestyle & Prevention</h3>
          <ul>
            {userData.treatments.lifestyle.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        
        <div className="treatment-card alert">
          <h3>When to See a Doctor</h3>
          <ul>
            {userData.treatments.whenToSeeDoctor.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="buttons-container">
        <PreviousButton />
        <button className="start-over-button" onClick={handleStartOver}>
          Start Over
        </button>
      </div>
    </div>
  );
};

export default TreatmentPage;