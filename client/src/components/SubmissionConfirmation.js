import React from 'react';
import styled from 'styled-components';
// import { motion } from 'framer-motion';  // Import Framer Motion for animations
import { useNavigate } from 'react-router-dom';


const ConfirmationContainer = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 3rem auto;
`;

const Title = styled.h2`
  color: #007bff;
  font-size: 1.75rem;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  color: #555;
  font-size: 1.1rem;
  line-height: 1.5;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #0056b3;
  }
`;

// Framer Motion animation variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const SubmissionConfirmation = () => {
  const router = useNavigate()

  return (
    <ConfirmationContainer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Title>Submission Confirmation</Title>
      <Message>
        Your documents will be processed within 24 hours. The status will be updated via email shortly. Thank you!
      </Message>
      <Button onClick={() => router('/')}>Go Back</Button>
    </ConfirmationContainer>
  );
};

export default SubmissionConfirmation;
