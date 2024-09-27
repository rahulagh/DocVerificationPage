import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: #ccdfe6;
  padding: 1.5rem 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: white;
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
  text-align: center;
  letter-spacing: 1px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Title>Document Verification</Title>
    </HeaderContainer>
  );
};

export default Header;
