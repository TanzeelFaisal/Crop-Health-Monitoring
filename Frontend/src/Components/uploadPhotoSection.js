import React, { useEffect, useRef, useState } from 'react';
import './uploadPhotoSection.css'; // Import the CSS file
import deleteImage from '../Assets/delete.svg'
import addImages from '../Assets/add.svg'
import addImage from '../Assets/add-one.svg'
import cropImage from '../Assets/crop-reports.jpg'

function UploadPhotosSection() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const ref = useRef(null);
  useEffect(() =>
  {
    document.body.style.overflowY = 'auto';
  }, [])

  const handleFileChange = (e) => {
    console.log(e.target.files);
    console.log('HIT');
    const files = Array.from(e.target.files);
    const filesWithPreview = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    console.log(filesWithPreview);
    setSelectedFiles([...selectedFiles, ...filesWithPreview]);
    e.target.files = null;
  };

  const handleUpload = () => {
    const filesToUpload = selectedFiles.map(item => item.file);
    console.log('Uploading files:', filesToUpload);
    setSelectedFiles([]);
  };

  const handleDelete = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    console.log(newFiles);
    setSelectedFiles(newFiles);
  };

  return (
    <>
      <div className="upload-section">
        <h4 style={{color: '#EDEDED'}}>Select Images</h4>
        {
          selectedFiles.length === 0 &&
          <button className='add-image-button'>
            <img src={addImages} onClick={() => ref.current.click()}/>
            <p>Upload Images</p>
          </button>
        }
        <input style={{display: 'none'}} type="file" multiple onChange={handleFileChange} value={''} ref={ref} />
        {selectedFiles.length > 0 && (
          <div style={{marginTop: '4rem', paddingBottom: '100px'}}>
            <div className="image-preview-container" style={{justifyContent: selectedFiles.length <= 3 ? 'center' : 'space-between', gridTemplateColumns: selectedFiles.length <= 3 ? `repeat(${selectedFiles.length + 1}, auto)` : 'auto auto auto auto' }}>
              {selectedFiles.map((item, index) => (
                <div key={index} className="image-preview">
                  <img
                    src={item.preview}
                    alt={`Preview ${index}`}
                  />
                  <div className='image-name-container'>
                    <p>{item.file.name.slice(0, 10)}{item.file.name.length >= 10 && '...'}</p>
                    <img src={deleteImage} style={{cursor: 'pointer', width: '20px', height: '20px'}} alt={'Delete Image'} onClick={() => handleDelete(index)} />
                  </div>
                </div>
              ))}
              <div className='dotted-add-image' onClick={() => ref.current.click()}>
                <img src={addImage} width={100}/>
              </div>
            </div>
          </div>
        )}
      </div>
      <button className="upload-button" onClick={handleUpload}>Upload</button>
    </>
  );
}

export default UploadPhotosSection;
