import React, { useState } from 'react'
import deleteImage from '../Assets/delete.svg'

const ImageForUpload = ({item, index, handleDelete, setSelectedFiles, loading}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const setFile = (type) =>
  {
    setSelectedFiles((files) => {
      const newFiles = [...files];
      newFiles[index].type = type;
      return newFiles;
    });
  }
  return (
    <>
        <div style={{width: '60vw', position: 'absolute', zIndex: 200, left: 325, display: previewOpen ? 'block' : 'none'}}>
            <button style={{backgroundColor: 'white', position: 'absolute', width: 'fit-content', right: 0, borderRadius: 0}} onClick={() => setPreviewOpen(false)}>X</button>
            <img src={item.resultImage ? `data:image/png;base64, ${item?.resultImage}` : item.preview} alt="Image Preview" style={{width: '100%'}}/>
        </div>
        <div className="image-preview" style={{justifyContent: 'center'}}>
            {
                loading ? <p>Loading...</p> :
                item.error ? <p>Unexpected Error Occurred</p> :
                <>
                    <div style={{padding: '20px', width: '100%', gap: '2px'}}>
                    <p style={{fontSize: '12px', width: '95%', textAlign: 'left', marginLeft: 'auto'}}>Test for: </p>
                    <div style={{display: 'flex', width: '90%', padding: '4px', gap: '4px', justifyContent: 'center', margin: '0 auto'}}>
                        <button className='selection-button' style={{backgroundColor: item.type === 'Weed' ? '#43A047' : 'transparent'}} onClick={() => setFile('Weed')}>Weed</button>
                        <button className='selection-button' style={{backgroundColor: item.type === 'Disease' ? '#43A047' : 'transparent'}} onClick={() => setFile('Disease')}>Disease</button>
                    </div>
                    </div>
                    <img
                        style={{cursor: 'pointer'}}
                        onClick={() => setPreviewOpen(true)}
                        src={item.resultImage ? `data:image/png;base64, ${item?.resultImage}` : item.preview}
                        alt={`Preview ${index}`}
                    />
                    <div className='image-name-container'>
                        <p>{item.file.name.slice(0, 10)}{item.file.name.length >= 10 && '...'}</p>
                        <img src={deleteImage} style={{cursor: 'pointer', width: '20px', height: '20px'}} alt={'Delete Image'} onClick={() => handleDelete(index)} />
                    </div>
                    {
                        item.result &&
                        <div style={{width: '100%', display: 'flex', justifyContent: 'space-around', backgroundColor: '#43A047', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', flexWrap: 'wrap'}}>
                            <p>Prediction:</p>
                            <p>{item.resultImage ? item.result.prediction : item.result.predictions.map(r => r + ', ')}</p>
                        </div>
                    }
                </>
            }
        </div>
    </>
  )
}

export default ImageForUpload