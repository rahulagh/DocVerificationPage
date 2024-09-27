// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import DocumentUpload from './components/DocumentUpload';
import SubmissionConfirmation from './components/SubmissionConfirmation';
import GlobalStyles from './styles/GlobalStyles';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Layout = () => (
  <AppContainer>
    <Header />
    <Outlet />
  </AppContainer>
);

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DocumentUpload />} />
          <Route path="confirmation" element={<SubmissionConfirmation />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;