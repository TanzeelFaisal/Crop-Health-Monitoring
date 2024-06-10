import React, { useState } from 'react';
import './uploadPhotoSection.css'; // Import the CSS file

function UploadPhotosSection() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const filesWithPreview = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setSelectedFiles([...selectedFiles, ...filesWithPreview]);
  };

  const handleUpload = () => {
    // Logic to upload files
    const filesToUpload = selectedFiles.map(item => item.file);
    console.log('Uploading files:', filesToUpload);
    // Reset selected files after upload
    setSelectedFiles([]);
  };

  const handleDelete = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
  };

  return (
    <div className="upload-section">
      <h2>Upload Photos</h2>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {/* Display selected files with previews */}
      {selectedFiles.length > 0 && (
        <div>
          <h3>Selected Files:</h3>
          <div className="image-preview-container">
            {selectedFiles.map((item, index) => (
              <div key={index} className="image-preview">
                <img
                  src={item.preview}
                  alt={`Preview ${index}`}
                />
                <button
                  className="delete-button"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
                <p>{item.file.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadPhotosSection;
