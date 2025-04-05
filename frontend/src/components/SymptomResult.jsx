import React from 'react';

const SymptomResult = ({ result }) => {
  if (!result) return null;
  
  // Function to parse the result into sections
  const parseResult = (text) => {
    const sections = [];
    
    // Split by headers (numbered or capitalized sections)
    const pattern = /(POSSIBLE CAUSES|HOME REMEDIES|MEDICAL ADVICE|DISCLAIMER):/gi;
    let match;
    let lastIndex = 0;
    
    while ((match = pattern.exec(text)) !== null) {
      const header = match[0].replace(':', '');
      const startIndex = match.index;
      
      if (lastIndex > 0) {
        const sectionContent = text.substring(lastIndex, startIndex).trim();
        sections.push({ content: sectionContent });
      }
      
      sections.push({ header });
      lastIndex = startIndex + match[0].length;
    }
    
    if (lastIndex < text.length) {
      sections.push({ content: text.substring(lastIndex).trim() });
    }
    
    return sections;
  };
  
  const sections = parseResult(result);
  
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Your Symptom Analysis</h2>
      
      <div className="space-y-4">
        {sections.map((section, index) => (
          <div key={index}>
            {section.header && (
              <h3 className={`font-semibold text-lg ${
                section.header === 'MEDICAL ADVICE' 
                  ? 'text-red-600' 
                  : section.header === 'DISCLAIMER' 
                    ? 'text-gray-600' 
                    : 'text-blue-600'
              }`}>
                {section.header}
              </h3>
            )}
            {section.content && (
              <p className="text-gray-700 mt-1 mb-3 whitespace-pre-line">
                {section.content}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SymptomResult;