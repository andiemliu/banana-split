import  { useState } from 'react';
import axios from 'axios';

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    console.log(event.target.files);
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    if (selectedFile) {
      
      const data = new FormData();
      data.append('image', selectedFile);
  
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.imgur.com/3/upload',
        headers: { 
          'Authorization': 'Bearer bde046a8a97a8296be21a62937546926b003b1f8', 
        },
        data : data
      };

      axios.request(config)
      .then((response) => {
        let imgUrl = response.data.data.link;
        axios.post('/storeImageUrl', { imgUrl });
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
      // Send the imgUrl to your backend to store in the database
      const imgUrl = 'https://imgur.com/jFtIjBX';
      await axios.post('http://localhost:3001/api/storeImageUrl', { imgUrl })
      
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
