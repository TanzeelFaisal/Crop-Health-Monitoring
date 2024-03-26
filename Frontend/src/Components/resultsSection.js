import React, { useState, useEffect } from 'react';

function ResultsSection() {
  const [results, setResults] = useState([]);

  // Example data for results (you can replace this with your actual data)
  const exampleResults = [
    { id: 1, title: 'Result 1', description: 'Description for Result 1' },
    { id: 2, title: 'Result 2', description: 'Description for Result 2' },
    { id: 3, title: 'Result 3', description: 'Description for Result 3' },
  ];

  useEffect(() => {
    // Simulating fetching results data from an API
    // Replace this with actual API call
    // Here we're just using the exampleResults data
    setResults(exampleResults);
  }, []);

  return (
    <div>
      <h2>Results</h2>
      {/* Display results */}
      {results.map((result) => (
        <div key={result.id}>
          <h3>{result.title}</h3>
          <p>{result.description}</p>
        </div>
      ))}
      {/* If there are no results */}
      {results.length === 0 && <p>No results found.</p>}
    </div>
  );
}

export default ResultsSection;
