import React, { useState } from 'react';

function UploadPhotosSection() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFiles([...selectedFiles, ...e.target.files]);
  };

  const handleUpload = () => {
    // Logic to upload files
    console.log('Uploading files:', selectedFiles);
    // Reset selected files after upload
    setSelectedFiles([]);
  };

  return (
    <div>
      <h2>Upload Photos</h2>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {/* Display selected files */}
      {selectedFiles.length > 0 && (
        <div>
          <h3>Selected Files:</h3>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UploadPhotosSection;
