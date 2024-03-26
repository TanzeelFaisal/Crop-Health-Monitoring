import React from 'react';
import UploadPhotosSection from './uploadPhotoSection';
import ResultsSection from './resultsSection';
import Footer from './footer';

function MainDashboard() {
  return (
    <div>
      {/* Upload Photos Section */}
      <UploadPhotosSection />

      {/* Results Section */}
      <ResultsSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default MainDashboard;
