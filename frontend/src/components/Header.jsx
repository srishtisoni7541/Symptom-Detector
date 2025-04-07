import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <span className="logo-text">
          <span className="web">Web</span>
          <span className="md">MD</span>
        </span>{' '}
        <span className="symptom-checker">Symptom Checker</span>{' '}
        <span className="with-body-map">WITH BODY MAP</span>
      </div>
      <div className="subtitle">
        Identify possible conditions and treatment related to your symptoms.
      </div>
      <div className="disclaimer">
        This tool does not provide medical advice.{' '}
        <span className="info-link">See additional information</span>
      </div>
    </div>
  );
};

export default Header;