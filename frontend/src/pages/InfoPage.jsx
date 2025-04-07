import React, { useState } from 'react';
import { useChecker } from '../context/CheckerContext';
import ContinueButton from '../components/ContinueButton';
import './InfoPage.css';

const InfoPage = () => {
  const { userData, updateUserData } = useChecker();
  const [localAge, setLocalAge] = useState(userData.age || '');
  const [localSex, setLocalSex] = useState(userData.sex || '');
  const [errors, setErrors] = useState({});

  const handleContinue = () => {
    const newErrors = {};
    
    if (!localAge) {
      newErrors.age = 'Age is required';
    } else if (localAge < 1 || localAge > 120) {
      newErrors.age = 'Please enter a valid age between 1 and 120';
    }
    
    if (!localSex) {
      newErrors.sex = 'Sex is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    
    updateUserData({ age: localAge, sex: localSex });
    return true;
  };

  return (
    <div className="info-page">
      <div className="form-container">
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            value={localAge}
            onChange={(e) => setLocalAge(e.target.value)}
            className={errors.age ? 'error' : ''}
            min="1"
            max="120"
          />
          {errors.age && <div className="error-message">{errors.age}</div>}
        </div>
        
        <div className="form-group">
          <label>Sex</label>
          <div className="sex-selection">
            <button
              className={`sex-button ${localSex === 'Male' ? 'selected' : ''}`}
              onClick={() => setLocalSex('Male')}
            >
              Male
            </button>
            <button
              className={`sex-button ${localSex === 'Female' ? 'selected' : ''}`}
              onClick={() => setLocalSex('Female')}
            >
              Female
            </button>
          </div>
          {errors.sex && <div className="error-message">{errors.sex}</div>}
        </div>
      </div>
      
      <ContinueButton
        onClick={handleContinue}
        disabled={!localAge || !localSex}
      />
    </div>
  );
};

export default InfoPage;