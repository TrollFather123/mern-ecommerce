import React, { useState } from 'react'
import { uploadImage } from '../api/api.functions';
import { toast } from 'react-toastify';

const useImageUpload = () => {

    const [imageUrl,setImageUrl] = useState("");

    const handelImageUpload = async (image) => {
    try {
        const uploadImageCloudinary = await uploadImage(image);
  
        if (uploadImageCloudinary?.secure_url) {
            setImageUrl(uploadImageCloudinary?.secure_url);
        } else {
          throw new Error("Image upload failed");
        }
      } catch (err) {
        toast.error(err?.message);
      }
    }
  return {imageUrl,handelImageUpload}
}

export default useImageUpload