import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">AI Symptom Checker</h3>
            <p className="text-sm text-gray-300 mt-1">
              Powered by Gemini AI
            </p>
          </div>
          
          <div className="text-sm text-gray-300">
            <p className="mb-2">
              <strong>Important Disclaimer:</strong> This tool provides general information only and 
              should not replace professional medical advice.
            </p>
            <p>© {new Date().getFullYear()} AI Symptom Checker. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;