import React, { useEffect, useState } from 'react';
import { useChecker } from '../context/CheckerContext';
import { useNavigate } from 'react-router-dom';
import PreviousButton from '../components/PreviousButton';
import ContinueButton from '../components/ContinueButton';
import axios from 'axios';
import './detailpage.css';

const DetailsPage = () => {
  const { userData, updateUserData } = useChecker();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userData.selectedCondition) {
      navigate('/conditions');
      return;
    }

    const fetchDetails = async () => {
      try {
        const res = await axios.post('http://localhost:5000/api/ai-condition-details', {
          condition: userData.selectedCondition.name,
        });

        // ✅ FIXED HERE
        updateUserData({ details: res.data.details });

      } catch (error) {
        console.error('Error fetching condition details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [userData.selectedCondition, updateUserData, navigate]);

  const handleContinue = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/treatment', {
        condition: userData.selectedCondition.name,
      });

      updateUserData({ treatments: res.data });
      navigate('/treatment');
    } catch (error) {
      console.error('Error fetching treatment:', error);
    }
  };

  if (loading) return <div className="loading">Loading details...</div>;
  if (!userData.details) return <div className="loading">No details found.</div>;

  const { details } = userData;

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
        {details.overview && (
          <div className="detail-card">
            <h3>Overview</h3>
            <p>{details.overview}</p>
          </div>
        )}

        {details.causes && (
          <div className="detail-card">
            <h3>Causes</h3>
            <p dangerouslySetInnerHTML={{ __html: details.causes.replace(/\n/g, '<br/>') }} />
          </div>
        )}

        {details.riskFactors?.length > 0 && (
          <div className="detail-card">
            <h3>Risk Factors</h3>
            <ul>
              {details.riskFactors.map((factor, idx) => <li key={idx}>{factor}</li>)}
            </ul>
          </div>
        )}

        {details.complications?.length > 0 && (
          <div className="detail-card">
            <h3>Possible Complications</h3>
            <ul>
              {details.complications.map((comp, idx) => <li key={idx}>{comp}</li>)}
            </ul>
          </div>
        )}

        {details.prevention?.length > 0 && (
          <div className="detail-card">
            <h3>Prevention</h3>
            <ul>
              {details.prevention.map((prev, idx) => <li key={idx}>{prev}</li>)}
            </ul>
          </div>
        )}
      </div>

      <div className="buttons-container">
        <PreviousButton />
        <ContinueButton onClick={handleContinue} />
      </div>
    </div>
  );
};

export default DetailsPage;
