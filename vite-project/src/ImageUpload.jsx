import  { useState } from 'react';

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    if (selectedFile) {
        const formData = new FormData();
        formData.append('image', selectedFile);
  
        fetch('http://localhost:3001/upload', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Image uploaded:', data);
          })
          .catch((error) => {
            console.error('Error uploading image:', error);
          });
      } else {
        console.log('No image selected');
      }
    };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileSelect} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default ImageUpload;
