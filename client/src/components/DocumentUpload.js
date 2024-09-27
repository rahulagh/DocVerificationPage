import React, { useState } from 'react';
import styled, { keyframes }  from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { uploadDocuments } from '../utils/api';

// Spinner Animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f7fb;
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #555;
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.3);
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.3);
  }
`;

const Button = styled.button`
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
  text-align: center;
`;

const Loader = styled.div`
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #007bff; /* Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
  margin: 1rem auto;
`;

const DocumentUpload = () => {
  const [companyName, setCompanyName] = useState('');
  const [logo, setLogo] = useState(null);
  const [document, setDocument] = useState(null);
  const [documentType, setDocumentType] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!companyName || !logo || !document || !documentType) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('companyName', companyName);
      formData.append('logo', logo);
      formData.append('document', document);
      formData.append('documentType', documentType);

      await uploadDocuments(formData);
      navigate('/confirmation');
    } catch (err) {
      setError(err.message);
    } finally {
      setError(false);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Document Upload</Title>
        <Label>Company Name</Label>
        <Input
          type="text"
          placeholder="Enter company name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <Label>Company Logo</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setLogo(e.target.files[0])}
        />
        <Label>Document Type</Label>
        <Select value={documentType} onChange={(e) => setDocumentType(e.target.value)}>
          <option value="">Select Document Type</option>
          <option value="PAN Card">PAN Card</option>
          <option value="GST Certificate">GST Certificate</option>
          <option value="Certificate of Incorporation">Certificate of Incorporation</option>
          <option value="Trademark Certificate">Trademark Certificate</option>
          <option value="Shops and Establishment Act License">Shops and Establishment Act License</option>
          <option value="Udyog Aadhaar">Udyog Aadhaar</option>
          <option value="Gumasta License">Gumasta License</option>
          <option value="MSME Certificate">MSME Certificate</option>
          <option value="Share/Stock Certificate">Share/Stock Certificate</option>
          <option value="ISO Certification">ISO Certification</option>
          <option value="Certificate of Commencement of Business">Certificate of Commencement of Business</option>
          <option value="Registration Process Receipt">Registration Process Receipt</option>
        </Select>
        <Label>Upload Document</Label>
        <Input
          type="file"
          accept=".pdf"
          onChange={(e) => setDocument(e.target.files[0])}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {loading ? <Loader /> : <Button type="submit">Submit</Button>}
      </Form>
    </Container>
  );
};

export default DocumentUpload;
