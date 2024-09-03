import React, { useEffect, useRef, useState } from 'react';
import './uploadPhotoSection.css';
import addImages from '../Assets/add.svg'
import addImage from '../Assets/add-one.svg'
import ImageForUpload from './imageForUpload';
import supabase from '../Config/supabase';
import { useNavigate } from 'react-router-dom';

function UploadPhotosSection() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  useEffect(() =>
  {
    document.body.style.overflowY = 'auto';
  }, []);

  const handleUpload = async () => {
    const uploadingFiles = [...selectedFiles];
    const tempSelectedFiles = [...selectedFiles];

    setLoading(true);

    const results = await Promise.allSettled(uploadingFiles.map((async (wrappedFile, index) => {
      try
      {
        const {file} = wrappedFile;
        const {data, error} = await supabase.auth.getSession();
        if (!data.session)
        {
          navigate('/');
        }
        const formData = new FormData();
        formData.append('image', file);
        formData.append('filename', file.name.split('.')[0] + index);
        formData.append('user_id', data.session.user.id)
        let response;
        if (wrappedFile.type === 'Weed')
        {
          response = await fetch('http://localhost:8000/detect-weeds/', {
            method: 'POST',
            body: formData
          });
        }
        else
        {
          response = await fetch('http://localhost:8000/classify-diseases/', {
            method: 'POST',
            body: formData
          });
        }
        const result = await response.json();
        console.log(index);
        console.log(result);
        tempSelectedFiles[index] = {...wrappedFile, result, resultImage: result.image ? result.image : null};
      }

      catch(err)
      {
        tempSelectedFiles[index] = {...wrappedFile, error: err.message};
      }
    })));

    if (results)
    {
      setSelectedFiles(tempSelectedFiles);
    }

    setLoading(false);

    // results.forEach((result, index) => {
    //     if (result.status === 'fulfilled') {
    //         console.log(`Data from ${selectedFiles[index]}:`, result.value);
    //     } else {
    //         console.error(`Error fetching from ${selectedFiles[index]}:`, result.reason);
    //     }
    // });
  };
  const handleFileChange = (e) => {
    console.log(e.target.files);
    console.log('HIT');
    const files = Array.from(e.target.files);
    const filesWithPreview = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      result: '',
      type: 'Weed',
    }));

    setSelectedFiles([...selectedFiles, ...filesWithPreview]);
    e.target.files = null;
  };

  const clearAll = () =>
  {
    setSelectedFiles([]);
  }

  // const handleUpload = () => {
  //   const filesToUpload = selectedFiles.map(item => item.file);
  //   console.log('Uploading files:', filesToUpload);
  //   setSelectedFiles([]);
  // };

  const handleDelete = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    console.log(newFiles);
    setSelectedFiles(newFiles);
  };

  return (
    <>
      <div className="upload-section">
        {/* <h4 style={{color: '#EDEDED'}}>Select Images</h4> */}
        {
          selectedFiles.length === 0 &&
          <button className='add-image-button'>
            <img src={addImages} onClick={() => ref.current.click()} />
            <p>Upload Images</p>
          </button>
        }
        <input style={{display: 'none'}} type="file" multiple onChange={handleFileChange} value={''} ref={ref} accept="image/*" />
        {selectedFiles.length > 0 && (
          <div style={{marginTop: '4rem', paddingBottom: '100px'}}>
              {
                !loading && selectedFiles.length > 0 &&
                <button className='clear-button' onClick={clearAll}>
                  <p>Clear All</p>
                </button>
              }
            <div className="image-preview-container" style={{justifyContent: selectedFiles.length <= 3 ? 'center' : 'space-between', gridTemplateColumns: selectedFiles.length <= 3 ? `repeat(${selectedFiles.length + 1}, auto)` : 'auto auto auto auto' }}>
              {selectedFiles.map((item, index) => (
                <ImageForUpload item={item} index={index} handleDelete={handleDelete} setSelectedFiles={setSelectedFiles} loading={loading}/>
              ))}
              {!loading &&
                <div className='dotted-add-image' onClick={() => ref.current.click()}>
                  <img src={addImage} width={100}/>
                </div>
              }
            </div>
          </div>
        )}
      </div>
      {
        !loading && selectedFiles.length > 0 &&
        <button className="upload-button" onClick={handleUpload}>Upload</button>
      }
    </>
  );
}

export default UploadPhotosSection;
