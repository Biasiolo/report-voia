import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './app/Home';
import SelectPlatforms from './app/SelectPlatforms';
import Checklist from './app/Checklist';
import Report from './app/Report';
import ChecklistReportPDF from './app/ChecklistReportPDF';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-stone-900 text-gray-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/select-platforms" element={<SelectPlatforms />} />
          <Route path="/checklist" element={<Checklist />} />
          <Route path="/report" element={<Report />} />
          <Route path="/print-report" element={<ChecklistReportPDF />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
