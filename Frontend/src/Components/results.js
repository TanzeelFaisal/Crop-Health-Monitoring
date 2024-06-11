import React from 'react';
import './Results.css'; // Import the CSS file for styling

const Results = () => {
  return (
    <div className="results-page">
      <header className="header">
        <div className="header-content">
          <h1>CropEye</h1>
          <nav>
            <a href="#">Home</a>
            <a href="#">Contact</a>
          </nav>
        </div>
      </header>
      
      <main>
        <section className="crop-check">
          <h2>CropCheck</h2>
          <p>Crop field analysis made easy</p>
          <div className="image-gallery">
            <img src="image1.jpg" alt="Crop Field" />
            <img src="image2.jpg" alt="Crop Detail" />
            <img src="image3.jpg" alt="Farmer" />
            <img src="image4.jpg" alt="Plants" />
          </div>
          <div className="health-status">
            <p>Excellent</p>
            <span className="health-score">9.6</span>
          </div>
        </section>
        
        <section className="analysis">
          <h3>No Diseases Detected</h3>
          <ul className="analysis-features">
            <li>Preprocessed</li>
            <li>Model Inferencing</li>
            <li>Bounding boxes plotted</li>
            <li>Identifying names</li>
            <li>24/7 support</li>
          </ul>
        </section>
        
        <section className="results-overview">
          <h3>Results Overview</h3>
          <div className="results-images">
            <div className="result-card">
              <img src="weed1.jpg" alt="Weeds" />
              <p>Presence of weeds</p>
              <button>Save Image</button>
            </div>
            <div className="result-card">
              <img src="disease1.jpg" alt="Diseases" />
              <p>Presence of diseases</p>
              <button>Save Image</button>
            </div>
            <div className="result-card">
              <img src="weed2.jpg" alt="Weeds" />
              <p>Presence of weeds</p>
              <button>Save Image</button>
            </div>
            <div className="result-card">
              <img src="disease2.jpg" alt="Diseases" />
              <p>Presence of diseases</p>
              <button>Save Image</button>
            </div>
          </div>
        </section>
        
        <section className="ratings">
          <h3>Results</h3>
          <div className="ratings-summary">
            <div className="rating">Weeds and Diseases: 10/10</div>
            <div className="rating">Additional Information: 7/10</div>
            <div className="rating">Contact: 9/10</div>
            <div className="rating">Usability: 8/10</div>
            <div className="rating">Image Upload: 9/10</div>
          </div>
          <div className="reviews">
            <div className="review">
              <p>Excellent accuracy for the price! - John D.</p>
              <p>Excellent 10</p>
              <p>Reviewed on 20 September 2023</p>
            </div>
            <div className="review">
              <p>Great platform but could use some - James E.</p>
              <p>Average 5.6</p>
              <p>Reviewed on 26 November 2023</p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="footer">
        <p>Contact Us</p>
        <p>Your favorite crop analysis platform since 2021</p>
        <p>&copy; CropEye 2023</p>
      </footer>
    </div>
  );
};

export default Results;
