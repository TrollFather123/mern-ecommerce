import { useState } from 'react';

const useImageConverter = () => {
  const [image, setImage] = useState([]);

  const handleImageUpload = (files) => {
    if (files) {
      const readers = [];
  
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        readers.push(
          new Promise((resolve, reject) => {
            reader.onloadend = () => {
              setImage((prevData) => [...prevData, reader.result]);
              resolve(); // Resolve the promise when done
            };
            reader.onerror = reject; // Reject the promise if an error occurs
            reader.readAsDataURL(file);
          })
        );
      });
  
      // Wait for all FileReader operations to complete
      Promise.all(readers)
        .then(() => {
          console.log("All files have been read successfully.");
        })
        .catch((error) => {
          console.error("Error reading files:", error);
        });
    }
  };
  

  return { image, handleImageUpload };
};

export default useImageConverter;
