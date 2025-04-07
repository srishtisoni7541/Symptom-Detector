import React, { useEffect } from 'react';
import { useChecker } from '../context/CheckerContext';
import { useNavigate } from 'react-router-dom';
import PreviousButton from '../components/PreviousButton';
import ContinueButton from '../components/ContinueButton';
import './detailpage.css';

const DetailsPage = () => {
  const { userData, updateUserData } = useChecker();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to conditions page if details are missing
    if (!userData.details || !userData.selectedCondition) {
      navigate('/conditions'); // Adjust the path as needed
    }
  }, [userData.details, userData.selectedCondition, navigate]);

  const handleContinue = async () => {
    // Mock treatment data
    const mockTreatments = {
      medications: [
        {
          name: "Over-the-counter pain relievers",
          description: "Such as acetaminophen or ibuprofen to reduce fever and pain",
        },
        {
          name: "Decongestants",
          description: "To help clear nasal passages",
        },
      ],
      homeCare: [
        "Rest to help the body fight the infection",
        "Stay hydrated by drinking plenty of fluids",
        "Use a humidifier or take a hot shower to ease congestion",
      ],
      lifestyle: [
        "Adequate sleep to boost immune function",
        "Balanced diet rich in fruits and vegetables",
        "Stress management techniques",
      ],
      whenToSeeDoctor: [
        "Fever above 101.3°F (38.5°C) that lasts more than 3 days",
        "Symptoms that worsen after 7 days",
        "Severe headache or sinus pain",
      ],
    };

    updateUserData({ treatments: mockTreatments });
    return true;
  };

  if (!userData.details || !userData.selectedCondition) {
    return <div className="loading">Loading details...</div>;
  }

  return (
    <div className="details-page">
      <div className="user-info">
        <div className="info-item">
          <span className="label">Age:</span> {userData.age}
        </div>
        <div className="info-item">
          <span className="label">Sex:</span> {userData.sex}
        </div>
      </div>

      <div className="condition-header">
        <h2>{userData.selectedCondition.name}</h2>
        <span className={`probability ${userData.selectedCondition.probability?.toLowerCase()}`}>
          {userData.selectedCondition.probability} Probability
        </span>
      </div>

      <div className="details-section">
        <div className="detail-card">
          <h3>Overview</h3>
          <p>{userData.details.overview}</p>
        </div>

        <div className="detail-card">
          <h3>Causes</h3>
          <p>{userData.details.causes}</p>
        </div>

        <div className="detail-card">
          <h3>Risk Factors</h3>
          <ul>
            {userData.details.riskFactors?.map((factor, index) => (
              <li key={index}>{factor}</li>
            ))}
          </ul>
        </div>

        <div className="detail-card">
          <h3>Possible Complications</h3>
          <ul>
            {userData.details.complications?.map((complication, index) => (
              <li key={index}>{complication}</li>
            ))}
          </ul>
        </div>

        <div className="detail-card">
          <h3>Prevention</h3>
          <ul>
            {userData.details.prevention?.map((prevention, index) => (
              <li key={index}>{prevention}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="buttons-container">
        <PreviousButton />
        <ContinueButton onClick={handleContinue} />
      </div>
    </div>
  );
};

export default DetailsPage;
