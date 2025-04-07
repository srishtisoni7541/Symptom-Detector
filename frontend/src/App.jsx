import React from 'react';
import { CheckerProvider, useChecker } from './context/CheckerContext';
import Header from './components/Header';
import NavTabs from './components/NavTabs';
import InfoPage from './pages/InfoPage';
import SymptomsPage from './pages/SymptomsPage';
import ConditionsPage from './pages/ConditionsPage';
import DetailsPage from './pages/DetailsPage';
import TreatmentPage from './pages/TreatmentPage';
import './App.css';

const SymptomChecker = () => {
  const { currentTab } = useChecker();
  
  const renderCurrentPage = () => {
    switch (currentTab) {
      case 'info':
        return <InfoPage />;
      case 'symptoms':
        return <SymptomsPage />;
      case 'conditions':
        return <ConditionsPage />;
      case 'details':
        return <DetailsPage />;
      case 'treatment':
        return <TreatmentPage />;
      default:
        return <InfoPage />;
    }
  };
  
  return (
    <div className="symptom-checker">
      <Header />
      <NavTabs />
      <div className="page-container">
        {renderCurrentPage()}
      </div>
    </div>
  );
};

function App() {
  return (
    <CheckerProvider>
      <SymptomChecker />
    </CheckerProvider>
  );
}

export default App;