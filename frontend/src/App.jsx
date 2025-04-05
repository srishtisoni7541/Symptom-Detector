import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SymptomsForm from './components/SymptomForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <SymptomsForm />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;