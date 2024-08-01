import { useState } from 'react';

const useImageUpload = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return { image, handleImageUpload };
};

export default useImageUpload;
