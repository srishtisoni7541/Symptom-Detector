import React from 'react';
import { useChecker } from '../context/CheckerContext';
import './NavTabs.css';

const NavTabs = () => {
  const { currentTab } = useChecker();
  
  const tabs = [
    { id: 'info', label: 'INFO' },
    { id: 'symptoms', label: 'SYMPTOMS' },
    { id: 'conditions', label: 'CONDITIONS' },
    { id: 'details', label: 'DETAILS' },
    { id: 'treatment', label: 'TREATMENT' }
  ];

  return (
    <div className="nav-tabs">
      {tabs.map(tab => (
        <div 
          key={tab.id} 
          className={`tab ${currentTab === tab.id ? 'active' : ''}`}
        >
          {tab.label}
          {currentTab === tab.id && <div className="active-indicator"></div>}
        </div>
      ))}
    </div>
  );
};

export default NavTabs;