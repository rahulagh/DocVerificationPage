// client/src/utils/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const uploadDocuments = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.msg || 'An error occurred while uploading documents');
  }
};