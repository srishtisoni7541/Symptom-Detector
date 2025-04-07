

import React, { useEffect, useState } from 'react';
import { useChecker } from '../context/CheckerContext';
import PreviousButton from '../components/PreviousButton';
import ContinueButton from '../components/ContinueButton';
import './conditionPage.css';
import axios from 'axios';

const ConditionsPage = () => {
  const { userData, updateUserData } = useChecker();
  const [selectedCondition, setSelectedCondition] = useState(userData.selectedCondition || null);
  const [loading, setLoading] = useState(false);

  // 🔥 CALL GEMINI DIAGNOSIS API
  useEffect(() => {
    const fetchConditions = async () => {
      setLoading(true);
      try {
        const res = await axios.post('http://localhost:5000/api/ai-diagnosis', {
          age: userData.age,
          sex: userData.sex,
          symptoms: userData.symptoms
        });
      

        const conditions = res.data.diagnosis.conditions; // Array of conditions
        updateUserData({ conditions });
      } catch (err) {
        console.error('Error fetching conditions:', err);
      } finally {
        setLoading(false);
      }
    };

    // Call only if conditions are not already there
    if (!userData.conditions || userData.conditions.length === 0) {
      fetchConditions();
    }
  }, []);

  const handleConditionSelect = (condition) => {
    setSelectedCondition(condition);
    updateUserData({ selectedCondition: condition });
  };

  const handleContinue = async () => {
    if (!selectedCondition) return;
    try {
      const res = await axios.post('http://localhost:5000/api/ai-diagnosis', {
        condition: selectedCondition.name
      });
      updateUserData({ details: res.data });
    } catch (err) {
      console.error('Error fetching condition details:', err);
    }
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

        {loading ? (
          <p>Loading conditions...</p>
        ) : (
          userData.conditions?.map((condition, index) => (
            <div
              key={condition.name || index}
              className={`condition-card ${selectedCondition?.name === condition.name ? 'selected' : ''}`}
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
          ))
        )}
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
